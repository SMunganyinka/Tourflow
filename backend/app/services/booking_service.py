# app/services/booking_service.py

from typing import List, Optional
from sqlalchemy.orm import Session
from app.models.booking import Booking
from app.models.destination import Destination
from app.models.user import User
from app.schemas.booking import BookingCreate, BookingUpdate
from datetime import datetime
from sqlalchemy.orm import joinedload
import uuid

class BookingService:
    def __init__(self, db: Session):
        self.db = db
    
    def create_booking(self, booking: BookingCreate, user_id: int) -> Booking:
        """
        Create a new booking, calculating the total price on the server.
        """
        # Generate a unique booking reference
        booking_reference = f"BK-{uuid.uuid4().hex[:8].upper()}"
        
        # 1. Fetch the destination to get its price
        destination = self.db.query(Destination).filter(Destination.id == booking.destination_id).first()
        if not destination:
            raise ValueError("Destination not found")
        
        if not destination.is_active:
            raise ValueError("Destination is not available for booking")
        
        # 2. Calculate the total price based on the destination's price and number of travelers
        calculated_total_price = destination.price * booking.number_of_travelers

        # 3. Create new booking with the calculated price
        db_booking = Booking(
            booking_reference=booking_reference,
            user_id=user_id,
            destination_id=booking.destination_id,
            booking_date=datetime.utcnow(),
            travel_date=booking.travel_date,
            number_of_travelers=booking.number_of_travelers,
            total_price=calculated_total_price,  # <-- CORRECTED: Use the calculated price
            status="PENDING",  # Initial status
            special_requests=booking.special_requests,
            contact_email=booking.contact_email,
            contact_phone=booking.contact_phone
        )
        
        self.db.add(db_booking)
        self.db.commit()
        self.db.refresh(db_booking)
        
        return db_booking
    
    def get_user_bookings(self, user_id: int, skip: int = 0, limit: int = 100) -> List[Booking]:
        """
        Get all bookings for a specific user, pre-loading the destination data.
        """
        return (
            self.db.query(Booking)
            .options(joinedload(Booking.destination)) # Good for performance
            .filter(Booking.user_id == user_id)
            .offset(skip)
            .limit(limit)
            .all()
        )
    
    def get_booking(self, booking_id: int) -> Optional[Booking]:
        """
        Get a specific booking by ID.
        """
        return self.db.query(Booking).filter(Booking.id == booking_id).first()
    
    def get_booking_by_reference(self, booking_reference: str) -> Optional[Booking]:
        """
        Get a specific booking by its unique reference number.
        """
        return self.db.query(Booking).filter(Booking.booking_reference == booking_reference).first()
    
    def update_booking(self, booking_id: int, booking_update: BookingUpdate) -> Booking:
        """
        Update a booking with the provided data. Allows for partial updates.
        """
        db_booking = self.get_booking(booking_id)
        if not db_booking:
            raise ValueError("Booking not found")
        
        # Update only the fields that were provided in the request
        update_data = booking_update.model_dump(exclude_unset=True) # Use model_dump for Pydantic v2
        for field, value in update_data.items():
            setattr(db_booking, field, value)
        
        self.db.commit()
        self.db.refresh(db_booking)
        
        return db_booking
    
    def confirm_booking(self, booking_id: int) -> Booking:
        """
        Confirm a booking (change status to CONFIRMED).
        """
        db_booking = self.get_booking(booking_id)
        if not db_booking:
            raise ValueError("Booking not found")
        
        if db_booking.status != "PENDING":
            raise ValueError("Only pending bookings can be confirmed")
        
        db_booking.status = "CONFIRMED"
        self.db.commit()
        self.db.refresh(db_booking)
        
        return db_booking
    
    def cancel_booking(self, booking_id: int) -> Booking:
        """
        Cancel a booking (change status to CANCELLED).
        """
        db_booking = self.get_booking(booking_id)
        if not db_booking:
            raise ValueError("Booking not found")
        
        if db_booking.status in ["COMPLETED", "CANCELLED"]:
            raise ValueError("Cannot cancel completed or already cancelled bookings")
        
        db_booking.status = "CANCELLED"
        self.db.commit()
        self.db.refresh(db_booking)
        
        return db_booking
    
    def complete_booking(self, booking_id: int) -> Booking:
        """
        Mark a booking as completed.
        """
        db_booking = self.get_booking(booking_id)
        if not db_booking:
            raise ValueError("Booking not found")
        
        if db_booking.status != "CONFIRMED":
            raise ValueError("Only confirmed bookings can be marked as completed")
        
        db_booking.status = "COMPLETED"
        self.db.commit()
        self.db.refresh(db_booking)
        
        return db_booking
    
    def delete_booking(self, booking_id: int) -> None:
        """
        Soft delete a booking by changing its status to DELETED.
        """
        db_booking = self.get_booking(booking_id)
        if not db_booking:
            raise ValueError("Booking not found")
        
        db_booking.status = "DELETED"
        self.db.commit()
    
    def get_all_bookings(self, skip: int = 0, limit: int = 100) -> List[Booking]:
        """
        Get all non-deleted bookings (admin function).
        """
        return (
            self.db.query(Booking)
            .filter(Booking.status != "DELETED")
            .offset(skip)
            .limit(limit)
            .all()
        )
    
    def get_bookings_by_status(self, status: str, skip: int = 0, limit: int = 100) -> List[Booking]:
        """
        Get bookings filtered by a specific status (admin function).
        """
        return (
            self.db.query(Booking)
            .filter(Booking.status == status)
            .offset(skip)
            .limit(limit)
            .all()
        )
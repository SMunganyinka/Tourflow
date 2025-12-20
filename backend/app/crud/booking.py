# app/crud/booking.py
from typing import List, Optional
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import and_, or_
from datetime import datetime
from app.models.booking import Booking
from app.models.destination import Destination
from app.models.user import User
from app.schemas.booking import BookingCreate, BookingUpdate
from app.models.response import BookingResponse, DestinationResponse

def get_bookings_by_user(db: Session, user_id: int) -> List[Booking]:
    """
    Retrieve all bookings for a given user.
    """
    return (
        db.query(Booking)
        .options(joinedload(Booking.destination))
        .filter(Booking.user_id == user_id)
        .all()
    )

def get_booking_by_id(db: Session, booking_id: int) -> Optional[Booking]:
    """
    Retrieve a specific booking by ID, including destination details.
    """
    return (
        db.query(Booking)
        .options(joinedload(Booking.destination))
        .filter(Booking.id == booking_id)
        .first()
    )

def get_bookings_by_user_and_destination(db: Session, user_id: int, destination_id: int) -> bool:
    """
    Check if a user has a confirmed booking for a specific destination.
    """
    return (
        db.query(Booking)
        .filter(
            Booking.user_id == user_id,
            Booking.destination_id == destination_id,
            Booking.status == "confirmed"
        )
        .first()
        is not None
    )

def create_booking(
    db: Session, 
    booking: BookingCreate, 
    user_id: int
) -> BookingResponse:
    """
    Create a new booking with proper validation.
    """
    # Get destination to validate it exists and get price
    destination = db.query(Destination).filter(Destination.id == booking.destination_id).first()
    if not destination:
        raise ValueError(f"Destination with ID {booking.destination_id} not found")
    
    # Calculate total price if not provided
    total_price = booking.total_price or (destination.price * booking.number_of_people)
    
    db_booking = Booking(
        destination_id=booking.destination_id,
        travel_date=booking.travel_date,
        end_date=booking.end_date,
        number_of_people=booking.number_of_people,
        special_requests=booking.special_requests,
        user_id=user_id,
        total_price=total_price,
        status="pending"
    )
    
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    
    # Return response model
    return BookingResponse(
        id=db_booking.id,
        booking_reference=f"WH-{datetime.now().strftime('%Y-%m-%d')}-{db_booking.id:03d}",
        destination_id=booking.destination_id,
        destination=DestinationResponse(
            id=destination.id,
            title=destination.title,
            location=destination.location,
            price=destination.price,
            rating=destination.rating,
            review_count=destination.review_count
        ),
        travel_date=db_booking.travel_date,
        end_date=db_booking.end_date,
        number_of_people=db_booking.number_of_people,
        travelers=[],
        total_price=db_booking.total_price,
        status=db_booking.status,
        created_at=db_booking.created_at,
        updated_at=db_booking.updated_at
    )

def update_booking_status(db: Session, booking_id: int, status: str) -> Optional[BookingResponse]:
    """
    Update booking status with proper validation.
    """
    db_booking = (
        db.query(Booking)
        .filter(Booking.id == booking_id)
        .first()
    )
    
    if db_booking:
        # Validate status
        valid_statuses = ["pending", "confirmed", "cancelled", "completed"]
        if status not in valid_statuses:
            raise ValueError(f"Invalid status: {status}. Must be one of {valid_statuses}")
        
        db_booking.status = status
        db.commit()
        db.refresh(db_booking)
        
        return BookingResponse(
            id=db_booking.id,
            booking_reference=db_booking.booking_reference,
            destination_id=db_booking.destination_id,
            destination=DestinationResponse(
                id=db_booking.destination.id,
                title=db_booking.destination.title,
                location=db_booking.destination.location,
                price=db_booking.destination.price,
                rating=db_booking.destination.rating,
                review_count=db_booking.destination.review_count
            ),
            travel_date=db_booking.travel_date,
            end_date=db_booking.end_date,
            number_of_people=db_booking.number_of_people,
            travelers=[],
            total_price=db_booking.total_price,
            status=db_booking.status,
            created_at=db_booking.created_at,
            updated_at=db_booking.updated_at
        )
    
    return None
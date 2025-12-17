# app/crud/booking.py

from typing import List, Optional
from sqlalchemy.orm import Session, joinedload  # <-- 1. IMPORT joinedload
from datetime import datetime

from app.models.booking import Booking
from app.models.destination import Destination
from app.schemas.booking import BookingCreate, BookingUpdate

def get_bookings_by_user(db: Session, user_id: int) -> List[Booking]:
    """
    Retrieve all bookings for a given user, including destination details.
    """
    # --- 2. FIX THE QUERY ---
    # Use joinedload to fetch the related destination object for each booking
    return (
        db.query(Booking)
        .options(joinedload(Booking.destination))
        .filter(Booking.user_id == user_id)
        .all()
    )

def get_booking_by_id(db: Session, booking_id: int) -> Optional[Booking]:
    # It's also good practice to use joinedload here if you need destination details
    return (
        db.query(Booking)
        .options(joinedload(Booking.destination))
        .filter(Booking.id == booking_id)
        .first()
    )

def create_booking(
    db: Session, 
    booking: BookingCreate, 
    user_id: int,
    total_price: float
) -> Booking:
    db_booking = Booking(
        # It's better to unpack the dict explicitly to avoid issues with extra fields
        destination_id=booking.destination_id,
        travel_date=booking.travel_date,
        number_of_people=booking.number_of_people,
        special_requests=booking.special_requests,
        user_id=user_id,
        total_price=total_price,
        status="pending"
    )
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    return db_booking

def update_booking_status(db: Session, booking_id: int, status: str) -> Optional[Booking]:
    db_booking = get_booking_by_id(db, booking_id=booking_id)
    if db_booking:
        db_booking.status = status
        db.commit()
        db.refresh(db_booking)
    return db_booking

def get_bookings_by_operator(db: Session, operator_id: int) -> List[Booking]:
    """
    Get all bookings for destinations belonging to a specific tour operator.
    """
    return (
        db.query(Booking)
        .join(Destination)
        .filter(Destination.operator_id == operator_id)
        .all()
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
    ) is not None

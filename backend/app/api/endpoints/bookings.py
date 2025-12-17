
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_db, get_current_user
from app.crud.booking import get_bookings_by_user, create_booking, update_booking_status, get_booking_by_id
from app.crud.destination import get_destination_by_id
from app.schemas.booking import Booking, BookingCreate, BookingUpdate
from app.models.user import User

router = APIRouter()

@router.get("/", response_model=List[Booking])
def read_user_bookings(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get all bookings for the current user.
    """
    return get_bookings_by_user(db, user_id=current_user.id)

@router.post("/", response_model=Booking)
def create_booking_endpoint( 
    booking: BookingCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Create a new booking.
    """
    
    destination = get_destination_by_id(db, destination_id=booking.destination_id)
    if not destination:
        raise HTTPException(status_code=404, detail="Destination not found")
    
    
    total_price = destination.price * booking.number_of_people
    
   
    return create_booking(
        db=db, 
        booking=booking, 
        user_id=current_user.id,
        total_price=total_price
    )

@router.put("/{booking_id}/status", response_model=Booking)
def update_booking_status_endpoint(
    booking_id: int,
    status_update: BookingUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Update booking status (e.g., confirm, cancel).
    """
    # Check if booking exists and belongs to the current user
    booking = get_booking_by_id(db, booking_id=booking_id)
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    if booking.user_id != current_user.id and not current_user.is_operator:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to update this booking"
        )
    
    return update_booking_status(db, booking_id=booking_id, status=status_update.status)
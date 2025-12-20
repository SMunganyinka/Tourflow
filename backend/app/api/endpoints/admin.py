# app/api/endpoints/admin.py

from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func  # Used for efficient sum queries

from app.api.deps import get_current_user, get_db
from app.models.user import User
from app.models.booking import Booking
from app.models.destination import Destination
from app.schemas.booking import BookingResponse
from app.schemas.destination import DestinationResponse
from app.services.booking_service import BookingService

router = APIRouter()

@router.get("/dashboard/stats")
def get_dashboard_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get dashboard statistics for an admin/operator.
    """
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )
    
    total_bookings = db.query(Booking).count()
    
    # Use func.sum for a more efficient query to get total revenue
    revenue_result = db.query(func.sum(Booking.total_price)).filter(Booking.status == "COMPLETED").scalar()
    total_revenue = revenue_result or 0
    
    total_users = db.query(User).count()
    total_destinations = db.query(Destination).count()
    
    return {
        "total_bookings": total_bookings,
        "total_revenue": total_revenue,
        "total_users": total_users,
        "total_destinations": total_destinations
    }


@router.get("/bookings", response_model=List[BookingResponse])
def get_all_bookings_for_admin(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get all bookings in the system (admin only).
    """
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )
    
    # Use the BookingService instead of the missing CRUD function
    booking_service = BookingService(db)
    return booking_service.get_all_bookings(skip=skip, limit=limit)


@router.get("/destinations", response_model=List[DestinationResponse])
def get_all_destinations_for_admin(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get all destinations in the system (admin only).
    """
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )
    
    # For simplicity, we'll do a direct database query here.
    # You could also create a DestinationService for this.
    return db.query(Destination).offset(skip).limit(limit).all()
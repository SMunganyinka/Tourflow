from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_db, get_current_user
from app.crud.booking import get_bookings_by_operator
from app.crud.destination import get_destinations_by_operator
from app.schemas.booking import Booking
from app.schemas.destination import Destination
from app.models.user import User

router = APIRouter()

@router.get("/destinations", response_model=List[Destination])
def read_operator_destinations(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get all destinations for the current tour operator.
    """
    if not current_user.is_operator:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access operator dashboard"
        )
    
    return get_destinations_by_operator(db, operator_id=current_user.id)

@router.get("/bookings", response_model=List[Booking])
def read_operator_bookings(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get all bookings for the current tour operator's destinations.
    """
    if not current_user.is_operator:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access operator dashboard"
        )
    
    return get_bookings_by_operator(db, operator_id=current_user.id)
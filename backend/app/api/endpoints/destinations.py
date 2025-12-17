from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.api.deps import get_db, get_current_user
from app.crud.destination import get_destinations, get_destination_by_id
from app.schemas.destination import Destination, DestinationCreate, DestinationUpdate
from app.models.user import User

router = APIRouter()

@router.get("/", response_model=List[Destination])
def read_destinations(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    location: Optional[str] = Query(None),
    min_price: Optional[float] = Query(None),
    max_price: Optional[float] = Query(None),
    min_rating: Optional[float] = Query(None),
):
    """
    Retrieve destinations with optional filters.
    """
    destinations = get_destinations(
        db, 
        skip=skip, 
        limit=limit,
        location=location,
        min_price=min_price,
        max_price=max_price,
        min_rating=min_rating
    )
    return destinations

@router.get("/{destination_id}", response_model=Destination)
def read_destination(destination_id: int, db: Session = Depends(get_db)):
    """
    Get a specific destination by ID.
    """
    db_destination = get_destination_by_id(db, destination_id=destination_id)
    if db_destination is None:
        raise HTTPException(status_code=404, detail="Destination not found")
    return db_destination

@router.post("/", response_model=Destination)
def create_destination(
    destination: DestinationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Create a new destination. Only accessible by tour operators.
    """
    if not current_user.is_operator:
        raise HTTPException(status_code=403, detail="Not authorized to create destinations")
    
    return create_destination(db=db, destination=destination, operator_id=current_user.id)

@router.put("/{destination_id}", response_model=Destination)
def update_destination(
    destination_id: int,
    destination: DestinationUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Update a destination. Only accessible by the tour operator who created it.
    """
    db_destination = get_destination_by_id(db, destination_id=destination_id)
    if db_destination is None:
        raise HTTPException(status_code=404, detail="Destination not found")
    
    if db_destination.operator_id != current_user.id and not current_user.is_superuser:
        raise HTTPException(status_code=403, detail="Not authorized to update this destination")
    
    return update_destination(db=db, destination_id=destination_id, destination=destination)
# app/api/endpoints/destinations.py

from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.api.deps import get_current_user, get_db
from app.models.user import User
from app.models.destination import Destination as DestinationModel  # Alias to avoid confusion
from app.schemas.destination import DestinationCreate, DestinationResponse, DestinationUpdate  # <-- FIX IS HERE

router = APIRouter()

@router.get("/", response_model=List[DestinationResponse])
def get_destinations(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """
    Retrieve all active destinations.
    """
    destinations = db.query(DestinationModel).filter(DestinationModel.is_active == True).offset(skip).limit(limit).all()
    return destinations

@router.post("/", response_model=DestinationResponse)
def create_destination(
    destination: DestinationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Create a new destination (admin only).
    """
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )
    
    db_destination = DestinationModel(**destination.dict())
    db.add(db_destination)
    db.commit()
    db.refresh(db_destination)
    return db_destination

@router.get("/{destination_id}", response_model=DestinationResponse)
def get_destination(
    destination_id: int,
    db: Session = Depends(get_db)
):
    """
    Get a specific destination by ID.
    """
    destination = db.query(DestinationModel).filter(DestinationModel.id == destination_id).first()
    if not destination:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Destination not found"
        )
    return destination

@router.put("/{destination_id}", response_model=DestinationResponse)
def update_destination(
    destination_id: int,
    destination_update: DestinationUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Update a destination (admin only).
    """
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )
    
    db_destination = db.query(DestinationModel).filter(DestinationModel.id == destination_id).first()
    if not db_destination:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Destination not found"
        )
    
    update_data = destination_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_destination, field, value)
    
    db.commit()
    db.refresh(db_destination)
    return db_destination

@router.delete("/{destination_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_destination(
    destination_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Delete a destination (admin only). This is a soft delete - it sets is_active to False.
    """
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )
    
    db_destination = db.query(DestinationModel).filter(DestinationModel.id == destination_id).first()
    if not db_destination:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Destination not found"
        )
    
    # Soft delete
    db_destination.is_active = False
    db.commit()
    return None
from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy import and_, or_

from app.models.destination import Destination
from app.schemas.destination import DestinationCreate, DestinationUpdate

def get_destinations(
    db: Session, 
    skip: int = 0, 
    limit: int = 100,
    location: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    min_rating: Optional[float] = None
) -> List[Destination]:
    query = db.query(Destination)
    
    if location:
        query = query.filter(Destination.location.ilike(f"%{location}%"))
    
    if min_price is not None:
        query = query.filter(Destination.price >= min_price)
    
    if max_price is not None:
        query = query.filter(Destination.price <= max_price)
    
    if min_rating is not None:
        query = query.filter(Destination.rating >= min_rating)
    
    return query.offset(skip).limit(limit).all()

def get_destination_by_id(db: Session, destination_id: int) -> Optional[Destination]:
    return db.query(Destination).filter(Destination.id == destination_id).first()

def create_destination(db: Session, destination: DestinationCreate, operator_id: int) -> Destination:
    db_destination = Destination(
        **destination.dict(),
        operator_id=operator_id
    )
    db.add(db_destination)
    db.commit()
    db.refresh(db_destination)
    return db_destination

def update_destination(
    db: Session, 
    destination_id: int, 
    destination: DestinationUpdate
) -> Destination:
    db_destination = get_destination_by_id(db, destination_id=destination_id)
    
    update_data = destination.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_destination, key, value)
    
    db.commit()
    db.refresh(db_destination)
    return db_destination

def get_destinations_by_operator(db: Session, operator_id: int) -> List[Destination]:
    return db.query(Destination).filter(Destination.operator_id == operator_id).all()
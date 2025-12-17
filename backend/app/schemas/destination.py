# app/schemas/destination.py

from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

# Base schema with common attributes
class DestinationBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    description: str
    location: str
    latitude: float
    longitude: float
    price: float = Field(..., gt=0)
    image_url: Optional[str] = None

# Schema for creating a new destination (inherits from DestinationBase)
class DestinationCreate(DestinationBase):
    pass

# Schema for updating a destination (all fields are optional)
class DestinationUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    description: Optional[str] = None
    location: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    price: Optional[float] = Field(None, gt=0)
    image_url: Optional[str] = None

# Schema for returning destination data in API responses
# Includes all fields from the database model
class Destination(DestinationBase):
    id: int
    rating: float
    created_at: datetime
    operator_id: int

    # This configuration allows Pydantic to read data from ORM objects
    class Config:
        from_attributes = True
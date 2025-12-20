# app/schemas/destination.py

from pydantic import BaseModel, ConfigDict
from typing import Optional

# --- Base Schema ---
# Contains fields common to all destination schemas
class DestinationBase(BaseModel):
    title: str
    description: Optional[str] = None
    location: str
    price: float
    image_url: Optional[str] = None
    rating: float

# --- Request Schemas ---

# Schema for creating a new destination
class DestinationCreate(DestinationBase):
    is_active: bool = True

# Schema for updating an existing destination (all fields are optional)
class DestinationUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    location: Optional[str] = None
    price: Optional[float] = None
    image_url: Optional[str] = None
    rating: Optional[float] = None
    is_active: Optional[bool] = None

# --- Response Schema ---

# This is the schema your admin endpoint is trying to import.
# It defines how destination data is returned in API responses.
class DestinationResponse(DestinationBase):
    id: int
    is_active: bool

    # This configuration allows Pydantic to read data from ORM objects (like SQLAlchemy models)
    # Use this for Pydantic v2
    model_config = ConfigDict(from_attributes=True)

    # Use this for Pydantic v1 instead
    # class Config:
    #     orm_mode = True
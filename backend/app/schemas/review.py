# app/schemas/review.py

from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

# Base schema with common attributes
class ReviewBase(BaseModel):
    rating: float = Field(..., ge=1, le=5) # Rating must be between 1 and 5
    comment: str = Field(..., min_length=1, max_length=1000)

# Schema for creating a new review (inherits from ReviewBase)
class ReviewCreate(ReviewBase):
    destination_id: int

# Schema for updating a review (all fields are optional)
class ReviewUpdate(BaseModel):
    rating: Optional[float] = Field(None, ge=1, le=5)
    comment: Optional[str] = Field(None, min_length=1, max_length=1000)

# Schema for returning review data in API responses
# Includes all fields from the database model
class Review(ReviewBase):
    id: int
    user_id: int
    destination_id: int
    created_at: datetime

    # This configuration allows Pydantic to read data from ORM objects
    class Config:
        from_attributes = True
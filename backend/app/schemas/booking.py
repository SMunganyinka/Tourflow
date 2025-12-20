# app/schemas/booking.py

from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

# This is a base schema with common fields for creating or updating a booking
class BookingBase(BaseModel):
    destination_id: int
    travel_date: datetime
    number_of_travelers: int
    special_requests: Optional[str] = None
    contact_email: EmailStr
    contact_phone: Optional[str] = None

# Schema for creating a new booking.
# It inherits from BookingBase. The user will provide this data.
class BookingCreate(BookingBase):
    pass

# Schema for updating an existing booking.
# All fields are optional to allow for partial updates.
class BookingUpdate(BaseModel):
    travel_date: Optional[datetime] = None
    number_of_travelers: Optional[int] = None
    special_requests: Optional[str] = None
    contact_email: Optional[EmailStr] = None
    contact_phone: Optional[str] = None
    status: Optional[str] = None # Often status is updated separately, but can be here too.

# Schema for returning booking data in an API response.
# It includes all fields from the database model, like the ID and status.
class BookingResponse(BookingBase):
    id: int
    user_id: int
    booking_reference: str
    booking_date: datetime
    total_price: float
    status: str

    # This special configuration tells Pydantic to read data from ORM objects,
    # which allows you to pass a SQLAlchemy model instance directly.
    class Config:
        from_attributes = True
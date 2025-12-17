# app/schemas/booking.py

from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List

# --- 1. DEFINE THE DESTINATION SCHEMA ---
# First, we need a schema for the destination data.
# This will be nested inside our booking response.
class Destination(BaseModel):
    id: int
    title: str
    location: str
    price: float
    # Add any other destination fields you want to include in the API response

    class Config:
        from_attributes = True


# --- 2. DEFINE THE BOOKING SCHEMAS ---

# Base schema with common attributes
class BookingBase(BaseModel):
    destination_id: int
    travel_date: datetime
    number_of_people: int
    special_requests: Optional[str] = None # Assuming this field exists

# Schema for creating a new booking (inherits from BookingBase)
class BookingCreate(BookingBase):
    travelers: List[dict] # Assuming travelers are sent as a list of dicts

# Schema for updating a booking (e.g., changing status)
class BookingUpdate(BaseModel):
    status: Optional[str] = None

# --- 3. UPDATE THE MAIN BOOKING RESPONSE SCHEMA ---
# Schema for returning booking data in API responses
# This now includes the nested destination object.
class Booking(BookingBase):
    id: int
    user_id: int
    booking_date: datetime
    total_price: float
    status: str
    payment_id: Optional[str] = None
    
    # --- KEY CHANGE ---
    # Add the nested destination object to the response schema
    destination: Destination

    # This configuration allows Pydantic to read data from ORM objects
    class Config:
        from_attributes = True

# app/models/response.py
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime

class BookingResponse(BaseModel):
    id: int
    booking_reference: str
    destination_id: int
    destination: Optional['DestinationResponse'] = None
    travel_date: datetime
    end_date: Optional[datetime] = None
    number_of_people: int
    travelers: List[dict]
    total_price: float
    status: str
    created_at: datetime
    updated_at: datetime

class DestinationResponse(BaseModel):
    id: int
    title: str
    location: str
    price: float
    rating: float
    review_count: int
# app/models/booking.py

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Float, Text # <-- 1. IMPORT Text
from sqlalchemy.orm import relationship
from datetime import datetime
from app.core.database import Base

class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    destination_id = Column(Integer, ForeignKey("destinations.id"))
    booking_date = Column(DateTime, default=datetime.utcnow)
    travel_date = Column(DateTime)
    number_of_people = Column(Integer)
    total_price = Column(Float)
    status = Column(String(50), default="pending")
    payment_id = Column(String(100), nullable=True)
    
    # --- 2. ADD THE MISSING COLUMN ---
    # This column will store the optional special requests from the booking form.
    special_requests = Column(Text, nullable=True)
    # --- END OF ADDITION ---

    user = relationship("User", back_populates="bookings")
    destination = relationship("Destination", back_populates="bookings")
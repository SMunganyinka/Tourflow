# app/models/booking.py

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Float, Text 
from sqlalchemy.orm import relationship
from datetime import datetime
from app.core.database import Base

class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    booking_reference = Column(String(20), unique=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    destination_id = Column(Integer, ForeignKey("destinations.id"))
    booking_date = Column(DateTime, default=datetime.utcnow)
    travel_date = Column(DateTime)
    number_of_travelers = Column(Integer, nullable=False)
    total_price = Column(Float)
    status = Column(String(50), default="pending")
    payment_id = Column(String(100), nullable=True)
    
    
   # In app/models/booking.py
    special_requests = Column(String(500), nullable=True)
    contact_email = Column(String(100), nullable=False) # <-- ADD THIS
    contact_phone = Column(String(20), nullable=True) # <-- ADD THIS
    # --- END OF ADDITION ---

    user = relationship("User", back_populates="bookings")
    destination = relationship("Destination", back_populates="bookings")
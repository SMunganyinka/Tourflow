from sqlalchemy import Column, Integer, String, Text, Float, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime

from app.core.database import Base

class Destination(Base):
    __tablename__ = "destinations"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), index=True)  # Added length
    description = Column(Text)  # Text doesn't need length
    location = Column(String(200))  # Added length
    latitude = Column(Float)
    longitude = Column(Float)
    price = Column(Float)
    image_url = Column(String(500))  # Added length
    rating = Column(Float, default=0.0)
    is_active = Column(Boolean, default=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    operator_id = Column(Integer, ForeignKey("users.id"))
    
    operator = relationship("User")
    bookings = relationship("Booking", back_populates="destination")
    reviews = relationship("Review", back_populates="destination")
    operator_id = Column(Integer, ForeignKey("users.id"))  # Links to the 'users' table
    operator = relationship("User", back_populates="destinations")  # Creates the relationship
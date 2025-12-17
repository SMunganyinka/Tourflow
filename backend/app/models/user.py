# app/models/user.py

from sqlalchemy import Boolean, Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

from app.core.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(100), unique=True, index=True)
    username = Column(String(50), unique=True, index=True)
    hashed_password = Column(String(255))
    full_name = Column(String(100))
    is_active = Column(Boolean, default=True, nullable=False)
    is_operator = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # This column MUST exist in your model to match the database
    is_admin = Column(Boolean, default=False, nullable=False)
    
    bookings = relationship("Booking", back_populates="user")
    reviews = relationship("Review", back_populates="user")
# app/schemas/user.py

from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

# Base schema with common attributes
class UserBase(BaseModel):
    email: EmailStr
    username: str = Field(..., min_length=3, max_length=50)
    full_name: Optional[str] = None
    is_active: bool = True
    is_operator: bool = False
    
    # Add this field to match your database
    is_admin: bool = False
    created_at: datetime

# Schema for creating a new user
class UserCreate(UserBase):
    password: str = Field(..., min_length=6, max_length=72)

# Schema for updating a user
class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    username: Optional[str] = Field(None, min_length=3, max_length=50)
    full_name: Optional[str] = None
    is_active: Optional[bool] = None
    is_operator: Optional[bool] = None
    is_admin: Optional[bool] = None # Add this
    password: Optional[str] = Field(None, min_length=6, max_length=72)

# Schema for returning user data in API responses
class User(UserBase):
    id: int

    class Config:
        from_attributes = True

# Schema for the JWT token
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
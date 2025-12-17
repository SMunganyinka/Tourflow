# app/crud/user.py

from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate
from app.core.security import get_password_hash

def get_user_by_email(db: Session, email: str):
    """
    Get a single user by email address.
    """
    return db.query(User).filter(User.email == email).first()

def get_user_by_id(db: Session, user_id: int):
    """
    Get a single user by their ID.
    """
    return db.query(User).filter(User.id == user_id).first()

def create_user(db: Session, user: UserCreate):
    """
    Create a new user in the database.
    """
    # Hash the user's password before storing it
    hashed_password = get_password_hash(user.password)
    
    # Create a new User model instance
    db_user = User(
        email=user.email,
        username=user.username,
        hashed_password=hashed_password,
        full_name=user.full_name
    )
    
    # Add the new user to the session, commit it, and refresh
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return db_user
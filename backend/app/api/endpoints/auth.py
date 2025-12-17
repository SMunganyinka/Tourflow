# app/api/endpoints/auth.py

from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel

from app.api.deps import get_db, get_current_user
from app.core.security import create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES, verify_password
from app.crud import user as user_crud
from app.schemas.user import UserCreate, User, Token

router = APIRouter()


# --------------------------
# Request models for JSON login
# --------------------------
class LoginRequest(BaseModel):
    email: str
    password: str


# --------------------------
# Register endpoint
# --------------------------
@router.post("/register", response_model=User)
def register(user: UserCreate, db: Session = Depends(get_db)):
    """
    Register a new user.
    """
    db_user = user_crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return user_crud.create_user(db=db, user=user)


# --------------------------
# Login endpoint
# --------------------------
@router.post("/login", response_model=Token)
def login(login_data: LoginRequest, db: Session = Depends(get_db)):
    """
    Login with email and password, return JWT token.
    """
    user = user_crud.get_user_by_email(db, email=login_data.email)
    if not user or not verify_password(login_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )

    return {"access_token": access_token, "token_type": "bearer"}


# --------------------------
# Get current user
# --------------------------
@router.get("/me", response_model=User)
def read_current_user(current_user: User = Depends(get_current_user)):
    """
    Get the currently authenticated user.
    """
    return current_user


# --------------------------
# Logout endpoint
# --------------------------
@router.post("/logout")
def logout():
    """
    Logout the user. JWT is stateless, so client just discards token.
    """
    return {"message": "Successfully logged out"}

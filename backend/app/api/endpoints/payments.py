# app/api/endpoints/payments.py

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
import uuid
from sqlalchemy.orm import Session # Make sure to import Session

from app.api.deps import get_db, get_current_user
from app.crud.booking import get_booking_by_id, update_booking_status
from app.models.user import User

router = APIRouter()

class PaymentRequest(BaseModel):
    booking_id: int
    card_number: str
    expiry_date: str
    cvv: str
    cardholder_name: str

class PaymentResponse(BaseModel):
    success: bool
    payment_id: str
    message: str

@router.post("/process", response_model=PaymentResponse)
def process_payment(
    payment: PaymentRequest,
    db: Session = Depends(get_db), # <-- FIX: Added 'db' dependency here
    current_user: User = Depends(get_current_user)
):
    """
    Process a payment for a booking (simulated).
    """
    # In a real implementation, you would integrate with a payment gateway like Stripe or PayPal
    # Here we're just simulating a payment process
    
    # Validate card number (simple validation for demo purposes)
    if len(payment.card_number.replace(" ", "")) < 13 or len(payment.card_number.replace(" ", "")) > 19:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid card number"
        )
    
    # Validate CVV
    if len(payment.cvv) < 3 or len(payment.cvv) > 4:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid CVV"
        )
    
    # Get the booking from the database
    booking = get_booking_by_id(db, booking_id=payment.booking_id)
    
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Booking not found"
        )
    
    if booking.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to pay for this booking"
        )
    
    if booking.status != "pending":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This booking cannot be paid for"
        )
    
    # Simulate payment processing
    # In a real implementation, you would call the payment gateway API here
    payment_id = str(uuid.uuid4())
    
    # Update booking status in the database
    update_booking_status(db, booking_id=payment.booking_id, status="confirmed")
    
    return {
        "success": True,
        "payment_id": payment_id,
        "message": "Payment processed successfully"
    }
# app/api/endpoints/reviews.py

from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_db, get_current_user
# FIX: Added get_review_by_id to the import statement
from app.crud.review import get_reviews_by_destination, create_review, update_review, delete_review, get_review_by_id
from app.crud.booking import get_bookings_by_user_and_destination
from app.schemas.review import Review, ReviewCreate, ReviewUpdate
from app.models.user import User

router = APIRouter()

@router.get("/destination/{destination_id}", response_model=List[Review])
def read_destination_reviews(
    destination_id: int,
    db: Session = Depends(get_db)
):
    """
    Get all reviews for a specific destination.
    """
    return get_reviews_by_destination(db, destination_id=destination_id)

@router.post("/", response_model=Review)
def create_review_for_destination(
    review: ReviewCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Create a new review for a destination.
    User must have booked the destination to leave a review.
    """
    # Check if user has booked this destination
    has_booked = get_bookings_by_user_and_destination(
        db, user_id=current_user.id, destination_id=review.destination_id
    )
    
    if not has_booked:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You must book this destination before leaving a review"
        )
    
    return create_review(db=db, review=review, user_id=current_user.id)

@router.put("/{review_id}", response_model=Review)
def update_review_for_destination(
    review_id: int,
    review_update: ReviewUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Update a review. Only the review author can update it.
    """
    # This line should now work correctly
    review = get_review_by_id(db, review_id=review_id)
    
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    
    if review.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to update this review"
        )
    
    return update_review(db=db, review_id=review_id, review_update=review_update)

@router.delete("/{review_id}")
def delete_review_for_destination(
    review_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Delete a review. Only the review author can delete it.
    """
    # This line should now work correctly
    review = get_review_by_id(db, review_id=review_id)
    
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    
    if review.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to delete this review"
        )
    
    delete_review(db=db, review_id=review_id)
    return {"message": "Review deleted successfully"}
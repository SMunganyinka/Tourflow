from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.models.review import Review
from app.models.destination import Destination
from app.schemas.review import ReviewCreate, ReviewUpdate

def get_reviews_by_destination(db: Session, destination_id: int) -> List[Review]:
    return db.query(Review).filter(Review.destination_id == destination_id).all()

def get_review_by_id(db: Session, review_id: int) -> Optional[Review]:
    return db.query(Review).filter(Review.id == review_id).first()

def create_review(db: Session, review: ReviewCreate, user_id: int) -> Review:
    db_review = Review(
        **review.dict(),
        user_id=user_id
    )
    db.add(db_review)
    db.commit()
    db.refresh(db_review)
    
    # Update destination rating
    update_destination_rating(db, destination_id=review.destination_id)
    
    return db_review

def update_review(db: Session, review_id: int, review_update: ReviewUpdate) -> Review:
    db_review = get_review_by_id(db, review_id=review_id)
    
    update_data = review_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_review, key, value)
    
    db.commit()
    db.refresh(db_review)
    
    # Update destination rating
    update_destination_rating(db, destination_id=db_review.destination_id)
    
    return db_review

def delete_review(db: Session, review_id: int) -> bool:
    db_review = get_review_by_id(db, review_id=review_id)
    if not db_review:
        return False
    
    destination_id = db_review.destination_id
    
    db.delete(db_review)
    db.commit()
    
    # Update destination rating
    update_destination_rating(db, destination_id=destination_id)
    
    return True

def update_destination_rating(db: Session, destination_id: int) -> None:
    # Calculate new average rating
    avg_rating = db.query(func.avg(Review.rating)).filter(
        Review.destination_id == destination_id
    ).scalar()
    
    # Update destination
    db.query(Destination).filter(Destination.id == destination_id).update(
        {"rating": round(avg_rating, 1) if avg_rating else 0.0}
    )
    db.commit()
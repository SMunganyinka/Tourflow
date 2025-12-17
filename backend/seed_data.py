# seed_data.py
import os
from dotenv import load_dotenv
from sqlalchemy.orm import sessionmaker
from app.models.destination import Destination
from app.models.user import User
from app.models.booking import Booking
from app.models.review import Review
from app.core.database import engine

load_dotenv()

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
db = SessionLocal()

def create_sample_data():
    """Create sample user and destinations"""
    
    # First create a user (operator)
    user = User(
        username="admin",
        email="admin@tourflow.com",
        hashed_password="12345678",
        full_name="Admin User",
        is_operator=True
    )
    
    # Sample destinations - make sure all are included
    destinations = [
        Destination(
            title="Paris Getaway",
            description="Experience the city of lights with this amazing tour package",
            location="Paris, France",
            latitude=48.8566,
            longitude=2.3522,
            price=1299.99,
            rating=4.8,
            image_url="https://picsum.photos/seed/paris/400/500.jpg"
        ),
        Destination(
            title="Tokyo Adventure",
            description="Explore the vibrant city of Tokyo with our expert guides",
            location="Tokyo, Japan",
            latitude=35.6762,
            longitude=139.6503,
            price=1599.99,
            rating=4.9,
            image_url="https://picsum.photos/seed/tokyo/400/500.jpg"
        ),
        Destination(
            title="Safari Experience",
            description="Wildlife safari in the heart of Africa",
            location="Kenya",
            latitude=-1.2864,
            longitude=36.8172,
            price=2499.99,
            rating=4.7,
            image_url="https://picsum.photos/seed/safari/400/500.jpg"
        ),
        Destination(
            title="Beach Paradise",
            description="Relax on pristine white sand beaches",
            location="Maldives",
            latitude=3.2028,
            longitude=73.2207,
            price=3299.99,
            rating=4.9,
            image_url="https://picsum.photos/seed/maldives/400/500.jpg"
        ),
        Destination(
            title="Mountain Trek",
            description="Challenge yourself with Himalayan trekking",
            location="Nepal",
            latitude=27.9881,
            longitude=86.9250,
            price=1899.99,
            rating=4.6,
            image_url="https://picsum.photos/seed/nepal/400/500.jpg"
        ),
        Destination(
            title="City Tour",
            description="Explore the historic streets of Rome",
            location="Rome, Italy",
            latitude=41.9028,
            longitude=12.4964,
            price=999.99,
            rating=4.5,
            image_url="https://picsum.photos/seed/rome/400/500.jpg"
        ),
        Destination(
            title="Island Hopping",
            description="Discover beautiful Greek islands",
            location="Greece",
            latitude=39.0742,
            longitude=21.8243,
            price=1799.99,
            rating=4.8,
            image_url="https://picsum.photos/seed/greece/400/500.jpg"
        ),
        Destination(
            title="Desert Safari",
            description="Experience the magic of the Sahara",
            location="Morocco",
            latitude=31.7917,
            longitude=-7.0926,
            price=1399.99,
            rating=4.4,
            image_url="https://picsum.photos/seed/morocco/400/500.jpg"
        )
    ]
    
    try:
        # Check if user already exists
        existing_user = db.query(User).filter(User.email == "admin@tourflow.com").first()
        if not existing_user:
            # Add user first
            db.add(user)
            db.commit()
            db.refresh(user)  # Get the user ID from database
            print(f"✅ Created user: {user.email} (ID: {user.id})")
        else:
            user = existing_user
            print(f"ℹ️ Using existing user: {user.email} (ID: {user.id})")
        
        # Add ALL destinations
        added_count = 0
        for dest in destinations:
            dest.operator_id = user.id  # Use the created user's ID
            db.add(dest)
            added_count += 1
        
        db.commit()
        print(f"✅ Successfully added {added_count} destinations!")
        
        # Verify data was added
        total_destinations = db.query(Destination).count()
        print(f"📊 Total destinations in database: {total_destinations}")
        
        # Show what was added
        print("\n📍 Destinations added:")
        for dest in db.query(Destination).all():
            print(f"  - {dest.title} ({dest.location}) - ${dest.price}")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    create_sample_data()
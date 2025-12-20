# seed_data.py

import os
from dotenv import load_dotenv
from sqlalchemy.orm import sessionmaker
from app.models.destination import Destination
from app.models.user import User
from app.models.booking import Booking
from app.models.review import Review
from app.core.database import engine
from app.core.security import get_password_hash # Make sure to import this

load_dotenv()

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
db = SessionLocal()

def create_sample_data():
    """Create sample user and destinations"""
    
    # First create a user (operator)
    user = User(
        username="admin",
        email="admin@tourflow.com",
        hashed_password=get_password_hash("12345678"), # Use hashed password
        full_name="Admin User",
        is_operator=True
    )
    
    # Expanded list of destinations
    destinations = [
        # Europe
        Destination(title="Paris Getaway", description="Experience the city of lights with this amazing tour package.", location="Paris, France", latitude=48.8566, longitude=2.3522, price=1299.99, rating=4.8, image_url="https://picsum.photos/seed/paris/400/500.jpg"),
        Destination(title="City Tour", description="Explore the historic streets of Rome.", location="Rome, Italy", latitude=41.9028, longitude=12.4964, price=999.99, rating=4.5, image_url="https://picsum.photos/seed/rome/400/500.jpg"),
        Destination(title="Island Hopping", description="Discover the beautiful Greek islands.", location="Greece", latitude=39.0742, longitude=21.8243, price=1799.99, rating=4.8, image_url="https://picsum.photos/seed/greece/400/500.jpg"),
        Destination(title="Northern Lights Expedition", description="Chase the Aurora Borealis in Iceland.", location="Reykjavik, Iceland", latitude=64.1466, longitude=-21.9426, price=2599.99, rating=4.9, image_url="https://picsum.photos/seed/iceland/400/500.jpg"),
        Destination(title="Amsterdam Canal Cruise", description="A scenic boat tour through Amsterdam's historic canals.", location="Amsterdam, Netherlands", latitude=52.3676, longitude=4.9041, price=899.99, rating=4.6, image_url="https://picsum.photos/seed/amsterdam/400/500.jpg"),
        Destination(title="Swiss Alps Ski Trip", description="Hit the slopes in the world-famous Swiss Alps.", location="Zermatt, Switzerland", latitude=46.0197, longitude=7.7477, price=2299.99, rating=4.9, image_url="https://picsum.photos/seed/swissalps/400/500.jpg"),
        Destination(title="Dubai Luxury Escape", description="Experience the ultimate luxury in the city of gold.", location="Dubai, UAE", latitude=25.2048, longitude=55.2708, price=3499.99, rating=4.7, image_url="https://picsum.photos/seed/dubai/400/500.jpg"),

        # Asia
        Destination(title="Tokyo Adventure", description="Explore the vibrant city of Tokyo with our expert guides.", location="Tokyo, Japan", latitude=35.6762, longitude=139.6503, price=1599.99, rating=4.9, image_url="https://picsum.photos/seed/tokyo/400/500.jpg"),
        Destination(title="Bali Spiritual Retreat", description="Find your inner peace in the serene temples of Bali.", location="Bali, Indonesia", latitude=-8.3405, longitude=115.0920, price=1199.99, rating=4.8, image_url="https://picsum.photos/seed/bali/400/500.jpg"),
        Destination(title="Phuket Beach Party", description="Sun, sand, and vibrant nightlife in Phuket.", location="Phuket, Thailand", latitude=7.8804, longitude=98.3923, price=1099.99, rating=4.4, image_url="https://picsum.photos/seed/phuket/400/500.jpg"),
        Destination(title="Great Wall of China Trek", description="Walk along one of the Seven Wonders of the World.", location="Beijing, China", latitude=40.4319, longitude=116.5704, price=1399.99, rating=4.7, image_url="https://picsum.photos/seed/greatwall/400/500.jpg"),
        Destination(title="Singapore Foodie Tour", description="A culinary journey through the hawker centers of Singapore.", location="Singapore", latitude=1.3521, longitude=103.8198, price=1499.99, rating=4.9, image_url="https://picsum.photos/seed/singapore/400/500.jpg"),
        Destination(title="Taj Mahal Sunrise", description="Witness the breathtaking beauty of the Taj Mahal at dawn.", location="Agra, India", latitude=27.1751, longitude=78.0421, price=799.99, rating=4.8, image_url="https://picsum.photos/seed/tajmahal/400/500.jpg"),

        # Africa & Middle East
        Destination(title="Safari Experience", description="A wildlife safari in the heart of Africa.", location="Kenya", latitude=-1.2864, longitude=36.8172, price=2499.99, rating=4.7, image_url="https://picsum.photos/seed/safari/400/500.jpg"),
        Destination(title="Pyramids of Giza", description="Stand in awe before the ancient Pyramids.", location="Cairo, Egypt", latitude=29.9792, longitude=31.1342, price=899.99, rating=4.6, image_url="https://picsum.photos/seed/pyramids/400/500.jpg"),
        Destination(title="Desert Safari", description="Experience the magic of the Sahara.", location="Morocco", latitude=31.7917, longitude=-7.0926, price=1399.99, rating=4.4, image_url="https://picsum.photos/seed/morocco/400/500.jpg"),
        Destination(title="Cape Town Adventure", description="From Table Mountain to the Cape of Good Hope.", location="Cape Town, South Africa", latitude=-33.9249, longitude=18.4241, price=1899.99, rating=4.8, image_url="https://picsum.photos/seed/capetown/400/500.jpg"),

        # Americas
        Destination(title="Beach Paradise", description="Relax on pristine white sand beaches.", location="Maldives", latitude=3.2028, longitude=73.2207, price=3299.99, rating=4.9, image_url="https://picsum.photos/seed/maldives/400/500.jpg"),
        Destination(title="Mountain Trek", description="Challenge yourself with Himalayan trekking.", location="Nepal", latitude=27.9881, longitude=86.9250, price=1899.99, rating=4.6, image_url="https://picsum.photos/seed/nepal/400/500.jpg"),
        Destination(title="NYC City Break", description="The energy of New York City awaits.", location="New York, USA", latitude=40.7128, longitude=-74.0060, price=1799.99, rating=4.5, image_url="https://picsum.photos/seed/nyc/400/500.jpg"),
        Destination(title="Grand Canyon Heli-Tour", description="See the Grand Canyon from a breathtaking perspective.", location="Arizona, USA", latitude=36.1069, longitude=-112.1129, price=499.99, rating=4.9, image_url="https://picsum.photos/seed/grandcanyon/400/500.jpg"),
        Destination(title="Amazon Rainforest Expedition", description="A deep dive into the world's largest rainforest.", location="Brazil", latitude=-3.4653, longitude=-62.2159, price=2199.99, rating=4.5, image_url="https://picsum.photos/seed/amazon/400/500.jpg"),
        Destination(title="Machu Picchu Trek", description="Hike the Inca Trail to the lost city of Machu Picchu.", location="Peru", latitude=-13.1631, longitude=-72.5450, price=1999.99, rating=4.9, image_url="https://picsum.photos/seed/machupicchu/400/500.jpg"),
        Destination(title="Canadian Rockies Road Trip", description="A scenic drive through the majestic Canadian Rockies.", location="Banff, Canada", latitude=51.1784, longitude=-115.5708, price=1599.99, rating=4.8, image_url="https://picsum.photos/seed/banff/400/500.jpg"),
        Destination(title="Mexican Fiesta", description="Enjoy the culture, food, and beaches of Mexico.", location="Cancun, Mexico", latitude=21.1619, longitude=-86.8515, price=1299.99, rating=4.3, image_url="https://picsum.photos/seed/cancun/400/500.jpg")
    ]
    
    try:
        # Check if user already exists
        existing_user = db.query(User).filter(User.email == "admin@tourflow.com").first()
        if not existing_user:
            db.add(user)
            db.commit()
            db.refresh(user)
            print(f"✅ Created user: {user.email} (ID: {user.id})")
        else:
            user = existing_user
            print(f"ℹ️ Using existing user: {user.email} (ID: {user.id})")
        
        # Add destinations, but check for duplicates by title
        added_count = 0
        for dest in destinations:
            existing_dest = db.query(Destination).filter(Destination.title == dest.title).first()
            if not existing_dest:
                dest.operator_id = user.id
                db.add(dest)
                added_count += 1
        
        db.commit()
        print(f"✅ Successfully added {added_count} new destinations!")
        
        # Verify data was added
        total_destinations = db.query(Destination).count()
        print(f"📊 Total destinations in database: {total_destinations}")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    create_sample_data()
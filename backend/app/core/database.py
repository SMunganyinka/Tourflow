# app/core/database.py

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from decouple import config

# Get the database URL from the .env file
DATABASE_URL = config("DATABASE_URL")

# Create the SQLAlchemy engine
# The engine is the starting point for any SQLAlchemy application.
engine = create_engine(DATABASE_URL)

# Create a configured "Session" class
# All future sessions will be created from this class.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create a Base class for our declarative models
# All of our models will inherit from this Base class.
Base = declarative_base()
# app/core/config.py

from decouple import config

# This file is used to load environment variables from the .env file
# into the application. This keeps sensitive information like database
# credentials and secret keys out of the source code.

SECRET_KEY = config("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

DATABASE_URL = config("DATABASE_URL")

WEATHER_API_KEY = config("WEATHER_API_KEY", default="")
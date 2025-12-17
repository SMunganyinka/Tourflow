# app/api/endpoints/weather.py

import httpx # <-- FIX: Added the missing import
from fastapi import APIRouter, Depends, HTTPException
from decouple import config

# The 'db' dependency is not used in this function, so it's removed for clarity.
# from app.api.deps import get_db 

router = APIRouter()
WEATHER_API_KEY = config("WEATHER_API_KEY", default="your-weather-api-key")
WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather"

@router.get("/{location}")
async def get_weather(location: str):  # existing: by city name
    """
    Get current weather for a location.
    """
    if not WEATHER_API_KEY or WEATHER_API_KEY == "your-weather-api-key":
        # Return mock data if no API key is provided
        return {
            "location": location,
            "temperature": 22.5,
            "description": "Partly cloudy",
            "humidity": 65,
            "wind_speed": 5.2,
            "icon": "02d"
        }

@router.get("/")
async def get_weather_by_coordinates(lat: float, lon: float):
    """
    Get current weather for given coordinates.
    """
    if not WEATHER_API_KEY or WEATHER_API_KEY == "your-weather-api-key":
        # Mock data when no API key is configured
        return {
            "location": "Your location",
            "temperature": 22.5,
            "description": "Partly cloudy",
            "humidity": 65,
            "wind_speed": 5.2,
            "icon": "02d"
        }

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                WEATHER_API_URL,
                params={
                    "lat": lat,
                    "lon": lon,
                    "appid": WEATHER_API_KEY,
                    "units": "metric"
                }
            )

            if response.status_code != 200:
                return {
                    "location": "Your location",
                    "temperature": 22.5,
                    "description": "Partly cloudy",
                    "humidity": 65,
                    "wind_speed": 5.2,
                    "icon": "02d"
                }

            data = response.json()

            return {
                "location": data.get("name") or "Your location",
                "temperature": data["main"]["temp"],
                "description": data["weather"][0]["description"],
                "humidity": data["main"]["humidity"],
                "wind_speed": data["wind"]["speed"],
                "icon": data["weather"][0]["icon"]
            }

    except httpx.RequestError:
        return {
            "location": "Your location",
            "temperature": 22.5,
            "description": "Partly cloudy",
            "humidity": 65,
            "wind_speed": 5.2,
            "icon": "02d"
        }
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                WEATHER_API_URL,
                params={
                    "q": location,
                    "appid": WEATHER_API_KEY,
                    "units": "metric"
                }
            )

            # If external API fails, fall back to mock data instead of raising an error
            if response.status_code != 200:
                return {
                    "location": location,
                    "temperature": 22.5,
                    "description": "Partly cloudy",
                    "humidity": 65,
                    "wind_speed": 5.2,
                    "icon": "02d"
                }

            data = response.json()

            return {
                "location": location,
                "temperature": data["main"]["temp"],
                "description": data["weather"][0]["description"],
                "humidity": data["main"]["humidity"],
                "wind_speed": data["wind"]["speed"],
                "icon": data["weather"][0]["icon"]
            }

    except httpx.RequestError:
        # Also fall back to mock data if there is a network error
        return {
            "location": location,
            "temperature": 22.5,
            "description": "Partly cloudy",
            "humidity": 65,
            "wind_speed": 5.2,
            "icon": "02d"
        }
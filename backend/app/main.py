# app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import all your API routers
from app.api.endpoints import auth, destinations, bookings, reviews, admin, recommendations, weather, payments

# Create the main FastAPI application instance
# This is the 'app' variable that uvicorn is looking for
app = FastAPI(
    title="TourFlow API",
    description="API for the TourFlow Tourism Management System",
    version="1.0.0",
)

# Configure CORS (Cross-Origin Resource Sharing)
# This allows your frontend (running on a different port) to communicate with the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://sweet-concha-204191.netlify.app"],  # Your Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the API routers from the endpoints folder
# This makes all your API routes available
app.include_router(auth.router, prefix="/api/auth", tags=["authentication"])
app.include_router(destinations.router, prefix="/api/destinations", tags=["destinations"])
app.include_router(bookings.router, prefix="/api/bookings", tags=["bookings"])
app.include_router(reviews.router, prefix="/api/reviews", tags=["reviews"])
app.include_router(payments.router, prefix="/api/payments", tags=["payments"])
app.include_router(admin.router, prefix="/api/admin", tags=["admin"])
app.include_router(recommendations.router, prefix="/api/recommendations", tags=["recommendations"])
app.include_router(weather.router, prefix="/api/weather", tags=["weather"])

@app.get("/")
def read_root():
    """
    A simple root endpoint to confirm the API is running.
    """
    return {"message": "Welcome to the TourFlow API"}
# Tourflow

**Tourflow** is a modern, full-stack web application for discovering and booking travel experiences. It connects travelers with unique destinations and offers a seamless booking experience from exploration to confirmation.

---

## 🌟 Features

- **Destination Discovery:** Explore curated travel destinations with detailed information, photos, and reviews.  
- **Advanced Search & Filtering:** Find trips based on location, dates, and interests.  
- **User Authentication:** Secure registration and login system with JWT tokens.  
- **Role-Based Access Control:** Separate dashboards for users and admins.  
- **Seamless Booking Process:** Intuitive multi-step booking for individuals or groups.  
- **Booking Management:** Users can track upcoming and past bookings.  
- **Admin Dashboard:** Manage destinations, view bookings, and oversee platform operations.  
- **Responsive Design:** Beautiful, fully responsive UI for all devices.  
- **Internationalization (i18n):** Multi-language support for a global audience.  

---

## 🛠️ Tech Stack

**Frontend:**  
- React 18  
- TypeScript  
- Vite  
- Tailwind CSS  
- React Router  
- React Hook Form  
- TanStack Query (React Query)  
- React Hot Toast  
- React i18next  

**Backend:**  
- Python  
- FastAPI  
- SQLAlchemy  
- Alembic (Database migrations)  
- PostgreSQL (or other SQL database)  
- Pydantic  
- JWT Authentication  

---

## 📋 Prerequisites

Make sure you have the following installed:

- Node.js (v18+)  
- npm or yarn  
- Python (v3.9+)  
- pip  
- PostgreSQL (or another SQL database)  

---

## 🚀 Getting Started

Follow these steps to run the project locally:

### 1. Clone the repository

```bash
git clone https://github.com/SMunganyinka/Tourflow.git
cd Tourflow
```

### 2. Backend Setup

```bash
cd backend
python -m venv venv       # Create virtual environment
```

**Activate the virtual environment:**  
- **Windows:** `.\venv\Scripts\activate`  
- **macOS/Linux:** `source venv/bin/activate`  

**Install dependencies:**

```bash
pip install -r requirements.txt
```

**Set up environment variables:**  
Create a `.env` file in the `backend/` directory:

```env
DATABASE_URL="postgresql://user:password@host:port/dbname"
SECRET_KEY="your-super-secret-key-here"
ALGORITHM="HS256"
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

**Run database migrations:**

```bash
alembic upgrade head
```

**Start the backend server:**

```bash
uvicorn app.main:app --reload
```

Backend API will be available at: `http://127.0.0.1:8000`

---

### 3. Frontend Setup

```bash
cd ../tourflow      # Navigate to frontend folder
npm install         # Install dependencies
```

**Set up environment variables:**  
Create a `.env` file in the frontend folder:

```env
VITE_API_URL=http://127.0.0.1:8000
```

**Start the frontend server:**

```bash
npm run dev
```

Frontend will be available at: `http://localhost:5173`

---

## 📁 Project Structure

```
tourflow/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── api/            # API endpoints
│   │   ├── core/           # Config & security
│   │   ├── crud/           # Database operations
│   │   ├── db/             # Database setup
│   │   ├── models/         # SQLAlchemy models
│   │   └── schemas/        # Pydantic schemas
│   ├── alembic/            # Database migrations
│   ├── venv/               # Python virtual environment
│   └── requirements.txt    # Dependencies
└── tourflow/               # React frontend
    ├── public/             # Static assets
    ├── src/
    │   ├── api/            # API service functions
    │   ├── components/     # Reusable UI components
    │   ├── features/       # Feature-based components
    │   ├── hooks/          # Custom hooks
    │   ├── pages/          # Top-level pages
    │   ├── types/          # TypeScript types
    │   └── utils/          # Utility functions
    ├── package.json
    └── vite.config.ts
```

---

## 🔗 API Endpoints

- `POST /api/auth/register` – Register a new user  
- `POST /api/auth/login` – Login and receive JWT token  
- `GET /api/destinations` – Get all destinations  
- `GET /api/destinations/{id}` – Get details of a destination  
- `POST /api/bookings/` – Create a new booking (protected)  
- `GET /api/bookings/me` – Get current user's bookings (protected)  
- `GET /api/dashboard/` – Admin dashboard data (protected, admin only)  

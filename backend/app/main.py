# backend/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import products, race_data, auth, orders
from app.config.settings import settings
import logging
from app.database import engine
from app import models
import datetime

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.APP_NAME,
    openapi_url="/api/openapi.json"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(products.router, prefix="/api/products", tags=["products"])
app.include_router(race_data.router, prefix="/api/race-data", tags=["race-data"])
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(orders.router, prefix="/api/orders", tags=["orders"])

@app.on_event("startup")
async def startup_event():
    logger.info("Starting up F1 Store API")
    # Add any startup tasks here (e.g., database connection verification)
    try:
        with engine.connect() as connection:
            logger.info("Successfully connected to the database")
    except Exception as e:
        logger.error(f"Error connecting to the database: {e}")
        raise

@app.on_event("shutdown")
async def shutdown_event():
    logger.info("Shutting down F1 Store API")
    # Add any cleanup tasks here

@app.get("/health")
async def health_check():
    """
    Health check endpoint for AWS health checks
    """
    try:
        # Test database connection
        with engine.connect() as connection:
            return {
                "status": "healthy",
                "database": "connected",
                "timestamp": datetime.datetime.now().isoformat()
            }
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        return {
            "status": "unhealthy",
            "database": "disconnected",
            "error": str(e),
            "timestamp": datetime.datetime.now().isoformat()
        }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

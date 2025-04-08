# app/db_init.py
from sqlalchemy_utils import database_exists, create_database
from .database import engine, Base
from .models import product, user, order  # Import all models
import logging

logger = logging.getLogger(__name__)

def init_db():
    try:
        if not database_exists(engine.url):
            create_database(engine.url)
            logger.info("Database created successfully")
        
        # Create all tables
        Base.metadata.create_all(bind=engine)
        logger.info("Database tables created successfully")
    
    except Exception as e:
        logger.error(f"Error initializing database: {e}")
        raise

if __name__ == "__main__":
    init_db()

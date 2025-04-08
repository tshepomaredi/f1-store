# backend/app/config/settings.py
from pydantic import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "F1 Store API"
    DEBUG: bool = True
    DATABASE_URL: str = "mysql+pymysql://user:password@localhost:3306/f1store"
    JWT_SECRET_KEY: str = "your-secret-key"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    ALLOWED_ORIGINS: list = ["http://localhost:3000"]

    class Config:
        env_file = ".env"

settings = Settings()

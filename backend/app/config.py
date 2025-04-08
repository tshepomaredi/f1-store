# app/config.py
from pydantic import BaseSettings
import boto3
import json

class Settings(BaseSettings):
    # Get database credentials from AWS Secrets Manager
    def get_db_credentials(self):
        secret_name = "f1-store-db-credentials"
        region_name = "eu-west-1"  # Your AWS region

        session = boto3.session.Session()
        client = session.client(
            service_name='secretsmanager',
            region_name=region_name
        )

        try:
            get_secret_value_response = client.get_secret_value(
                SecretId=secret_name
            )
        except Exception as e:
            raise e
        else:
            if 'SecretString' in get_secret_value_response:
                secret = json.loads(get_secret_value_response['SecretString'])
                return secret

    # Database configuration
    db_credentials = get_db_credentials()
    DATABASE_URL = f"postgresql://{db_credentials['username']}:{db_credentials['password']}@{db_credentials['host']}:{db_credentials['port']}/{db_credentials['dbname']}"
    
    # API configuration
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "F1 Store API"

    # Security
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    # CORS
    BACKEND_CORS_ORIGINS: list = ["http://localhost:3000"]  # Frontend URL

    class Config:
        env_file = ".env"

settings = Settings()

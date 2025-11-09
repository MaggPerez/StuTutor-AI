from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    """Application settings"""
    
    # Server
    port: int = 8000
    environment: str = "development"
    
    # CORS
    allowed_origins: str = "http://localhost:5173,http://localhost:3000"

    # API Keys
    gemini_api_key: str

    # Database (if needed)
    # database_url: str = ""

    # Other API Keys (if needed)
    # openai_api_key: str = ""
    # supabase_url: str = ""
    # supabase_key: str = ""
    
    class Config:
        env_file = ".env"
        case_sensitive = False

    @property
    def origins_list(self) -> List[str]:
        """Convert comma-separated origins to list"""
        return [origin.strip() for origin in self.allowed_origins.split(",")]

# Create settings instance
settings = Settings()


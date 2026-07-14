from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    APP_NAME: str = "AI HCP CRM"
    APP_ENV: str = "development"

    APP_HOST: str = "127.0.0.1"
    APP_PORT: int = 8000

    DATABASE_URL: str

    GROQ_API_KEY: str = ""

    MODEL_NAME: str = "llama-3.3-70b-versatile"

    SECRET_KEY: str

    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=True,
    )


settings = Settings()
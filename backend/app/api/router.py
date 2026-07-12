from fastapi import APIRouter

from app.api.chat import router as chat_router
from app.api.health import router as health_router
from app.api.interaction import router as interaction_router
from app.api.analytics import router as analytics_router

api_router = APIRouter()

api_router.include_router(chat_router)

api_router.include_router(health_router)

api_router.include_router(interaction_router)

api_router.include_router(analytics_router)
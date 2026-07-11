from fastapi import APIRouter

router = APIRouter(
    prefix="/interaction",
    tags=["Interaction"],
)


@router.get("/")
async def get_interactions():
    return {
        "success": True,
        "message": "Interaction API is working."
    }
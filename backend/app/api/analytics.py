from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.interaction import Interaction

router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"],
)


@router.get("/")
def get_dashboard_metrics(
    db: Session = Depends(get_db),
):

    total = db.query(Interaction).count()

    positive = (
        db.query(Interaction)
        .filter(Interaction.sentiment == "Positive")
        .count()
    )

    negative = (
        db.query(Interaction)
        .filter(Interaction.sentiment == "Negative")
        .count()
    )

    neutral = (
        db.query(Interaction)
        .filter(Interaction.sentiment == "Neutral")
        .count()
    )

    doctors = (
        db.query(Interaction.hcp_name)
        .distinct()
        .count()
    )

    return {
        "total": total,
        "positive": positive,
        "negative": negative,
        "neutral": neutral,
        "doctors": doctors,
    }
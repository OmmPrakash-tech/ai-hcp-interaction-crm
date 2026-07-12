from langchain_core.tools import tool

from app.database.session import SessionLocal
from app.models.interaction import Interaction
from sqlalchemy import desc


@tool
def get_all_interactions():
    """
    Return all HCP interactions stored in the CRM.
    """

    db = SessionLocal()

    try:
        interactions = db.query(Interaction).all()

        return [
            {
                "id": i.id,
                "hcp_name": i.hcp_name,
                "interaction_date": i.interaction_date,
                "sentiment": i.sentiment,
                "materials_shared": i.materials_shared,
                "notes": i.notes,
            }
            for i in interactions
        ]

    finally:
        db.close()


@tool
def get_last_interaction():
    """
    Return the most recently saved HCP interaction.
    """

    db = SessionLocal()

    try:
        interaction = (
            db.query(Interaction)
            .order_by(desc(Interaction.id))
            .first()
        )

        if interaction is None:
            return "No interactions found."

        return {
            "id": interaction.id,
            "hcp_name": interaction.hcp_name,
            "interaction_date": interaction.interaction_date,
            "sentiment": interaction.sentiment,
            "materials_shared": interaction.materials_shared,
            "notes": interaction.notes,
        }

    finally:
        db.close()


@tool
def get_interaction_by_doctor(hcp_name: str):
    """
    Return all interactions for a specific doctor.
    """

    db = SessionLocal()

    try:
        interactions = (
            db.query(Interaction)
            .filter(Interaction.hcp_name.ilike(f"%{hcp_name}%"))
            .all()
        )

        if not interactions:
            return f"No interaction found for {hcp_name}"

        return [
            {
                "id": i.id,
                "hcp_name": i.hcp_name,
                "interaction_date": i.interaction_date,
                "sentiment": i.sentiment,
                "materials_shared": i.materials_shared,
                "notes": i.notes,
            }
            for i in interactions
        ]

    finally:
        db.close()


@tool
def count_interactions():
    """
    Return the total number of interactions stored in the CRM.
    """

    db = SessionLocal()

    try:
        total = db.query(Interaction).count()

        return {
            "total_interactions": total
        }

    finally:
        db.close()


@tool
def get_positive_interactions():
    """
    Return all positive HCP interactions.
    """

    db = SessionLocal()

    try:
        interactions = (
            db.query(Interaction)
            .filter(Interaction.sentiment.ilike("positive"))
            .all()
        )

        if not interactions:
            return "No positive interactions found."

        return [
            {
                "id": i.id,
                "hcp_name": i.hcp_name,
                "interaction_date": i.interaction_date,
                "sentiment": i.sentiment,
                "materials_shared": i.materials_shared,
                "notes": i.notes,
            }
            for i in interactions
        ]

    finally:
        db.close()


@tool
def get_negative_interactions():
    """
    Return all negative HCP interactions.
    """

    db = SessionLocal()

    try:
        interactions = (
            db.query(Interaction)
            .filter(Interaction.sentiment.ilike("negative"))
            .all()
        )

        if not interactions:
            return "No negative interactions found."

        return [
            {
                "id": i.id,
                "hcp_name": i.hcp_name,
                "interaction_date": i.interaction_date,
                "sentiment": i.sentiment,
                "materials_shared": i.materials_shared,
                "notes": i.notes,
            }
            for i in interactions
        ]

    finally:
        db.close()

@tool
def search_notes(keyword: str):
    """
    Search interaction notes by keyword.
    """

    db = SessionLocal()

    try:
        interactions = (
            db.query(Interaction)
            .filter(
                Interaction.notes.ilike(f"%{keyword}%")
            )
            .all()
        )

        if not interactions:
            return f"No notes found containing '{keyword}'."

        return [
            {
                "id": i.id,
                "hcp_name": i.hcp_name,
                "interaction_date": i.interaction_date,
                "sentiment": i.sentiment,
                "notes": i.notes,
            }
            for i in interactions
        ]

    finally:
        db.close()


from datetime import date

@tool
def get_today_interactions():
    """
    Return today's interactions.
    """

    db = SessionLocal()

    try:
        today = str(date.today())

        interactions = (
            db.query(Interaction)
            .filter(
                Interaction.interaction_date == today
            )
            .all()
        )

        if not interactions:
            return "No interactions today."

        return [
            {
                "id": i.id,
                "hcp_name": i.hcp_name,
                "interaction_date": i.interaction_date,
                "sentiment": i.sentiment,
                "notes": i.notes,
            }
            for i in interactions
        ]

    finally:
        db.close()

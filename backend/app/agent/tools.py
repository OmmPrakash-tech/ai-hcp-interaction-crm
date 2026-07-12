from langchain_core.tools import tool

from datetime import date

from app.database.db import SessionLocal
from app.models.interaction import Interaction
from app.tools.interaction_query_tool import count_interactions, get_all_interactions, get_interaction_by_doctor, get_last_interaction, get_negative_interactions, get_positive_interactions, get_today_interactions, search_notes


@tool
def log_interaction(
    hcp_name: str,
    interaction_type: str,
    interaction_date: str,
    interaction_time: str,
    attendees: list[str],
    topics_discussed: list[str],
    sentiment: str,
    materials_shared: list[str],
    notes: str,
):
    """
    Save an interaction into PostgreSQL.
    """

    db = SessionLocal()

    try:
        interaction = Interaction(
            hcp_name=hcp_name,
            interaction_type=interaction_type,
            interaction_date=date.fromisoformat(interaction_date),
            interaction_time=interaction_time,
            attendees=attendees,
            topics_discussed=topics_discussed,
            sentiment=sentiment,
            materials_shared=materials_shared,
            notes=notes,
        )

        db.add(interaction)
        db.commit()
        db.refresh(interaction)

        return {
            "tool": "log_interaction",
            "message": "Interaction logged successfully.",
            "form_data": {
                "id": interaction.id,
                "hcp_name": interaction.hcp_name,
                "interaction_type": interaction.interaction_type,
                "interaction_date": str(interaction.interaction_date),
                "interaction_time": interaction.interaction_time,
                "attendees": interaction.attendees,
                "topics_discussed": interaction.topics_discussed,
                "sentiment": interaction.sentiment,
                "materials_shared": interaction.materials_shared,
                "notes": interaction.notes,
            },
        }

    finally:
        db.close()



@tool
def edit_interaction(
    field: str,
    value: str,
):
    """
    Update one interaction field.
    """

    return {
        "tool": "edit_interaction",
        "message": f"{field} updated successfully.",
        "updated_field": field,
        "updated_value": value,
    }

@tool
def summarize_interaction(notes: str):
    """
    Summarize interaction.
    """

    return {
        "tool": "summarize_interaction",
        "summary": notes,
    }



@tool
def validate_interaction(data: dict):
    """
    Validate interaction.
    """

    required = [
        "hcp_name",
        "interaction_date",
        "sentiment",
        "materials_shared",
        "notes",
    ]

    missing = [field for field in required if not data.get(field)]

    return {
        "tool": "validate_interaction",
        "valid": len(missing) == 0,
        "missing": missing,
    }

@tool
def clear_interaction():
    """
    Reset interaction.
    """

    return {
        "tool": "clear_interaction",
        "form_data": {
            "hcp_name": "",
            "interaction_date": "",
            "sentiment": "",
            "materials_shared": False,
            "notes": "",
        },
    }

tools = [
    log_interaction,
    edit_interaction,
    validate_interaction,
    summarize_interaction,
    clear_interaction,
    get_all_interactions,
    get_last_interaction,
    get_interaction_by_doctor,
    count_interactions,
    get_positive_interactions,
    get_negative_interactions,
    search_notes,
    get_today_interactions,
]
from langchain_core.tools import tool



@tool
def log_interaction(
    hcp_name: str,
    interaction_date: str,
    sentiment: str,
    materials_shared: bool,
    notes: str,
):
    """
    Store a new HCP interaction.
    """

    return {
        "tool": "log_interaction",
        "message": "Interaction logged successfully.",
        "form_data": {
            "hcp_name": hcp_name,
            "interaction_date": interaction_date,
            "sentiment": sentiment,
            "materials_shared": materials_shared,
            "notes": notes,
        },
    }

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
]
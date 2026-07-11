from pydantic import BaseModel, Field
from typing import List
from datetime import date


class InteractionBase(BaseModel):
    hcp_name: str = Field(..., min_length=2)
    interaction_type: str
    interaction_date: date
    interaction_time: str
    attendees: List[str]
    topics_discussed: List[str]
    sentiment: str
    materials_shared: List[str]
    notes: str


class InteractionCreate(InteractionBase):
    pass


class InteractionUpdate(BaseModel):
    hcp_name: str | None = None
    interaction_type: str | None = None
    interaction_date: date | None = None
    interaction_time: str | None = None
    attendees: List[str] | None = None
    topics_discussed: List[str] | None = None
    sentiment: str | None = None
    materials_shared: List[str] | None = None
    notes: str | None = None


class InteractionResponse(InteractionBase):
    id: int

    model_config = {
        "from_attributes": True
    }
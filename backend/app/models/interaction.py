from datetime import date

from sqlalchemy import Boolean, Date, Integer, String, Text
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column

from app.database.db import Base


class Interaction(Base):
    __tablename__ = "interactions"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    hcp_name: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    interaction_type: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    interaction_date: Mapped[date] = mapped_column(
        Date,
        nullable=False,
    )

    interaction_time: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
    )

    attendees: Mapped[list] = mapped_column(
        JSONB,
        nullable=False,
    )

    topics_discussed: Mapped[list] = mapped_column(
        JSONB,
        nullable=False,
    )

    sentiment: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
    )

    materials_shared: Mapped[list] = mapped_column(
        JSONB,
        nullable=False,
    )

    notes: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )
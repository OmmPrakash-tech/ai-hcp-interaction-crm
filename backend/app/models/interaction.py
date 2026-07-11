from sqlalchemy import Boolean, Date, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.database.db import Base


class Interaction(Base):
    __tablename__ = "interactions"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    hcp_name: Mapped[str] = mapped_column(String(255))

    interaction_date: Mapped[str] = mapped_column(String(50))

    sentiment: Mapped[str] = mapped_column(String(50))

    materials_shared: Mapped[bool] = mapped_column(Boolean, default=False)

    notes: Mapped[str] = mapped_column(Text)
from sqlalchemy.orm import Session

from app.models.interaction import Interaction
from app.schemas.interaction_schema import (
    InteractionCreate,
    InteractionUpdate,
)


class InteractionService:

    @staticmethod
    def create(
        db: Session,
        interaction: InteractionCreate,
    ) -> Interaction:

        db_interaction = Interaction(
            hcp_name=interaction.hcp_name,
            interaction_type=interaction.interaction_type,
            interaction_date=interaction.interaction_date,
            interaction_time=interaction.interaction_time,
            attendees=interaction.attendees,
            topics_discussed=interaction.topics_discussed,
            sentiment=interaction.sentiment,
            materials_shared=interaction.materials_shared,
            notes=interaction.notes,
        )

        db.add(db_interaction)
        db.commit()
        db.refresh(db_interaction)

        return db_interaction

    @staticmethod
    def get_all(db: Session):

        return (
            db.query(Interaction)
            .order_by(Interaction.id.desc())
            .all()
        )

    @staticmethod
    def get_by_id(
        db: Session,
        interaction_id: int,
    ):

        return (
            db.query(Interaction)
            .filter(
                Interaction.id == interaction_id
            )
            .first()
        )

    @staticmethod
    def update(
        db: Session,
        interaction_id: int,
        interaction: InteractionUpdate,
    ):

        db_interaction = (
            db.query(Interaction)
            .filter(
                Interaction.id == interaction_id
            )
            .first()
        )

        if not db_interaction:
            return None

        update_data = interaction.model_dump(
            exclude_unset=True
        )

        for key, value in update_data.items():
            setattr(
                db_interaction,
                key,
                value,
            )

        db.commit()
        db.refresh(db_interaction)

        return db_interaction

    @staticmethod
    def delete(
        db: Session,
        interaction_id: int,
    ):

        db_interaction = (
            db.query(Interaction)
            .filter(
                Interaction.id == interaction_id
            )
            .first()
        )

        if not db_interaction:
            return False

        db.delete(db_interaction)
        db.commit()

        return True
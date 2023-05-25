from typing import Optional
from sqlmodel import SQLModel, Field
from app.model.mixins import TimeMixin


class UserRole(SQLModel, TimeMixin, table=True):
    __tablename__ = "user_role"

    # Определение полей таблицы с указанием типа данных и атрибутов
    user_id: Optional[str] = Field(default=None, foreign_key="user.id", primary_key=True)
    role_id: Optional[str] = Field(default=None, foreign_key="role.id", primary_key=True)


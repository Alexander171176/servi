from sqlalchemy.future import select
from app.model import User, UserRole, Role, Profile
from app.core.config import db


class AdminService:

    @staticmethod
    async def get_admin(email: str):
        profile_query = select(
            User.id,
            User.nick_name,
            User.email,
            Profile.user_name,
            Profile.phone_number
        ).join_from(User, Profile).where(User.email == email)

        role_query = select(
            Role.id,
            Role.role_name
        ).select_from(
            User
        ).join(
            UserRole, User.id == UserRole.user_id
        ).join(
            Role, UserRole.role_id == Role.id
        ).where(
            User.email == email
        )

        profile = (await db.execute(profile_query)).mappings().one()
        role = (await db.execute(role_query)).mappings().one()

        result = {**profile, "id_role": role["id"], "role_name": role["role_name"]}

        return result

    @staticmethod
    async def get_role(token: dict):
        email = token["email"]

        role_query = select(
            Role.id,
            Role.role_name
        ).select_from(
            User
        ).join(
            UserRole, User.id == UserRole.user_id
        ).join(
            Role, UserRole.role_id == Role.id
        ).where(
            User.email == email
        )

        role = (await db.execute(role_query)).mappings().one()

        return role['role_name']


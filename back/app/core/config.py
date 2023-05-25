import os
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlmodel import SQLModel
from dotenv import load_dotenv

from pathlib import Path  # библиотека формирования пути к файлам

env_path = Path('.') / '.env'  # находим путь к подключаемому файлу
load_dotenv(dotenv_path=env_path)  # загружаем настройки подключения к БД

# Получение значений переменных окружения для подключения к базе данных
DB_USER = os.environ.get("DB_USER")
DB_PASS = os.environ.get("DB_PASS")
DB_NAME = os.environ.get("DB_NAME")
DB_HOST = os.environ.get("DB_HOST")
DB_PORT = os.environ.get("DB_PORT")

SECRET_KEY = os.environ["SECRET_KEY"]
ALGORITHM = os.environ["ALGORITHM"]
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.environ["ACCESS_TOKEN_EXPIRE_MINUTES"])

# Создание строки подключения к базе данных
db_url = f"postgresql+asyncpg://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}"


# Класс сессии базы данных
class AsyncDatabaseSession:

    def __init__(self) -> None:
        self.session = None
        self.engine = None

    def __getattr__(self, name):
        return getattr(self.session, name)

    def init(self):
        # Создание асинхронного движка SQLAlchemy
        self.engine = create_async_engine(db_url, future=True, echo=True)
        # Создание сессии базы данных SQLAlchemy
        self.session = sessionmaker(self.engine, expire_on_commit=False, class_=AsyncSession)()

    # Создание таблиц базы данных
    async def create_all(self):
        async with self.engine.begin() as conn:
            await conn.run_sync(SQLModel.metadata.create_all)


# Инициализация сессии базы данных
db = AsyncDatabaseSession()


# Определение функции коммита и отката транзакции
async def commit_rollback():
    try:
        await db.commit()
    except Exception:
        await db.rollback()
        raise

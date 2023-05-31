from fastapi import APIRouter, Depends, HTTPException, Security

from app.schema.response_schema import ResponseSchema
from app.service.admin.admin_service import AdminService

from app.repository.auth_repository import JWTBearer, JWTRepo
from fastapi.security import HTTPAuthorizationCredentials

admin_router = APIRouter(
    tags=['Администратор'],
    dependencies=[Depends(JWTBearer())]
)


@admin_router.get("/admin/", response_model=ResponseSchema, response_model_exclude_none=True)
async def get_admin(credentials: HTTPAuthorizationCredentials = Security(JWTBearer())):
    token = JWTRepo.extract_token(credentials)
    result = await AdminService.get_admin(token['email'])
    role = await AdminService.get_role(token)
    if role != "admin":
        raise HTTPException(status_code=403, detail="Недостаточно прав для доступа к маршруту")
    return ResponseSchema(detail="Успешное получение данных!", result=result)

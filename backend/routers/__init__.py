from fastapi import APIRouter

router = APIRouter(prefix="/api", tags=["api"])

@router.get("/health")
def api_health():
    return {"status": "ok", "module": "api"}

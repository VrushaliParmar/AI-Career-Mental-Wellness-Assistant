from fastapi import APIRouter

router = APIRouter(prefix="/resume", tags=["resume"])

@router.post("/analyze")
def analyze_resume():
    return {"message": "Resume analysis endpoint ready"}

@router.get("/history")
def resume_history():
    return {"message": "Resume history endpoint ready"}

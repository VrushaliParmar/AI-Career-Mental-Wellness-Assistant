from typing import Optional

from fastapi import APIRouter, File, Form, HTTPException, UploadFile

from backend.services.resume_parser import extract_resume_data

router = APIRouter(prefix="/resume", tags=["resume"])


@router.post("/analyze")
async def analyze_resume(
    file: UploadFile = File(...),
    target_role: Optional[str] = Form(default=None),
):
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file uploaded.")

    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")

    try:
        temp_path = f"/tmp/{file.filename}"
        with open(temp_path, "wb") as f:
            content = await file.read()
            f.write(content)

        resume_data = extract_resume_data(temp_path)

        return {
            "success": True,
            "message": "Resume analyzed successfully.",
            "target_role": target_role or "software engineer",
            "resume": resume_data,
        }
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Failed to analyze resume: {str(exc)}")


@router.get("/history")
def resume_history():
    return {
        "message": "Resume history endpoint ready",
        "history": [],
    }

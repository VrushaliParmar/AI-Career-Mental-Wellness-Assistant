from typing import List, Optional

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from services.skill_gap import ROLE_SKILL_MAP, analyze_skill_gap

router = APIRouter(prefix="/skills", tags=["skills"])


class SkillGapRequest(BaseModel):
    skills: List[str]
    target_role: Optional[str] = None


@router.post("/analyze")
def analyze_skills(request: SkillGapRequest):
    target_role = (request.target_role or "Software Engineer").strip() or "Software Engineer"
    try:
        return analyze_skill_gap(request.skills, target_role)
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc

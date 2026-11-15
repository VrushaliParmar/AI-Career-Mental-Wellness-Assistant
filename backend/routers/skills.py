from typing import List, Optional

from fastapi import APIRouter
from pydantic import BaseModel

from services.skill_gap import analyze_skill_gap

router = APIRouter(prefix="/skills", tags=["skills"])


class SkillGapRequest(BaseModel):
    skills: List[str]
    target_role: Optional[str] = None


@router.post("/analyze")
def analyze_skills(request: SkillGapRequest):
    target_role = (request.target_role or "Software Engineer").strip() or "Software Engineer"
    return analyze_skill_gap(request.skills, target_role)

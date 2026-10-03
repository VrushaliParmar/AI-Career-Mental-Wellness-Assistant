from pydantic import BaseModel, Field
from typing import List, Optional


class ResumeUploadRequest(BaseModel):
    user_id: str = Field(..., description="Authenticated user id")
    target_role: Optional[str] = Field(default=None, description="Desired role")


class ChatMessageRequest(BaseModel):
    user_id: str
    message: str
    context: Optional[str] = None


class SkillGapResult(BaseModel):
    user_id: str
    target_role: str
    current_skills: List[str]
    missing_skills: List[str]
    confidence_score: float

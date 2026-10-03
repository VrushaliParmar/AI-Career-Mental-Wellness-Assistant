from typing import Optional

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from backend.config import OPENAI_API_KEY

router = APIRouter(prefix="/chat", tags=["chat"])


class ChatRequest(BaseModel):
    user_id: str
    message: str
    target_role: Optional[str] = None
    resume_context: Optional[str] = None


@router.post("/message")
async def chat_message(request: ChatRequest):
    if not request.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty.")

    if not OPENAI_API_KEY:
        return {
            "success": True,
            "message": "OpenAI API key is not configured. This is a placeholder response for local setup.",
            "reply": (
                f"You asked: '{request.message}'. "
                "The RAG assistant is ready to be connected to OpenAI and vector search once the API keys are configured."
            ),
            "target_role": request.target_role,
        }

    # Placeholder response to keep the flow working before live LLM/RAG integration
    reply = (
        f"Based on your profile and goal '{request.target_role or 'career growth'}', "
        f"here is the recommended direction: focus on the most relevant skills for your target role, "
        f"strengthen your project portfolio, and practice structured interview storytelling. "
        f"Your question was: '{request.message}'"
    )

    return {
        "success": True,
        "message": "Career assistant replied successfully.",
        "reply": reply,
        "target_role": request.target_role,
    }


@router.get("/history")
def chat_history():
    return {
        "message": "Chat history endpoint ready",
        "history": [],
    }

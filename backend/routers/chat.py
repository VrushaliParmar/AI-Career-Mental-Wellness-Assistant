from fastapi import APIRouter

router = APIRouter(prefix="/chat", tags=["chat"])

@router.post("/message")
def chat_message():
    return {"message": "RAG chat endpoint ready"}

@router.get("/history")
def chat_history():
    return {"message": "Chat history endpoint ready"}

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.resume import router as resume_router
from routers.chat import router as chat_router

app = FastAPI(
    title="CareerPath Pro API",
    description="AI-powered career guidance and skill analysis platform",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(resume_router)
app.include_router(chat_router)

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "CareerPath Pro API"}

@app.get("/")
def root():
    return {"message": "Welcome to CareerPath Pro"}

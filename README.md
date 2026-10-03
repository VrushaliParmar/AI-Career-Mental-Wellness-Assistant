# CareerPath Pro

AI-powered career guidance platform built around a modern RAG pipeline, real-time job market data, and personalized learning recommendations.

## What this project does

CareerPath Pro helps students and early-career professionals:
- analyze their resume and identify skill gaps
- compare their profile with target job roles
- ask career questions through an AI assistant
- get personalized learning roadmaps
- understand job trends and industry demand

## Tech stack

- Frontend: React + Vite
- Backend: FastAPI
- AI: LangChain + OpenAI GPT
- Vector search: Pinecone
- Database: Supabase / PostgreSQL
- Resume parsing: pypdf / pdfplumber
- Styling: TailwindCSS

## Architecture

```text
frontend/   React app
backend/    FastAPI APIs + AI service layer
scripts/    data and vector seeding utilities
data/       job and skill datasets
docs/       process notes and architecture details
```

## Phase 1 status

Backend and frontend scaffolding are now in place.

Next, we will implement:
1. resume upload and parsing
2. vector knowledge-base setup
3. RAG-based career chat
4. skill-gap analysis dashboard
5. deployment-ready polish

## Run locally

Backend:
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Frontend:
```bash
cd frontend
npm install
npm run dev
```

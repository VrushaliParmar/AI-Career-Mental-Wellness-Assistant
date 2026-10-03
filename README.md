# CareerPath Pro

> AI-powered career intelligence platform that helps students and early-career professionals analyze resumes, detect skill gaps, and get personalized career guidance through a modern retrieval-augmented generation (RAG) workflow.

![Python](https://img.shields.io/badge/Python-3.10+-blue?style=flat-square&logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-0.110+-teal?style=flat-square&logo=fastapi)
![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat-square&logo=typescript)
![LangChain](https://img.shields.io/badge/LangChain-RAG-orange?style=flat-square)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-black?style=flat-square&logo=openai)
![Pinecone](https://img.shields.io/badge/Pinecone-VectorDB-lightblue?style=flat-square)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=flat-square&logo=supabase)
![Status](https://img.shields.io/badge/Status-Prototyping-orange?style=flat-square)

---

## Problem Statement

Students and early-career professionals often struggle with three major challenges:

1. Not knowing which roles match their current skills.
2. Not understanding which skills they are missing for a target job.
3. Lacking an intelligent assistant that provides personalized, role-aware guidance.

Most platforms provide generic advice, but very few combine resume intelligence, role matching, and AI guidance in one application.

---

## Solution

CareerPath Pro is a full-stack AI app that helps users:

- upload and analyze their resume
- extract skills, education, and contact information
- compare resume skills with target roles
- calculate a role match score
- identify missing skills and recommended improvements
- ask a career-related question to an AI assistant
- receive actionable career guidance through a modern AI workflow

---

## Architecture

```text
Frontend (React + Vite)
       |
       v
FastAPI Backend
       |
       +--> Resume parser module
       +--> Skill gap analyzer
       +--> RAG-style career assistant
       +--> Job and role matching logic
       |
       v
External services / future integrations
- OpenAI GPT / LLM APIs
- Pinecone / vector database
- Supabase / PostgreSQL
- Job market datasets
```

---

## Core Features

- Resume upload and PDF parsing
- Skill extraction from resume content
- Target role analysis
- Match score generation
- Missing-skill recommendations
- AI-powered career guidance responses
- Modern dashboard user experience

---

## Tech Stack

- Frontend: React.js, Vite
- Backend: FastAPI, Python
- AI: LangChain, OpenAI API
- Data: PDF parsing, text extraction, skill analysis
- Database: PostgreSQL / Supabase (planned)
- Vector search: Pinecone (planned)
- Styling: Custom modern dashboard UI

---

## Project Structure

```text
CareerPath-Pro/
├── backend/
│   ├── main.py
│   ├── config.py
│   ├── requirements.txt
│   ├── routers/
│   │   ├── resume.py
│   │   ├── chat.py
│   │   └── skills.py
│   └── services/
│       ├── resume_parser.py
│       ├── skill_gap.py
│       └── rag_pipeline.py
├── frontend/
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── docs/
│   └── README.md
├── .gitignore
├── README.md
└── LICENSE
```

---

## Local Setup

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## API Endpoints

### Resume endpoints

- `POST /resume/analyze` — Upload a PDF resume and parse its details.
- `GET /resume/history` — Resume history placeholder endpoint.

### Chat endpoints

- `POST /chat/message` — Ask a career question to the AI assistant.
- `GET /chat/history` — Chat history placeholder endpoint.

### Skill gap endpoints

- `POST /skills/analyze` — Compare resume skills with a target role.

---

## Example Use Cases

- Upload a resume and check how well it matches a Software Engineer role.
- Ask: “What skills should I strengthen to transition to Data Science?”
- Get a match score and missing skill recommendations.
- Receive badge-like role-fit insights for an interview or portfolio presentation.

---

## Future Roadmap

- Add Pinecone vector database integration for RAG retrieval
- Add real job-description dataset support
- Add Supabase auth and user profiles
- Add job trend and salary analysis
- Add a learning roadmap generator
- Add deployment configuration for Vercel / Render

---

## Why This Project Is Valuable

This project demonstrates several skills that are attractive to employers:

- AI and LLM integration concepts
- Full-stack development
- Resume intelligence and NLP
- Role-based skill analysis
- Modern product design mindset
- SaaS-style problem solving

---

## Author

Vrushali Parmar

GitHub: https://github.com/VrushaliParmar

---

> CareerPath Pro is designed as a powerful AI career platform prototype that blends resume analysis, job-fit scoring, and intelligent guidance into a single, modern experience.

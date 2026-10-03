# 🎯 CareerPath Pro

> AI-powered career intelligence platform using RAG, LLMs, and job-market insights to help students and early-career professionals find the right career path, detect skill gaps, and get personalized guidance.

## Overview

CareerPath Pro combines:
- Resume analysis and skill extraction
- Retrieval-Augmented Generation (RAG) for personalized career advice
- Real-time job market insights and role matching
- Personalized learning roadmaps
- Wellness support for career-related stress

## Architecture

- Frontend: React + TypeScript + TailwindCSS
- Backend: FastAPI + Python
- AI Layer: LangChain + OpenAI GPT models + vector search
- Data Layer: PostgreSQL + Supabase + Pinecone

## Project structure

```text
backend/         FastAPI app and AI services
frontend/        React app for user dashboard and chat
apps/            optional future features or microservices
scripts/         job scraping and vector DB seeding
data/            sample datasets and job descriptions
docs/            design and setup notes
```

## Current milestone

This repository has been restructured to reflect the new direction:
- a modern AI career assistant
- production-style architecture
- a RAG-powered experience
- clean frontend + backend split

## Next steps

1. Set up backend environment and API skeleton
2. Create resume parsing endpoints
3. Build RAG-based career chat
4. Add skill gap and job analysis features
5. Build frontend pages and dashboard UI
6. Add deployment support and docs

## Suggested stack

- Python 3.10+
- FastAPI
- LangChain
- Pinecone
- OpenAI API
- React 18
- TailwindCSS
- Supabase

## Future goal

To build a portfolio-ready AI product that looks professional, is deployable, and demonstrates strong modern AI engineering concepts.

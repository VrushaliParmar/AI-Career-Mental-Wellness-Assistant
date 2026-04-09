# Phase 1 — Project Setup & Repository Structure

**Status:** ✅ Complete  
**Date:** April 2026  
**Branch:** `main`

---

## What Was Done in This Phase

- Created GitHub repository: `AI-Career-Mental-Wellness-Assistant`
- Set up monorepo folder structure covering frontend, backend, ML models, data, and docs
- Wrote professional README with architecture overview, tech stack, API endpoints, and roadmap
- Defined the two core modules: Resume Analysis and Mental Wellness

---

## Folder Structure Decisions & Why

```
AI-Career-Mental-Wellness-Assistant/
├── frontend/       → React app (UI layer)
├── backend/        → FastAPI app (API + ML serving layer)
├── model/          → Training notebooks + saved model weights
├── data/           → Datasets, skill DB, job descriptions
├── docs/           → Phase-by-phase documentation (this folder)
├── roadmap/        → High-level planning documents
└── README.md       → Public-facing project overview
```

**Why a monorepo?**  
A monorepo keeps frontend, backend, and ML code in one repository. For a project of this scale (one developer, tightly coupled components), it reduces overhead — no need to manage multiple repos, clone multiple things, or deal with cross-repo versioning. Companies like Google and Meta use monorepos at scale for similar reasons.

**Why separate `model/` from `backend/`?**  
Training code (Colab notebooks, dataset scripts) is very different from inference code (loading a saved model and running predictions via API). Keeping them separate makes it clear what runs in training vs production, and avoids bloating the backend with training dependencies like datasets, transformers trainers, etc.

---

## Tech Stack Chosen & Reasoning

| Technology | Chosen | Why Not Alternative |
|---|---|---|
| FastAPI | ✅ | Faster than Flask, auto-generates API docs (Swagger), async support, Python-native |
| React + Vite | ✅ | Vite is faster than CRA, industry-standard frontend framework |
| BERT (HuggingFace) | ✅ | Pre-trained on massive text corpus, fine-tunable for NER with minimal data |
| DistilBERT | ✅ | 40% smaller than BERT, 60% faster, retains 97% accuracy — ideal for classification |
| Supabase | ✅ | Open-source Firebase alternative, built on PostgreSQL, free tier, real-time support |
| Vercel + Render | ✅ | Both have free tiers, easy GitHub integration, industry-used for portfolio projects |

---

## Key Concepts Learned in This Phase

### What is a REST API?

A REST (Representational State Transfer) API is a communication contract between frontend and backend. It uses HTTP methods:

- `POST /analyze-resume` → Send data (resume file) → receive response (ATS score)
- `GET /user-history/1` → Retrieve data → receive response (past results)

FastAPI makes building REST APIs in Python very clean — you define a Python function, add a decorator like `@app.post("/analyze-resume")`, and FastAPI handles routing, validation, and documentation automatically.

### What is a Monorepo?

A monorepo (mono repository) is a single Git repository that contains multiple related projects. In our case: frontend code + backend code + ML code all live in one place. The alternative is a polyrepo (separate repos for each). For a solo developer project, monorepo reduces friction significantly.

### Why FastAPI over Flask?

Flask is older and simpler but lacks built-in async support and data validation. FastAPI uses Python type hints and Pydantic models to validate incoming request data automatically. It also auto-generates interactive API documentation at `/docs` (Swagger UI) — extremely useful for testing endpoints during development.

---

## Challenges Faced

None significant in this phase. The main decision was folder structure — considered putting `model/` inside `backend/` but decided against it to keep training and inference concerns separate.

---

## Interview Q&A — Phase 1

**Q: Why did you choose FastAPI over Django or Flask for your backend?**

> FastAPI is purpose-built for building APIs — it's asynchronous by default, has automatic request validation using Python type hints, and generates interactive Swagger documentation out of the box. Django is more suited for full web applications with templating. Flask is simpler but requires extra libraries for validation and documentation. For an ML-serving API like ours, FastAPI was the cleanest choice.

**Q: Why did you use a monorepo structure?**

> Since this is a tightly coupled full-stack project — the frontend directly calls the backend, and the backend directly loads ML models — it made sense to keep everything in one repository. It simplifies setup for anyone cloning the project (one `git clone`, one codebase to navigate), and makes it easier to track which frontend changes relate to which backend or model changes in the same commit history.

**Q: Why Supabase instead of a traditional MySQL/MongoDB database?**

> Supabase is built on PostgreSQL, which gives us relational database capabilities — important for structured data like user records and resume scores. But it also offers a real-time subscription API, built-in authentication, and a clean Python client. It has a generous free tier which is ideal for a portfolio project that needs to be deployed live. The developer experience is also much faster than setting up and hosting a raw PostgreSQL or MongoDB instance.

**Q: What is the difference between BERT and DistilBERT? Why did you use both?**

> BERT (Bidirectional Encoder Representations from Transformers) is the full model pre-trained by Google on large text corpora. It's highly accurate but computationally heavy. DistilBERT is a distilled (compressed) version — 40% smaller and 60% faster, retaining around 97% of BERT's accuracy. We use full BERT for the resume NER task because skill extraction requires high precision (missing a skill is costly). We use DistilBERT for the wellness classifier because it's a simpler 3-class classification task and speed matters more there for a good user experience.

---

## Next Phase

→ [Phase 2 — PDF Parsing & Text Preprocessing](./Phase-2-ResumeParsing.md)

In Phase 2 we will:
- Install and use `pdfplumber` to extract text from uploaded PDF resumes
- Clean and preprocess the raw extracted text
- Handle edge cases (scanned PDFs, multi-column layouts, special characters)
- Write the FastAPI endpoint that accepts a PDF upload

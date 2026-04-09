# 🧠 AI Career & Mental Wellness Assistant

> An AI-powered web platform that helps students analyze their resumes, identify skill gaps, and assess their mental well-being — combining NLP, Deep Learning, and Full-Stack Development.

![Python](https://img.shields.io/badge/Python-3.10+-blue?style=flat-square&logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-0.110+-teal?style=flat-square&logo=fastapi)
![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react)
![PyTorch](https://img.shields.io/badge/PyTorch-2.0+-EE4C2C?style=flat-square&logo=pytorch)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=flat-square&logo=supabase)
![Status](https://img.shields.io/badge/Status-In%20Development-orange?style=flat-square)

---

## 📌 Table of Contents

- [Problem Statement](#-problem-statement)
- [Solution](#-solution)
- [System Architecture](#-system-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Modules](#-modules)
- [Setup & Installation](#-setup--installation)
- [API Endpoints](#-api-endpoints)
- [Roadmap](#-roadmap)
- [Documentation](#-documentation)
- [Author](#-author)

---

## 🎯 Problem Statement

Students in competitive environments face two parallel challenges that are rarely addressed together:

1. **Career uncertainty** — unclear whether their resume matches industry expectations, which skills are missing, and how to improve strategically.
2. **Mental health neglect** — intense focus on placements leads to stress, burnout, and reduced productivity with no structured support.

No single platform currently integrates career guidance with mental wellness support in a meaningful, AI-driven way.

---

## 💡 Solution

The **AI Career & Mental Wellness Assistant** is a full-stack web application that:

- Analyzes uploaded resumes using fine-tuned BERT for Named Entity Recognition (skill extraction)
- Compares extracted skills against target job descriptions to generate an ATS-like match score
- Identifies skill gaps and provides personalized improvement suggestions
- Accepts free-text emotional input and classifies it into stress / anxiety / neutral states using a fine-tuned DistilBERT model
- Returns coping strategies and mental wellness guidance based on detected emotional state

---

## 🏗 System Architecture

```
┌─────────────────────────────────────────┐
│            Frontend (React)             │
│   Resume Upload · Results Dashboard    │
│   Wellness Input · Emotion Insights    │
│         Deployed on Vercel             │
└──────────────────┬──────────────────────┘
                   │ REST API
┌──────────────────▼──────────────────────┐
│           Backend (FastAPI)             │
│  /analyze-resume  /detect-emotion      │
│  /job-match       /user-history        │
│         Deployed on Render             │
└──────┬───────────────────────┬──────────┘
       │                       │
┌──────▼──────┐         ┌──────▼──────┐
│   Resume    │         │  Wellness   │
│  Analysis   │         │  Module     │
│   Module    │         │             │
│             │         │ DistilBERT  │
│ BERT (NER)  │         │ Classifier  │
│ ATS Scoring │         │ 3 classes   │
│ Skill Gap   │         │ Suggestions │
└──────┬──────┘         └──────┬──────┘
       └───────────┬───────────┘
            ┌──────▼──────┐
            │  Supabase   │
            │  Database   │
            │ Users·Scores│
            │ Skill DB    │
            └─────────────┘
```

---

## ⚙️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React 18 + Vite | UI — resume upload, results, wellness input |
| Backend | FastAPI | REST API, ML model serving |
| ML — Resume | BERT (fine-tuned) | Skill extraction via NER |
| ML — Wellness | DistilBERT (fine-tuned) | Emotion classification |
| PDF Parsing | pdfplumber / PyMuPDF | Extract text from uploaded resumes |
| Training | PyTorch + HuggingFace Transformers | Model fine-tuning on Google Colab |
| Database | Supabase (PostgreSQL) | User data, resume scores, skill DB |
| Deployment | Vercel + Render | Frontend and backend hosting |

---

## 📁 Project Structure

```
AI-Career-Mental-Wellness-Assistant/
│
├── frontend/                   # React application
│   ├── src/
│   │   ├── components/         # UI components
│   │   ├── pages/              # Resume, Wellness, Dashboard pages
│   │   └── api/                # Axios API calls
│   └── package.json
│
├── backend/                    # FastAPI application
│   ├── main.py                 # App entry point
│   ├── routers/                # API route handlers
│   ├── models/                 # ML model loading + inference
│   ├── utils/                  # PDF parser, skill matcher
│   └── requirements.txt
│
├── model/                      # ML training notebooks & saved models
│   ├── resume_ner/             # BERT fine-tuning for skill extraction
│   │   ├── train.ipynb         # Google Colab training notebook
│   │   └── model_weights/      # Saved model (post-training)
│   └── wellness_classifier/    # DistilBERT emotion classifier
│       ├── train.ipynb
│       ├── generate_dataset.py # Synthetic data generation script
│       └── model_weights/
│
├── data/                       # Datasets and skill database
│   ├── skill_db.json           # 200+ tech/non-tech skills
│   ├── job_descriptions/       # Sample JDs for testing
│   └── wellness_dataset.csv    # Synthetic emotion dataset
│
├── roadmap/                    # Project planning docs
│
├── docs/                       # 📚 Phase-by-phase documentation
│   ├── Phase-1-Setup.md
│   ├── Phase-2-ResumeParsing.md
│   ├── Phase-3-SkillExtraction.md
│   ├── Phase-4-ATSScoring.md
│   ├── Phase-5-WellnessModule.md
│   ├── Phase-6-Frontend.md
│   └── Phase-7-Deployment.md
│
└── README.md
```

---

## 🧩 Modules

### 1. Resume Analysis Module

- Accepts PDF resume upload
- Extracts raw text using `pdfplumber`
- Identifies technical and soft skills using a **BERT model fine-tuned for Named Entity Recognition**
- Compares extracted skills with a target job description
- Generates:
  - **ATS Match Score** (0–100)
  - **Missing Skills** list
  - **Improvement Suggestions** (personalized)

### 2. Mental Wellness Module

- Accepts free-text input describing the user's current emotional state
- Tokenizes and passes input through a **DistilBERT classifier** trained on a synthetic labeled dataset
- Classifies into: `stress` / `anxiety` / `neutral`
- Returns:
  - Detected emotional state
  - Positive affirmations
  - Basic coping strategies

---

## 🚀 Setup & Installation

### Prerequisites

- Python 3.10+
- Node.js 18+
- Supabase account
- Google Colab (for training)

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Environment Variables

Create a `.env` file in `/backend`:

```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/analyze-resume` | Upload PDF, returns ATS score + skill gap |
| `POST` | `/detect-emotion` | Submit text, returns emotion + suggestions |
| `GET` | `/job-match/{role}` | Get required skills for a target role |
| `GET` | `/user-history/{id}` | Fetch past analysis results for a user |

---

## 🗺 Roadmap

- [x] Phase 1 — Project setup, folder structure, GitHub repo
- [ ] Phase 2 — PDF parsing & text preprocessing
- [ ] Phase 3 — BERT fine-tuning for skill extraction (NER)
- [ ] Phase 4 — ATS scoring & job matching logic
- [ ] Phase 5 — Synthetic dataset generation & DistilBERT training
- [ ] Phase 6 — FastAPI backend + Supabase integration
- [ ] Phase 7 — React frontend development
- [ ] Phase 8 — Deployment (Vercel + Render)

---

## 📚 Documentation

Detailed phase-by-phase documentation is maintained in the [`/docs`](./docs/) folder. Each doc covers:

- What was built in that phase
- Key concepts learned (theory + implementation)
- Decisions made and why
- Challenges faced & solutions
- Interview Q&A for that phase

This documentation is written to support technical interview preparation.

---

## 🌟 Future Enhancements

- Voice-based mental health detection
- Real-time job recommendations via job portal APIs
- Personalized learning roadmap generator
- LinkedIn profile integration

---

## 👩‍💻 Author

**Vrushali Parmar**

[![GitHub](https://img.shields.io/badge/GitHub-VrushaliParmar-181717?style=flat-square&logo=github)](https://github.com/VrushaliParmar)

---

> This project is built as a placement-level portfolio project demonstrating Deep Learning, NLP, Full-Stack Development, and real-world AI system design.

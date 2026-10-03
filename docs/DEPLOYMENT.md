# Deployment Guide for CareerPath Pro

This guide covers how to deploy CareerPath Pro to production platforms.

## Option 1: Vercel (Frontend) + Railway (Backend) — Recommended

This is the easiest and most cost-effective setup for full deployment.

### Step 1: Deploy Backend on Railway

1. Go to [railway.app](https://railway.app) and sign up.
2. Create a new project.
3. Click "Deploy from GitHub" and select your repository.
4. Railway will automatically detect the Dockerfile in the `backend/` directory.
5. Add environment variables in Railway:
   - `OPENAI_API_KEY` → Your OpenAI API key
   - `PINECONE_API_KEY` → Your Pinecone API key
   - `PINECONE_ENVIRONMENT` → e.g., `us-east-1`
   - `PINECONE_INDEX` → e.g., `careerpath-pro`
6. Railway will generate a public URL like `https://careerpath-pro-production.up.railway.app`.
7. Copy this URL for use in the frontend.

### Step 2: Deploy Frontend on Vercel

1. Go to [vercel.com](https://vercel.com) and sign up.
2. Create a new project and import your GitHub repository.
3. Vercel will automatically detect the React app in the `frontend/` directory.
4. In the build settings:
   - **Framework:** Next.js is auto-detected, but since we're using Vite, change to "Other"
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Add an environment variable:
   - `VITE_API_BASE` → Paste the Railway backend URL from Step 1
6. Deploy!

### Step 3: Update Frontend Code

Update the API base URL in `frontend/src/App.jsx`:

```javascript
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'
```

## Option 2: Docker Compose (Local + Development)

For local development with both services containerized:

```bash
docker-compose up --build
```

This starts:
- Backend: http://localhost:8000
- Frontend: http://localhost:5173

## Option 3: Render (Alternative to Railway)

1. Go to [render.com](https://render.com).
2. Create a new "Web Service" from your GitHub repository.
3. Set the start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Add environment variables (same as Railway).
5. Deploy and get your public URL.

## Environment Variables Checklist

### Backend (.env or platform variables)

```
OPENAI_API_KEY=sk-...
PINECONE_API_KEY=...
PINECONE_ENVIRONMENT=us-east-1
PINECONE_INDEX=careerpath-pro
SUPABASE_URL=https://xxx.supabase.co (optional, for future)
SUPABASE_KEY=... (optional, for future)
DATABASE_URL=... (optional, for future)
```

### Frontend (.env or platform variables)

```
VITE_API_BASE=https://your-backend-url.railway.app
```

## Costs

- **Vercel:** Free tier includes generous hosting for frontend
- **Railway:** $5/month free credit (usually covers basic usage)
- **Render:** Free tier with limited resources
- **OpenAI API:** Pay-as-you-go ($0.03-0.15 per 1K tokens depending on model)
- **Pinecone:** Free tier with up to 100k vectors

## Troubleshooting

### CORS errors when calling API from frontend

Make sure the backend has CORS enabled for your Vercel domain:

In `backend/main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-vercel-app.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### API calls return 404

Make sure the `VITE_API_BASE` environment variable in Vercel matches your Railway backend URL exactly.

### Railway build fails

Make sure:
1. `backend/requirements.txt` has all dependencies
2. `backend/Dockerfile` exists
3. `backend/main.py` is the entry point

---

## Next Steps

Once deployed:
1. Test the resume upload on your live app
2. Share the link with friends or in interviews
3. Use it as a live demo for portfolio/resume
4. Add authentication (Supabase Auth) for user accounts
5. Add persistence (save resumes, chat history to PostgreSQL)

# InterviewTraining - Project Structure

## Overview

InterviewTraining is a restructured copy of InterviewPilot, organized for **face recognition integration** with clear separation of backend, frontend, and model assets.

## Directory Layout

```
InterviewTraining/
├── backend/                    # Express API for face recognition
│   └── src/
│       ├── index.ts           # Server entry, CORS, routes
│       └── routes/
│           └── face-recognition.ts   # POST /analyze, GET /models/status
├── frontend/                   # Next.js 15 app
│   ├── app/                    # One folder per route
│   │   ├── page.tsx            # Home (/)
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   ├── dashboard/
│   │   │   └── page.tsx        # /dashboard
│   │   └── interview/
│   │       ├── setup/
│   │       │   └── page.tsx    # /interview/setup
│   │       ├── live/
│   │       │   └── page.tsx    # /interview/live
│   │       └── feedback/
│   │           └── page.tsx    # /interview/feedback
│   ├── components/
│   │   └── ui/                 # Card, StatusBadge, ProgressRing, ProgressBar
│   ├── lib/
│   │   ├── routes.ts          # Centralized ROUTES + interviewLiveUrl()
│   │   └── config.ts          # Env vars, face-recognition API URL
│   └── modules/
│       ├── interview/         # interviewEngine, questionGenerator, types
│       └── behavior-analysis/  # videoAnalysis (face-recognition integration)
├── face-recognition/          # Model weights & integration docs
│   ├── models/                # Place model files here (face-api.js, etc.)
│   └── README.md
└── README.md
```

## Routes (all use centralized config)

| Path | Page |
|------|------|
| `/` | Home |
| `/dashboard` | Dashboard |
| `/interview/setup` | Interview setup |
| `/interview/live?type=...` | Live interview |
| `/interview/feedback` | Feedback report |

## Face Recognition Integration

1. **Backend:** `backend/src/routes/face-recognition.ts` – stub for `POST /api/face-recognition/analyze`
2. **Frontend:** `modules/behavior-analysis/videoAnalysis.ts` – calls backend or uses client-side models
3. **Models:** Place weights in `face-recognition/models/` (see face-recognition/README.md)

## Running

```bash
# Frontend
cd frontend && npm install && npm run dev

# Backend (optional, for server-side face analysis)
cd backend && npm install && npm run dev
```

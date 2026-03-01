# InterviewTraining

AI-powered interview practice platform with behavioral analysis and **face recognition** integration.

## Project Structure

```
InterviewTraining/
├── backend/              # Node.js/Express API for face recognition
│   └── src/
│       ├── routes/       # API endpoints
│       └── services/     # Face analysis services
├── frontend/             # Next.js application
│   ├── app/              # Pages (one folder per route)
│   │   ├── dashboard/
│   │   ├── interview/
│   │   │   ├── setup/
│   │   │   ├── live/
│   │   │   └── feedback/
│   │   └── ...
│   ├── components/       # Shared UI components
│   ├── lib/              # Utilities & routes config
│   └── modules/          # Business logic
├── face-recognition/     # Face recognition models & integration
│   └── models/           # Model weights (face-api.js, MediaPipe, etc.)
└── README.md
```

## Quick Start

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend (Face Recognition API)

```bash
cd backend
npm install
npm run dev
```

### Face Recognition Models

See `face-recognition/README.md` for setup instructions (MediaPipe, face-api.js).

## Routes

| Route | Description |
|-------|-------------|
| `/` | Home / Landing |
| `/dashboard` | Session history & stats |
| `/interview/setup` | Configure interview |
| `/interview/live` | Live practice session |
| `/interview/feedback` | Performance report |

## Tech Stack

- **Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend:** Express, TypeScript
- **Face Recognition:** MediaPipe Face Mesh / face-api.js (integrate in `face-recognition/`)

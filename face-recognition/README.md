# Face Recognition Models

This folder is for face recognition model integration in InterviewTraining.

## Recommended Libraries

### 1. MediaPipe Face Mesh
- **npm:** `@mediapipe/face_mesh`, `@mediapipe/camera_utils`
- **Use for:** Face landmarks (468 points), eye tracking, head pose
- **Pros:** Fast, browser-friendly, no server required

### 2. face-api.js
- **npm:** `face-api.js`
- **Use for:** Face detection, face recognition, emotion detection
- **Models:** tiny, small, or full (download to `models/` subfolder)

### 3. TensorFlow.js Face Detection
- **npm:** `@tensorflow-models/face-landmarks-detection`
- **Use for:** BlazeFace + MediaPipe Face Mesh in TF.js

## Setup (face-api.js example)

```bash
# Download models
mkdir -p models
# Get from: https://github.com/justadudewhohacks/face-api.js-models
# Place in: face-recognition/models/
```

## Integration Points

- **Frontend:** `app/interview/live/` - video feed sends frames to backend or runs client-side
- **Backend:** `backend/src/routes/face-recognition.ts` - `/api/face-recognition/analyze`
- **Modules:** `modules/behavior-analysis/videoAnalysis.ts` - calls analysis service

## File Structure (after setup)

```
face-recognition/
├── models/           # Model weights
│   ├── tiny_face_detector_model-weights_manifest.json
│   ├── face_landmark_68_model-weights_manifest.json
│   └── face_expression_model-weights_manifest.json
├── services/        # Optional: shared analysis logic
└── README.md
```

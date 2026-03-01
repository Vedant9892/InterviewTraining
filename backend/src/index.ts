/**
 * InterviewTraining Backend
 * Face recognition & analysis API
 */

import express from "express";
import cors from "cors";
import { faceRecognitionRouter } from "./routes/face-recognition.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: ["http://localhost:3000", "http://127.0.0.1:3000"] }));
app.use(express.json({ limit: "10mb" }));

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "interview-training-backend" });
});

app.use("/api/face-recognition", faceRecognitionRouter);

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});

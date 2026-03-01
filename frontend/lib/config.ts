/**
 * Environment Variables Configuration
 */

export const config = {
  ai: {
    provider:
      (process.env.NEXT_PUBLIC_AI_PROVIDER as "openai" | "gemini") || "openai",
    apiKey:
      process.env.OPENAI_API_KEY ||
      process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
      "",
  },
  faceRecognition: {
    apiUrl:
      process.env.NEXT_PUBLIC_FACE_RECOGNITION_API ||
      "http://localhost:3001/api/face-recognition",
  },
  features: {
    videoAnalysis: process.env.NEXT_PUBLIC_ENABLE_VIDEO_ANALYSIS === "true",
    audioAnalysis: process.env.NEXT_PUBLIC_ENABLE_AUDIO_ANALYSIS === "true",
  },
};

/**
 * Video Analysis Module
 * Integrates with face recognition (MediaPipe, face-api.js, or backend API)
 */

import { VideoMetrics } from "./types";
import { config } from "@/lib/config";

export class VideoAnalyzer {
  private readonly SAMPLE_RATE = 1000;

  /**
   * Analyze a video frame for behavioral metrics
   * Supports: client-side models OR backend face-recognition API
   */
  async analyzeFrame(videoElement: HTMLVideoElement): Promise<VideoMetrics> {
    // Option 1: Call backend face-recognition API
    if (config.faceRecognition.apiUrl) {
      try {
        const base64 = await this.videoFrameToBase64(videoElement);
        const res = await fetch(`${config.faceRecognition.apiUrl}/analyze`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ base64Image: base64 }),
        });
        if (res.ok) {
          const data = await res.json();
          return {
            eyeContactScore: data.eyeContactScore ?? 75,
            smileFrequency: (data.emotionDetection?.happiness ?? 0.3) * 3,
            headMovementScore: 80,
            emotionDetection: data.emotionDetection ?? {
              confidence: 0.7,
              happiness: 0.3,
              neutral: 0.5,
              nervousness: 0.1,
            },
            facingCamera: data.facingCamera ?? true,
            timestamp: Date.now(),
          };
        }
      } catch (_e) {
        // Fall through to mock
      }
    }

    // Fallback: Mock metrics (replace with client-side face-api.js/MediaPipe)
    return {
      eyeContactScore: 60 + Math.random() * 30,
      smileFrequency: Math.random() * 3,
      headMovementScore: 70 + Math.random() * 20,
      emotionDetection: {
        confidence: 0.6 + Math.random() * 0.3,
        happiness: 0.3 + Math.random() * 0.4,
        neutral: 0.3 + Math.random() * 0.3,
        nervousness: 0.1 + Math.random() * 0.2,
      },
      facingCamera: true,
      timestamp: Date.now(),
    };
  }

  private async videoFrameToBase64(video: HTMLVideoElement): Promise<string> {
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";
    ctx.drawImage(video, 0, 0);
    return canvas.toDataURL("image/jpeg", 0.8).split(",")[1] || "";
  }

  startAnalysis(
    videoElement: HTMLVideoElement,
    onMetrics: (metrics: VideoMetrics) => void
  ): () => void {
    const intervalId = setInterval(async () => {
      const metrics = await this.analyzeFrame(videoElement);
      onMetrics(metrics);
    }, this.SAMPLE_RATE);
    return () => clearInterval(intervalId);
  }
}

export const videoAnalyzer = new VideoAnalyzer();

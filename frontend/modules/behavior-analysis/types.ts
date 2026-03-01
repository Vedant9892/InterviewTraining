/**
 * Behavior Analysis Types
 */

export interface VideoMetrics {
  eyeContactScore: number;
  smileFrequency: number;
  headMovementScore: number;
  emotionDetection: {
    confidence: number;
    happiness: number;
    neutral: number;
    nervousness: number;
  };
  facingCamera: boolean;
  timestamp: number;
}

export interface FaceRecognitionResult {
  eyeContactScore: number;
  emotionDetection: {
    confidence: number;
    happiness: number;
    neutral: number;
    nervousness: number;
  };
  headPose?: { yaw: number; pitch: number; roll: number };
  facingCamera: boolean;
}

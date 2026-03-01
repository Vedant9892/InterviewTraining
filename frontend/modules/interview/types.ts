/**
 * Interview Types and Interfaces
 */

export enum InterviewType {
  HR_BEHAVIORAL = "hr_behavioral",
  CONFIDENCE_ASSESSMENT = "confidence_assessment",
  LEADERSHIP_COMMUNICATION = "leadership_communication",
}

export interface InterviewQuestion {
  id: string;
  type: InterviewType;
  question: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  followUpPrompt?: string;
}

export interface InterviewSession {
  id: string;
  type: InterviewType;
  startTime: Date;
  endTime?: Date;
  questions: InterviewQuestion[];
  currentQuestionIndex: number;
  status: "not_started" | "in_progress" | "completed";
}

export interface UserResponse {
  questionId: string;
  transcript: string;
  audioUrl?: string;
  videoUrl?: string;
  timestamp: Date;
  duration: number;
}

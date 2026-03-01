/**
 * Interview Engine
 * Manages the interview flow and state
 */

import {
  InterviewSession,
  InterviewType,
} from "./types";
import { questionGenerator } from "./questionGenerator";

export class InterviewEngine {
  async createSession(type: InterviewType): Promise<InterviewSession> {
    const questions = await questionGenerator.generateQuestions(type, 5);

    const session: InterviewSession = {
      id: this.generateSessionId(),
      type,
      startTime: new Date(),
      questions,
      currentQuestionIndex: 0,
      status: "not_started",
    };

    return session;
  }

  startInterview(session: InterviewSession): InterviewSession {
    return {
      ...session,
      status: "in_progress",
      startTime: new Date(),
    };
  }

  nextQuestion(session: InterviewSession): InterviewSession {
    const nextIndex = session.currentQuestionIndex + 1;

    if (nextIndex >= session.questions.length) {
      return this.completeInterview(session);
    }

    return {
      ...session,
      currentQuestionIndex: nextIndex,
    };
  }

  previousQuestion(session: InterviewSession): InterviewSession {
    const prevIndex = Math.max(0, session.currentQuestionIndex - 1);

    return {
      ...session,
      currentQuestionIndex: prevIndex,
    };
  }

  completeInterview(session: InterviewSession): InterviewSession {
    return {
      ...session,
      status: "completed",
      endTime: new Date(),
    };
  }

  getCurrentQuestion(session: InterviewSession) {
    return session.questions[session.currentQuestionIndex];
  }

  getProgress(session: InterviewSession): number {
    return Math.round(
      ((session.currentQuestionIndex + 1) / session.questions.length) * 100
    );
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

export const interviewEngine = new InterviewEngine();

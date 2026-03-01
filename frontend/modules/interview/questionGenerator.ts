/**
 * AI-Powered Question Generator
 */

import { InterviewQuestion, InterviewType } from "./types";

export class QuestionGenerator {
  async generateQuestions(
    type: InterviewType,
    count: number = 5
  ): Promise<InterviewQuestion[]> {
    const questionBank = this.getQuestionBank(type);
    return questionBank.slice(0, count);
  }

  private getQuestionBank(type: InterviewType): InterviewQuestion[] {
    const banks: Record<InterviewType, InterviewQuestion[]> = {
      [InterviewType.HR_BEHAVIORAL]: [
        {
          id: "hr_1",
          type: InterviewType.HR_BEHAVIORAL,
          question:
            "Tell me about a time when you had to work with a difficult team member. How did you handle the situation?",
          category: "teamwork",
          difficulty: "medium",
        },
        {
          id: "hr_2",
          type: InterviewType.HR_BEHAVIORAL,
          question:
            "Describe a situation where you had to meet a tight deadline. What steps did you take?",
          category: "time_management",
          difficulty: "medium",
        },
        {
          id: "hr_3",
          type: InterviewType.HR_BEHAVIORAL,
          question:
            "Give me an example of a time when you demonstrated leadership skills.",
          category: "leadership",
          difficulty: "medium",
        },
        {
          id: "hr_4",
          type: InterviewType.HR_BEHAVIORAL,
          question:
            "Tell me about a mistake you made at work and how you handled it.",
          category: "problem_solving",
          difficulty: "hard",
        },
        {
          id: "hr_5",
          type: InterviewType.HR_BEHAVIORAL,
          question:
            "Describe a situation where you had to adapt to significant changes at work.",
          category: "adaptability",
          difficulty: "medium",
        },
      ],
      [InterviewType.CONFIDENCE_ASSESSMENT]: [
        {
          id: "conf_1",
          type: InterviewType.CONFIDENCE_ASSESSMENT,
          question:
            "What are your greatest strengths and how do you apply them?",
          category: "self_awareness",
          difficulty: "easy",
        },
        {
          id: "conf_2",
          type: InterviewType.CONFIDENCE_ASSESSMENT,
          question:
            "Tell me about a time when you had to present in front of a large audience.",
          category: "public_speaking",
          difficulty: "medium",
        },
        {
          id: "conf_3",
          type: InterviewType.CONFIDENCE_ASSESSMENT,
          question: "How do you handle criticism or negative feedback?",
          category: "emotional_intelligence",
          difficulty: "medium",
        },
        {
          id: "conf_4",
          type: InterviewType.CONFIDENCE_ASSESSMENT,
          question:
            "Describe a situation where you had to make a difficult decision with limited information.",
          category: "decision_making",
          difficulty: "hard",
        },
        {
          id: "conf_5",
          type: InterviewType.CONFIDENCE_ASSESSMENT,
          question: "What motivates you to perform at your best?",
          category: "motivation",
          difficulty: "easy",
        },
      ],
      [InterviewType.LEADERSHIP_COMMUNICATION]: [
        {
          id: "lead_1",
          type: InterviewType.LEADERSHIP_COMMUNICATION,
          question:
            "Describe your leadership style and give an example of when it was effective.",
          category: "leadership_style",
          difficulty: "medium",
        },
        {
          id: "lead_2",
          type: InterviewType.LEADERSHIP_COMMUNICATION,
          question:
            "Tell me about a time when you had to communicate a difficult message to your team.",
          category: "communication",
          difficulty: "hard",
        },
        {
          id: "lead_3",
          type: InterviewType.LEADERSHIP_COMMUNICATION,
          question:
            "How do you motivate team members who are underperforming?",
          category: "team_management",
          difficulty: "hard",
        },
        {
          id: "lead_4",
          type: InterviewType.LEADERSHIP_COMMUNICATION,
          question:
            "Describe a situation where you had to resolve a conflict between team members.",
          category: "conflict_resolution",
          difficulty: "medium",
        },
        {
          id: "lead_5",
          type: InterviewType.LEADERSHIP_COMMUNICATION,
          question:
            "How do you ensure effective communication in a remote or distributed team?",
          category: "remote_leadership",
          difficulty: "medium",
        },
      ],
    };

    return banks[type] || [];
  }
}

export const questionGenerator = new QuestionGenerator();

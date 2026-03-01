"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ROUTES } from "@/lib/routes";

export default function FeedbackPage() {
  const reportData = {
    date: "February 27, 2026",
    duration: "12:45",
    questionsAnswered: 5,
    overallScore: 85,
    grade: "B+",
  };

  const scores = {
    confidence: 82,
    communication: 88,
    engagement: 85,
    composure: 75,
  };

  const detailedMetrics = {
    eyeContact: 78,
    smileFrequency: 65,
    headStability: 82,
    speakingPace: 85,
    fillerWords: 12,
    toneStability: 88,
  };

  const strengths = [
    "Clear and well-structured responses",
    "Strong use of specific examples and stories",
    "Maintained consistent eye contact with camera",
    "Confident and steady speaking pace",
  ];

  const improvements = [
    "Reduce filler words (um, uh, like) - detected 12 instances",
    "Increase natural smiling to appear more approachable",
    "Add brief pauses between key points for emphasis",
    "Include more quantifiable results in your examples",
  ];

  const suggestions = [
    "Practice the STAR method (Situation, Task, Action, Result)",
    "Record yourself answering common questions to identify verbal tics",
    "Try smiling slightly before answering to set a positive tone",
    "Use the Power Pause technique: take 2-3 seconds before responding",
  ];

  return (
    <div className="app-background min-h-screen">
      <nav className="border-b border-[var(--border-subtle)] backdrop-blur-sm bg-[var(--bg-primary)]/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href={ROUTES.DASHBOARD} className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg" />
              <span className="text-xl font-semibold text-white">InterviewTraining</span>
            </Link>
            <StatusBadge status="completed" label="Analysis Complete" />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12 fade-in">
          <h1 className="text-4xl font-bold text-white mb-2">Performance Report</h1>
          <p className="text-lg text-[var(--text-secondary)]">
            {reportData.date} • {reportData.duration} • {reportData.questionsAnswered} questions
          </p>
        </div>

        <Card className="mb-12 text-center py-12 bg-gradient-to-br from-blue-500/5 to-purple-500/5 border-blue-500/20">
          <div className="inline-block mb-4">
            <div className="text-8xl font-bold bg-gradient-to-br from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {reportData.overallScore}
            </div>
          </div>
          <p className="text-2xl text-white font-semibold mb-2">Overall Performance</p>
          <p className="text-lg text-[var(--text-secondary)]">Grade: {reportData.grade}</p>
        </Card>

        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center py-8">
            <ProgressRing value={scores.confidence} size={100} strokeWidth={8} />
            <p className="mt-4 text-lg font-semibold text-white">Confidence</p>
            <p className="text-sm text-[var(--text-secondary)]">Body language & tone</p>
          </Card>
          <Card className="text-center py-8">
            <ProgressRing value={scores.communication} size={100} strokeWidth={8} />
            <p className="mt-4 text-lg font-semibold text-white">Communication</p>
            <p className="text-sm text-[var(--text-secondary)]">Clarity & structure</p>
          </Card>
          <Card className="text-center py-8">
            <ProgressRing value={scores.engagement} size={100} strokeWidth={8} />
            <p className="mt-4 text-lg font-semibold text-white">Engagement</p>
            <p className="text-sm text-[var(--text-secondary)]">Eye contact & energy</p>
          </Card>
          <Card className="text-center py-8">
            <ProgressRing value={scores.composure} size={100} strokeWidth={8} />
            <p className="mt-4 text-lg font-semibold text-white">Composure</p>
            <p className="text-sm text-[var(--text-secondary)]">Calmness under pressure</p>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card title="Visual Analysis">
            <div className="space-y-4">
              <ProgressBar value={detailedMetrics.eyeContact} label="Eye Contact" />
              <ProgressBar value={detailedMetrics.smileFrequency} label="Smile Frequency" />
              <ProgressBar value={detailedMetrics.headStability} label="Head Stability" />
            </div>
          </Card>

          <Card title="Audio Analysis">
            <div className="space-y-4">
              <ProgressBar value={detailedMetrics.speakingPace} label="Speaking Pace" />
              <ProgressBar value={detailedMetrics.toneStability} label="Tone Stability" />
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-[var(--text-secondary)]">Filler Words</span>
                  <span className="text-sm font-medium text-white">
                    {detailedMetrics.fillerWords} instances
                  </span>
                </div>
                <p className="text-xs text-[var(--text-tertiary)]">
                  Target: Less than 8 per interview
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card title="Strengths" className="border-green-500/20 bg-green-500/5">
            <ul className="space-y-3">
              {strengths.map((strength, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <svg
                    className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm text-[var(--text-secondary)]">{strength}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Areas to Improve" className="border-amber-500/20 bg-amber-500/5">
            <ul className="space-y-3">
              {improvements.map((improvement, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <svg
                    className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <span className="text-sm text-[var(--text-secondary)]">{improvement}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Action Items" className="border-blue-500/20 bg-blue-500/5">
            <ul className="space-y-3">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <svg
                    className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                  <span className="text-sm text-[var(--text-secondary)]">{suggestion}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Practice Again</h3>
                <p className="text-[var(--text-secondary)] mb-6">
                  Apply these insights in your next practice session
                </p>
                <Link href={ROUTES.INTERVIEW.SETUP} className="btn-primary inline-block">
                  Start New Session
                </Link>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">View Dashboard</h3>
                <p className="text-[var(--text-secondary)] mb-6">
                  Track your progress and review past sessions
                </p>
                <Link href={ROUTES.DASHBOARD} className="btn-primary inline-block">
                  Go to Dashboard
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}

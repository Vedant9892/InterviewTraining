"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ROUTES } from "@/lib/routes";

export default function DashboardPage() {
  const recentSessions = [
    {
      id: 1,
      date: "2026-02-27",
      type: "Behavioral Interview",
      score: 85,
      grade: "B+",
      duration: "12:45",
    },
    {
      id: 2,
      date: "2026-02-26",
      type: "Confidence Assessment",
      score: 78,
      grade: "C+",
      duration: "11:20",
    },
    {
      id: 3,
      date: "2026-02-25",
      type: "Leadership Interview",
      score: 92,
      grade: "A",
      duration: "14:10",
    },
  ];

  const stats = {
    totalSessions: 3,
    averageScore: 85,
    totalTime: "38m",
    skillLevel: "B+",
  };

  const averageMetrics = {
    confidence: 85,
    communication: 78,
    engagement: 92,
    composure: 88,
  };

  return (
    <div className="app-background min-h-screen">
      <nav className="border-b border-[var(--border-subtle)] backdrop-blur-sm bg-[var(--bg-primary)]/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <Link href={ROUTES.HOME} className="flex items-center space-x-2 min-w-0">
              <div className="w-8 h-8 flex-shrink-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg" />
              <span className="text-base sm:text-xl font-semibold text-white truncate">InterviewTraining</span>
            </Link>
            <div className="flex items-center gap-2 sm:gap-4">
              <StatusBadge status="active" label="Active" />
              <Link href={ROUTES.INTERVIEW.SETUP} className="btn-primary text-sm sm:text-base px-3 sm:px-4 py-2 min-h-[44px]">
                New Session
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        <div className="mb-8 sm:mb-12 fade-in">
          <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-base sm:text-lg text-[var(--text-secondary)]">
            Track your progress and review past sessions
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <Card>
            <p className="text-sm text-[var(--text-secondary)] mb-1">Total Sessions</p>
            <p className="text-2xl sm:text-4xl font-bold text-white">{stats.totalSessions}</p>
            <p className="text-xs text-green-400 mt-1">+1 this week</p>
          </Card>

          <Card>
            <p className="text-sm text-[var(--text-secondary)] mb-1">Average Score</p>
            <p className="text-2xl sm:text-4xl font-bold text-white">{stats.averageScore}</p>
            <p className="text-xs text-blue-400 mt-1">Above target</p>
          </Card>

          <Card>
            <p className="text-sm text-[var(--text-secondary)] mb-1">Practice Time</p>
            <p className="text-2xl sm:text-4xl font-bold text-white">{stats.totalTime}</p>
            <p className="text-xs text-[var(--text-secondary)] mt-1">Total duration</p>
          </Card>

          <Card>
            <p className="text-sm text-[var(--text-secondary)] mb-1">Skill Level</p>
            <p className="text-2xl sm:text-4xl font-bold text-white">{stats.skillLevel}</p>
            <p className="text-xs text-green-400 mt-1">Improving</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <Card title="Average Performance">
            <div className="grid grid-cols-2 gap-4 sm:gap-6 py-4">
              <ProgressRing value={averageMetrics.confidence} label="Confidence" size={80} />
              <ProgressRing value={averageMetrics.communication} label="Communication" size={80} />
              <ProgressRing value={averageMetrics.engagement} label="Engagement" size={80} />
              <ProgressRing value={averageMetrics.composure} label="Composure" size={80} />
            </div>
          </Card>

          <Card title="Performance Breakdown">
            <div className="space-y-4 py-4">
              <ProgressBar value={averageMetrics.confidence} label="Confidence" />
              <ProgressBar value={averageMetrics.communication} label="Communication" color="success" />
              <ProgressBar value={averageMetrics.engagement} label="Engagement" color="primary" />
              <ProgressBar value={averageMetrics.composure} label="Composure" color="warning" />
            </div>
          </Card>
        </div>

        <Card title="Recent Sessions" className="mb-12">
          <div className="space-y-4">
            {recentSessions.map((session) => (
              <div
                key={session.id}
                className="surface p-4 rounded-lg hover:border-[var(--border-default)] transition-all cursor-pointer"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center space-x-4 flex-1 min-w-0">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-white mb-1">{session.type}</h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[var(--text-secondary)]">
                        <span>{session.date}</span>
                        <span>{session.duration}</span>
                        <StatusBadge status="completed" label="Completed" size="sm" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <p className="text-3xl font-bold text-white">{session.score}</p>
                      <p className="text-sm text-[var(--text-secondary)]">
                        Grade: <span className="text-white font-medium">{session.grade}</span>
                      </p>
                    </div>
                    <Link href={ROUTES.INTERVIEW.FEEDBACK} className="btn-secondary px-4 py-2 text-sm min-h-[44px] inline-flex items-center">
                      View Report
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
            <div className="py-8">
              <h3 className="text-2xl font-semibold text-white mb-3">Start New Session</h3>
              <p className="text-[var(--text-secondary)] mb-6">
                Continue improving with AI and face recognition practice
              </p>
              <Link href={ROUTES.INTERVIEW.SETUP} className="btn-primary inline-flex min-h-[48px] items-center">
                Begin Practice
              </Link>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
            <div className="py-8">
              <h3 className="text-2xl font-semibold text-white mb-3">Track Progress</h3>
              <p className="text-[var(--text-secondary)] mb-6">
                Analyze improvement trends and identify areas for growth
              </p>
              <button className="btn-primary inline-flex min-h-[48px] items-center">View Analytics</button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}

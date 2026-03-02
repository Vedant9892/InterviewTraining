"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ROUTES } from "@/lib/routes";

export default function HomePage() {
  return (
    <div className="app-background min-h-screen">
      <nav className="border-b border-[var(--border-subtle)] backdrop-blur-sm bg-[var(--bg-primary)]/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex justify-between items-center gap-2">
            <div className="flex items-center space-x-2 min-w-0">
              <div className="w-8 h-8 flex-shrink-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg" />
              <span className="text-base sm:text-xl font-semibold text-white truncate">InterviewTraining</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
              <Link
                href={ROUTES.DASHBOARD}
                className="hidden sm:inline text-[var(--text-secondary)] hover:text-white transition-colors text-sm font-medium py-2"
              >
                Dashboard
              </Link>
              <Link
                href={ROUTES.INTERVIEW.SETUP}
                className="inline-flex items-center justify-center gap-2 btn-primary rounded-lg hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-200 px-3 sm:px-4 py-2.5 text-sm sm:text-base"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Start Interview
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="py-12 sm:py-16 md:py-24 text-center fade-in">
          <StatusBadge status="active" label="AI + Face Recognition" size="md" />

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 sm:mt-6 mb-4 sm:mb-6 leading-tight">
            Improve Your Interview
            <br />
            Presence with AI
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-12 px-1">
            Real-time feedback on communication style, body language, and confidence. Face recognition
            models analyze your behavioral patterns for better interviews.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-4 mb-8">
            <Link
              href={ROUTES.INTERVIEW.SETUP}
              className="inline-flex items-center justify-center gap-3 btn-primary text-base sm:text-lg px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] min-h-[48px]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Start Practice Session
            </Link>
            <Link href="#features" className="btn-secondary text-base sm:text-lg px-6 sm:px-8 py-3.5 sm:py-4 min-h-[48px] inline-flex items-center justify-center">
              Learn More
            </Link>
          </div>

          <p className="text-sm text-[var(--text-tertiary)]">
            No signup required • Free to use • Privacy-focused
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-16 sm:mb-24">
          <Card>
            <div className="text-center">
              <div className="text-2xl sm:text-4xl font-bold text-white mb-2">Real-time</div>
              <p className="text-[var(--text-secondary)]">Behavioral + Face Analysis</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-2xl sm:text-4xl font-bold text-white mb-2">Multi-modal</div>
              <p className="text-[var(--text-secondary)]">Audio, Video, Face</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-2xl sm:text-4xl font-bold text-white mb-2">Actionable</div>
              <p className="text-[var(--text-secondary)]">Improvement Insights</p>
            </div>
          </Card>
        </div>

        <div id="features" className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Comprehensive Behavioral Analysis
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              AI and face recognition analyze multiple dimensions of your interview performance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
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
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">Face & Eye Tracking</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    Face recognition models track engagement and visual connection strength.
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">Voice Analysis</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    Speaking pace, filler words, and tone stability analysis.
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-amber-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">Emotion Recognition</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    Face models detect confidence, nervousness, and emotional authenticity.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="pb-24">
          <Card className="text-center py-16 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to improve your interview skills?
            </h2>
            <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
              Start practicing with AI and face recognition feedback.
            </p>
            <Link href={ROUTES.INTERVIEW.SETUP} className="btn-primary text-lg px-8 py-4 inline-block">
              Start Your First Session
            </Link>
          </Card>
        </div>
      </main>

      <footer className="border-t border-[var(--border-subtle)] py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm text-[var(--text-tertiary)]">
            © 2026 InterviewTraining. Built with AI and face recognition.
          </p>
        </div>
      </footer>
    </div>
  );
}

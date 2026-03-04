"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { ROUTES } from "@/lib/routes";

export default function AboutPage() {
  return (
    <div className="app-background min-h-screen">
      <nav className="border-b border-[var(--border-subtle)] backdrop-blur-sm bg-[var(--bg-primary)]/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex justify-between items-center gap-2">
            <Link href={ROUTES.HOME} className="flex items-center space-x-2 min-w-0 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 flex-shrink-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg" />
              <span className="text-base sm:text-xl font-semibold text-white truncate">InterviewTraining</span>
            </Link>
            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
              <Link
                href={ROUTES.ABOUT}
                className="text-white font-medium text-sm py-2"
              >
                About Us
              </Link>
              <Link
                href={ROUTES.CHECK_CAMERA}
                className="text-[var(--text-secondary)] hover:text-white transition-colors text-sm font-medium py-2"
              >
                Check Camera
              </Link>
              <Link
                href={ROUTES.DASHBOARD}
                className="text-[var(--text-secondary)] hover:text-white transition-colors text-sm font-medium py-2"
              >
                Dashboard
              </Link>
              <Link
                href={ROUTES.INTERVIEW.SETUP}
                className="inline-flex items-center justify-center gap-2 btn-primary rounded-lg hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-200 px-3 sm:px-4 py-2.5 text-sm sm:text-base"
              >
                Start Interview
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center mb-12 fade-in">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">About Us</h1>
          <p className="text-lg text-[var(--text-secondary)]">
            AI-powered interview practice with real-time feedback
          </p>
        </div>

        <div className="space-y-6 mb-12">
          <Card className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-white mb-4">Our Mission</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              InterviewTraining helps you build confidence and improve your interview presence through
              AI-driven analysis. We combine face recognition, voice analysis, and behavioral metrics to
              give you actionable feedback—so you can practice smarter and perform better in real
              interviews.
            </p>
          </Card>

          <Card className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-white mb-4">What We Offer</h2>
            <ul className="space-y-3 text-[var(--text-secondary)]">
              <li className="flex items-start gap-3">
                <span className="text-green-400 mt-1">✓</span>
                <span>Real-time face detection and eye contact tracking</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 mt-1">✓</span>
                <span>Multiple interview types: Behavioral, Confidence Assessment, Leadership</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 mt-1">✓</span>
                <span>Performance reports with strengths and improvement areas</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 mt-1">✓</span>
                <span>Privacy-focused: process locally when possible</span>
              </li>
            </ul>
          </Card>

          <Card className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-white mb-4">Get Started</h2>
            <p className="text-[var(--text-secondary)] mb-6">
              Ready to improve your interview skills? Set up your camera, choose an interview type, and
              start practicing today.
            </p>
            <Link href={ROUTES.INTERVIEW.SETUP} className="btn-primary inline-flex items-center gap-2">
              Start Practice Session
            </Link>
          </Card>
        </div>
      </main>
    </div>
  );
}

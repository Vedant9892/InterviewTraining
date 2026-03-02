"use client";

import { InterviewType } from "@/modules/interview/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ROUTES } from "@/lib/routes";

export default function InterviewSetupPage() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<InterviewType | null>(null);
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [calibrating, setCalibrating] = useState(false);

  const handleRequestPermissions = async () => {
    setCalibrating(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      stream.getTracks().forEach((track) => track.stop());
      setTimeout(() => {
        setPermissionsGranted(true);
        setCalibrating(false);
      }, 1500);
    } catch (error) {
      alert("Camera and microphone access required to continue.");
      setCalibrating(false);
    }
  };

  const handleStart = () => {
    if (!selectedType) {
      alert("Please select an interview type");
      return;
    }
    if (!permissionsGranted) {
      alert("Please grant camera and microphone permissions");
      return;
    }
    router.push(`${ROUTES.INTERVIEW.CAMERA_CHECK}?type=${encodeURIComponent(selectedType)}`);
  };

  return (
    <div className="app-background min-h-screen">
      <nav className="border-b border-[var(--border-subtle)] backdrop-blur-sm bg-[var(--bg-primary)]/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href={ROUTES.HOME} className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg" />
              <span className="text-xl font-semibold text-white">InterviewTraining</span>
            </Link>
            <StatusBadge
              status={permissionsGranted ? "ready" : "inactive"}
              label={permissionsGranted ? "Ready" : "Setup Required"}
            />
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12 fade-in">
          <h1 className="text-4xl font-bold text-white mb-4">Interview Setup</h1>
          <p className="text-lg text-[var(--text-secondary)]">
            Configure your practice session (with face recognition support)
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-4">Select Interview Type</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <button
              onClick={() => setSelectedType(InterviewType.HR_BEHAVIORAL)}
              className={`card text-left p-6 transition-all ${
                selectedType === InterviewType.HR_BEHAVIORAL
                  ? "active-glow border-blue-500"
                  : "hover:border-[var(--border-default)]"
              }`}
            >
              <div className="flex items-start space-x-3 mb-3">
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">Behavioral Interview</h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Practice teamwork, problem-solving, situational questions
                  </p>
                </div>
              </div>
              {selectedType === InterviewType.HR_BEHAVIORAL && (
                <StatusBadge status="active" label="Selected" size="sm" />
              )}
            </button>

            <button
              onClick={() => setSelectedType(InterviewType.CONFIDENCE_ASSESSMENT)}
              className={`card text-left p-6 transition-all ${
                selectedType === InterviewType.CONFIDENCE_ASSESSMENT
                  ? "active-glow border-blue-500"
                  : "hover:border-[var(--border-default)]"
              }`}
            >
              <div className="flex items-start space-x-3 mb-3">
                <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">Confidence Assessment</h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Focus on presence, self-awareness, communication confidence
                  </p>
                </div>
              </div>
              {selectedType === InterviewType.CONFIDENCE_ASSESSMENT && (
                <StatusBadge status="active" label="Selected" size="sm" />
              )}
            </button>

            <button
              onClick={() => setSelectedType(InterviewType.LEADERSHIP_COMMUNICATION)}
              className={`card text-left p-6 transition-all ${
                selectedType === InterviewType.LEADERSHIP_COMMUNICATION
                  ? "active-glow border-blue-500"
                  : "hover:border-[var(--border-default)]"
              }`}
            >
              <div className="flex items-start space-x-3 mb-3">
                <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">Leadership Interview</h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Team management and strategic communication
                  </p>
                </div>
              </div>
              {selectedType === InterviewType.LEADERSHIP_COMMUNICATION && (
                <StatusBadge status="active" label="Selected" size="sm" />
              )}
            </button>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-4">Camera and Microphone Access</h2>
          <Card>
            {!permissionsGranted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-[var(--text-secondary)] mb-6">
                  Required for face recognition and audio analysis. All processing happens locally.
                </p>
                <button
                  onClick={handleRequestPermissions}
                  disabled={calibrating}
                  className="btn-primary"
                >
                  {calibrating ? "Requesting Access..." : "Grant Access"}
                </button>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-400"
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
                </div>
                <p className="text-white font-medium mb-2">Access Granted</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  Camera and microphone ready for face recognition
                </p>
              </div>
            )}
          </Card>
        </div>

        <div className="text-center">
          <button
            onClick={handleStart}
            disabled={!selectedType || !permissionsGranted}
            className={`btn-primary text-lg px-12 py-4 ${
              !selectedType || !permissionsGranted ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Start Interview
          </button>
          {selectedType && permissionsGranted && (
            <p className="text-sm text-green-400 mt-4">Ready to begin</p>
          )}
        </div>
      </main>
    </div>
  );
}

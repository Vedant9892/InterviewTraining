"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { InterviewType } from "@/modules/interview/types";
import { interviewEngine } from "@/modules/interview/interviewEngine";
import { Card } from "@/components/ui/Card";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ROUTES } from "@/lib/routes";

function LiveInterviewContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [session, setSession] = useState<any>(null);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [transcript, setTranscript] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const [metrics, setMetrics] = useState({
    eyeContact: 0,
    confidence: 0,
    speakingPace: 0,
    clarity: 0,
  });

  useEffect(() => {
    const type = searchParams.get("type") as InterviewType;
    if (!type) return;

    interviewEngine.createSession(type).then((newSession) => {
      const startedSession = interviewEngine.startInterview(newSession);
      setSession(startedSession);
      setCurrentQuestion(interviewEngine.getCurrentQuestion(startedSession));
    });

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        streamRef.current = mediaStream;
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      })
      .catch((error) => {
        console.error("Error accessing media devices:", error);
      });

    const interval = setInterval(() => {
      setMetrics({
        eyeContact: Math.floor(Math.random() * 30) + 70,
        confidence: Math.floor(Math.random() * 25) + 70,
        speakingPace: Math.floor(Math.random() * 20) + 75,
        clarity: Math.floor(Math.random() * 35) + 60,
      });
    }, 2000);

    return () => {
      clearInterval(interval);
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    };
  }, [searchParams]);

  const handleNext = () => {
    if (!session) return;
    const nextSession = interviewEngine.nextQuestion(session);
    setSession(nextSession);
    setCurrentQuestion(interviewEngine.getCurrentQuestion(nextSession));
    setTranscript("");
  };

  const handlePrevious = () => {
    if (!session) return;
    const prevSession = interviewEngine.previousQuestion(session);
    setSession(prevSession);
    setCurrentQuestion(interviewEngine.getCurrentQuestion(prevSession));
  };

  const handleComplete = () => {
    router.push(ROUTES.INTERVIEW.FEEDBACK);
  };

  const progress = session ? interviewEngine.getProgress(session) : 0;

  return (
    <div className="app-background min-h-screen">
      <nav className="border-b border-[var(--border-subtle)] backdrop-blur-sm bg-[var(--bg-primary)]/80 sticky top-0 z-50">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg" />
                <span className="text-lg font-semibold text-white">InterviewTraining</span>
              </div>
              <StatusBadge
                status={isRecording ? "recording" : "active"}
                label={isRecording ? "Recording" : "In Progress"}
              />
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-[var(--text-secondary)]">
                Question {(session?.currentQuestionIndex || 0) + 1} of {session?.questions?.length || 5}
              </span>
              <div className="w-32 h-2 bg-[var(--bg-elevated)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-sm font-medium text-white">{progress}%</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-[1800px] mx-auto px-6 py-6">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-1 space-y-6">
            <Card title="Video Feed (Face Recognition Ready)">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-black">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                {isRecording && (
                  <div className="absolute top-4 right-4 flex items-center space-x-2 bg-red-500/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-red-500/50">
                    <div className="w-2 h-2 bg-red-500 rounded-full pulse-subtle" />
                    <span className="text-red-400 text-xs font-medium">REC</span>
                  </div>
                )}
              </div>
            </Card>

            <Card title="Real-Time Analysis">
              <div className="grid grid-cols-2 gap-6">
                <ProgressRing value={metrics.eyeContact} label="Eye Contact" size={80} />
                <ProgressRing value={metrics.confidence} label="Confidence" size={80} />
                <ProgressRing value={metrics.speakingPace} label="Speaking Pace" size={80} />
                <ProgressRing value={metrics.clarity} label="Clarity" size={80} />
              </div>
            </Card>
          </div>

          <div className="col-span-2 space-y-6">
            <Card title={`Question ${(session?.currentQuestionIndex || 0) + 1}`}>
              <div className="bg-[var(--bg-primary)] rounded-lg p-6 mb-6">
                <p className="text-lg text-white leading-relaxed">
                  {currentQuestion?.question || "Loading question..."}
                </p>
              </div>

              <div className="bg-[var(--bg-primary)] rounded-lg p-4 min-h-[120px]">
                <p className="text-xs font-medium text-[var(--text-secondary)] mb-2">Live Transcript</p>
                <p className="text-sm text-white">
                  {transcript || "Waiting for audio input..."}
                </p>
              </div>
            </Card>

            <Card title="Performance Overview">
              <div className="space-y-4">
                <ProgressBar value={metrics.eyeContact} label="Eye Contact" />
                <ProgressBar value={metrics.confidence} label="Confidence" />
                <ProgressBar value={metrics.speakingPace} label="Speaking Pace" />
                <ProgressBar value={metrics.clarity} label="Communication Clarity" />
              </div>
            </Card>

            <Card>
              <div className="flex justify-between items-center">
                <button
                  onClick={handlePrevious}
                  disabled={session?.currentQuestionIndex === 0}
                  className="btn-secondary disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setIsRecording(!isRecording)}
                    className="btn-primary bg-red-500 hover:bg-red-600"
                  >
                    {isRecording ? "Stop Recording" : "Start Recording"}
                  </button>
                </div>

                <button onClick={handleNext} className="btn-primary">
                  Next Question
                </button>
              </div>
            </Card>

            <button
              onClick={handleComplete}
              className="w-full btn-primary bg-green-600 hover:bg-green-700 py-4 text-lg"
            >
              Complete Interview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LiveInterviewPage() {
  return (
    <Suspense fallback={<div className="app-background min-h-screen flex items-center justify-center"><p className="text-[var(--text-secondary)]">Loading...</p></div>}>
      <LiveInterviewContent />
    </Suspense>
  );
}

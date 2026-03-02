"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ROUTES, interviewLiveUrl } from "@/lib/routes";
import { Card } from "@/components/ui/Card";
import Link from "next/link";

type CameraStatus = "idle" | "requesting" | "ready" | "error";

function CameraCheckContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [status, setStatus] = useState<CameraStatus>("requesting");
  const [error, setError] = useState<string | null>(null);

  const type = searchParams.get("type");

  useEffect(() => {
    if (!type) return;

    setStatus("requesting");
    setError(null);
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setStatus("ready");
      })
      .catch((err) => {
        setError(err.message || "Could not access camera and microphone");
        setStatus("error");
      });

    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    };
  }, [type]);

  const handleRetry = () => {
    setStatus("requesting");
    setError(null);
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        streamRef.current?.getTracks().forEach((t) => t.stop());
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
        setStatus("ready");
      })
      .catch((err) => {
        setError(err.message || "Could not access camera and microphone");
        setStatus("error");
      });
  };

  const handleContinue = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    router.push(interviewLiveUrl(type!));
  };

  if (!type) {
    router.replace(ROUTES.INTERVIEW.SETUP);
    return null;
  }

  return (
    <div className="app-background min-h-screen min-h-[100dvh] flex items-center justify-center p-4 sm:p-6">
      <Card className="max-w-md w-full p-6 sm:p-8 text-center">
        {status === "requesting" && (
          <>
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
            <h2 className="text-xl font-semibold text-white mb-2">Opening Camera</h2>
            <p className="text-[var(--text-secondary)]">
              Please allow camera and microphone access to continue
            </p>
          </>
        )}

        {status === "ready" && (
          <>
            <div className="relative aspect-video rounded-lg overflow-hidden bg-black mb-6">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-green-500/90 text-white text-xs px-2 py-1 rounded">
                Camera Ready
              </div>
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">You&apos;re all set!</h2>
            <p className="text-[var(--text-secondary)] mb-6">
              Position yourself in frame. Click below to start the interview.
            </p>
            <button onClick={handleContinue} className="btn-primary w-full min-h-[48px]">
              Continue to Interview
            </button>
          </>
        )}

        {status === "error" && (
          <>
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-red-400"
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
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">Camera Access Needed</h2>
            <p className="text-[var(--text-secondary)] mb-6">{error}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={handleRetry} className="btn-primary flex-1 min-h-[48px]">
                Try Again
              </button>
              <Link href={ROUTES.INTERVIEW.SETUP} className="btn-secondary flex-1 text-center min-h-[48px] inline-flex items-center justify-center">
                Go Back
              </Link>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}

export default function CameraCheckPage() {
  return (
    <Suspense
      fallback={
        <div className="app-background min-h-screen flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <CameraCheckContent />
    </Suspense>
  );
}

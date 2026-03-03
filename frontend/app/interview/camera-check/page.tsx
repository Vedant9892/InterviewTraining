"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ROUTES, interviewLiveUrl } from "@/lib/routes";
import { Card } from "@/components/ui/Card";
import Link from "next/link";
import dynamic from "next/dynamic";

const FaceDetectionOverlay = dynamic(
  () => import("@/components/FaceDetectionOverlay").then((mod) => ({ default: mod.FaceDetectionOverlay })),
  { ssr: false }
);

type CameraStatus = "idle" | "requesting" | "ready" | "error";

function CameraCheckContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number | null>(null);
  const [status, setStatus] = useState<CameraStatus>("requesting");
  const [error, setError] = useState<string | null>(null);
  const [faceDetected, setFaceDetected] = useState(false);
  const [micLevel, setMicLevel] = useState(0);

  const type = searchParams.get("type");

  useEffect(() => {
    if (!type) return;

    let audioContext: AudioContext | null = null;

    setStatus("requesting");
    setError(null);
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } }, audio: true })
      .then((stream) => {
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setStatus("ready");

        // Mic level monitoring
        const audioTrack = stream.getAudioTracks()[0];
        if (audioTrack?.readyState === "live") {
          audioContext = new AudioContext();
          const source = audioContext.createMediaStreamSource(stream);
          const analyser = audioContext.createAnalyser();
          analyser.fftSize = 256;
          analyser.smoothingTimeConstant = 0.8;
          source.connect(analyser);
          analyserRef.current = analyser;

          const dataArray = new Uint8Array(analyser.frequencyBinCount);
          const updateLevel = () => {
            if (!analyserRef.current) return;
            analyserRef.current.getByteFrequencyData(dataArray);
            const average = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
            setMicLevel(Math.min(100, Math.round(average * 2)));
            animationRef.current = requestAnimationFrame(updateLevel);
          };
          updateLevel();
        }
      })
      .catch((err) => {
        setError(err.message || "Could not access camera and microphone");
        setStatus("error");
      });

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (audioContext) audioContext.close();
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
      analyserRef.current = null;
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
            <div className="relative aspect-video rounded-lg overflow-hidden bg-black mb-4">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              <FaceDetectionOverlay
                videoRef={videoRef}
                isActive={status === "ready"}
                onFaceDetected={setFaceDetected}
              />
              <div className="absolute top-2 left-2 flex items-center gap-2">
                <div className="flex items-center gap-1.5 bg-green-500/90 text-white text-xs px-2 py-1 rounded">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Camera Ready
                </div>
                {faceDetected && (
                  <div className="flex items-center gap-1.5 bg-green-500/90 text-white text-xs px-2 py-1 rounded">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    Face Detected
                  </div>
                )}
              </div>
              <div className="absolute top-2 right-2 flex flex-col items-end gap-2">
                <div className="bg-black/60 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                  Live Camera
                </div>
                <div
                  className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    faceDetected ? "bg-green-500/90 text-white" : "bg-amber-500/90 text-black"
                  }`}
                >
                  Live Face Detection: {faceDetected ? "Detected" : "Scanning"}
                </div>
              </div>
            </div>

            {/* Mic level indicator */}
            <div className="flex items-center gap-3 mb-6 px-1">
              <svg className="w-5 h-5 text-[var(--text-secondary)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-14 0M12 19v2m-3-2h6M12 3a3 3 0 00-3 3v4a3 3 0 006 0V6a3 3 0 00-3-3z" />
              </svg>
              <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-100"
                  style={{
                    width: `${micLevel}%`,
                    backgroundColor: micLevel > 60 ? "#22c55e" : micLevel > 20 ? "#eab308" : "#6b7280",
                  }}
                />
              </div>
              <span className="text-xs text-[var(--text-secondary)] w-8 text-right">
                {micLevel > 10 ? "OK" : "Low"}
              </span>
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

"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { ROUTES } from "@/lib/routes";

const FaceDetectionOverlay = dynamic(
  () => import("@/components/FaceDetectionOverlay").then((mod) => ({ default: mod.FaceDetectionOverlay })),
  { ssr: false }
);

type DeviceStatus = "checking" | "working" | "error";

export default function CheckCameraPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number | null>(null);

  const [cameraStatus, setCameraStatus] = useState<DeviceStatus>("checking");
  const [micStatus, setMicStatus] = useState<DeviceStatus>("checking");
  const [micLevel, setMicLevel] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);

  useEffect(() => {
    let audioContext: AudioContext | null = null;

    const initDevices = async () => {
      setError(null);
      setCameraStatus("checking");
      setMicStatus("checking");

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: true,
        });

        streamRef.current = stream;

        // Camera
        const videoTrack = stream.getVideoTracks()[0];
        if (videoTrack?.readyState === "live") {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
          setCameraStatus("working");
        } else {
          setCameraStatus("error");
        }

        // Microphone + level monitoring
        const audioTrack = stream.getAudioTracks()[0];
        if (audioTrack?.readyState === "live") {
          setMicStatus("working");

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
        } else {
          setMicStatus("error");
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : "Could not access camera and microphone";
        setError(message);
        setCameraStatus("error");
        setMicStatus("error");
      }
    };

    initDevices();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (audioContext) {
        audioContext.close();
      }
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
      analyserRef.current = null;
    };
  }, [isRetrying]);

  const handleRetry = () => {
    setIsRetrying((prev) => !prev);
  };

  const allWorking = cameraStatus === "working" && micStatus === "working";

  return (
    <div className="app-background min-h-screen min-h-[100dvh]">
      <nav className="border-b border-[var(--border-subtle)] backdrop-blur-sm bg-[var(--bg-primary)]/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <Link href={ROUTES.HOME} className="flex items-center space-x-2 hover:opacity-80 transition-opacity w-fit">
              <div className="w-8 h-8 flex-shrink-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg" />
              <span className="text-base sm:text-xl font-semibold text-white">InterviewTraining</span>
            </Link>
            <Link href={ROUTES.ABOUT} className="text-[var(--text-secondary)] hover:text-white transition-colors text-sm font-medium py-2">
              About Us
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Check Camera & Microphone</h1>
          <p className="text-[var(--text-secondary)]">
            Verify your devices work correctly before starting an interview
          </p>
        </div>

        {/* Camera preview */}
        <Card className="overflow-hidden p-0 mb-6">
          <div className="relative aspect-video bg-black">
            {cameraStatus === "checking" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-[var(--text-secondary)]">Requesting camera access...</p>
              </div>
            )}
            {cameraStatus === "error" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
                <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-[var(--text-secondary)] text-center">
                  Camera not available. Check permissions or try another device.
                </p>
              </div>
            )}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover ${cameraStatus !== "working" ? "invisible" : ""}`}
            />
            {cameraStatus === "working" && (
              <>
                <div className="absolute top-3 left-3 flex items-center gap-2 bg-green-500/90 text-white text-sm font-medium px-3 py-1.5 rounded-full">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Camera working
                </div>
                <div className="absolute top-3 right-3 flex flex-col items-end gap-2">
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
                <FaceDetectionOverlay
                  videoRef={videoRef}
                  isActive={cameraStatus === "working"}
                  onFaceDetected={setFaceDetected}
                />
              </>
            )}
          </div>
        </Card>

        {/* Device status cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Camera status */}
          <Card className="flex items-center gap-4 p-4">
            <div
              className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${
                cameraStatus === "working"
                  ? "bg-green-500/20"
                  : cameraStatus === "error"
                    ? "bg-red-500/20"
                    : "bg-blue-500/20"
              }`}
            >
              {cameraStatus === "working" && (
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
              {cameraStatus === "error" && (
                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
              {cameraStatus === "checking" && (
                <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
              )}
            </div>
            <div>
              <p className="font-semibold text-white">Camera</p>
              <p className="text-sm text-[var(--text-secondary)]">
                {cameraStatus === "working" && (faceDetected ? "Face detected ✓" : "Capturing video")}
                {cameraStatus === "error" && "Not detected"}
                {cameraStatus === "checking" && "Checking..."}
              </p>
            </div>
          </Card>

          {/* Microphone status + level */}
          <Card className="flex items-center gap-4 p-4">
            <div
              className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${
                micStatus === "working"
                  ? "bg-green-500/20"
                  : micStatus === "error"
                    ? "bg-red-500/20"
                    : "bg-blue-500/20"
              }`}
            >
              {micStatus === "working" && (
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
              {micStatus === "error" && (
                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
              {micStatus === "checking" && (
                <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white">Microphone</p>
              <p className="text-sm text-[var(--text-secondary)] mb-2">
                {micStatus === "working" && "Listening — try speaking"}
                {micStatus === "error" && "Not detected"}
                {micStatus === "checking" && "Checking..."}
              </p>
              {micStatus === "working" && (
                <div className="h-1.5 w-full bg-[var(--bg-primary)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-75 rounded-full"
                    style={{ width: `${micLevel}%` }}
                  />
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
            <p className="text-red-400 text-sm">{error}</p>
            <p className="text-[var(--text-tertiary)] text-xs mt-2">
              Grant permission in your browser settings, then click Try Again.
            </p>
          </div>
        )}

        {/* Success message */}
        {allWorking && (
          <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex items-start gap-3">
            <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-medium text-green-400">All devices working!</p>
              <p className="text-sm text-[var(--text-secondary)] mt-1">
                Your camera and microphone are ready for interview practice.
                {faceDetected && " Face detected — you're all set!"}
              </p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          {!allWorking && (
            <button
              onClick={handleRetry}
              className="btn-primary flex-1 min-h-[48px]"
            >
              Try Again
            </button>
          )}
          <Link
            href={ROUTES.INTERVIEW.SETUP}
            className={`btn-secondary flex-1 min-h-[48px] inline-flex items-center justify-center ${
              allWorking ? "!bg-gradient-to-r !from-blue-500 !to-purple-600 !text-white !border-0 hover:opacity-90" : ""
            }`}
          >
            {allWorking ? "Continue to Interview Setup" : "Go to Setup Anyway"}
          </Link>
          <Link href={ROUTES.HOME} className="btn-secondary flex-1 min-h-[48px] inline-flex items-center justify-center">
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import * as blazeface from "@tensorflow-models/blazeface";
import "@tensorflow/tfjs";

export interface FaceBox {
  left: number;
  top: number;
  width: number;
  height: number;
  landmarks?: [number, number][];
}

interface FaceDetectionOverlayProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isActive: boolean;
  onFaceDetected?: (detected: boolean) => void;
}

export function FaceDetectionOverlay({ videoRef, isActive, onFaceDetected }: FaceDetectionOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [faceBox, setFaceBox] = useState<FaceBox | null>(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const animationRef = useRef<number | null>(null);
  const modelRef = useRef<blazeface.BlazeFaceModel | null>(null);

  useEffect(() => {
    if (!isActive) return;

    let mounted = true;

    const loadModel = async () => {
      try {
        const model = await blazeface.load();
        if (mounted) {
          modelRef.current = model;
          setModelLoaded(true);
        } else {
          model.dispose();
        }
      } catch (err) {
        console.error("Failed to load face detection model:", err);
      }
    };

    loadModel();

    return () => {
      mounted = false;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      modelRef.current?.dispose();
    };
  }, [isActive]);

  useEffect(() => {
    if (!isActive || !modelLoaded || !videoRef.current || !containerRef.current || !modelRef.current) {
      setFaceBox(null);
      onFaceDetected?.(false);
      return;
    }

    const video = videoRef.current;

    const getConfidence = (probability: unknown): number => {
      if (typeof probability === "number") {
        return probability;
      }

      if (Array.isArray(probability) && typeof probability[0] === "number") {
        return probability[0];
      }

      if (ArrayBuffer.isView(probability)) {
        const value = (probability as unknown as ArrayLike<number>)[0];
        return typeof value === "number" ? value : 0;
      }

      return 0;
    };

    const getPoint = (point: unknown): [number, number] => {
      if (Array.isArray(point) && typeof point[0] === "number" && typeof point[1] === "number") {
        return [point[0], point[1]];
      }

      if (ArrayBuffer.isView(point)) {
        const typedPoint = point as unknown as ArrayLike<number>;
        const x = typedPoint[0];
        const y = typedPoint[1];
        if (typeof x === "number" && typeof y === "number") {
          return [x, y];
        }
      }

      return [0, 0];
    };

    const detect = async () => {
      try {
        if (!video || !modelRef.current || video.readyState < 2 || video.videoWidth === 0 || video.videoHeight === 0) {
          setFaceBox(null);
          onFaceDetected?.(false);
          return;
        }

        const predictions = await modelRef.current.estimateFaces(video, false, true);

        if (predictions.length > 0) {
          const face = predictions[0];
          const topLeft = getPoint(face.topLeft);
          const bottomRight = getPoint(face.bottomRight);
          const confidence = getConfidence(face.probability);

          if (confidence < 0.3) {
            setFaceBox(null);
            onFaceDetected?.(false);
            return;
          }

          const videoRect = video.getBoundingClientRect();
          const videoWidth = video.videoWidth;
          const videoHeight = video.videoHeight;

          // Map video coords to display (object-cover: scale and offset)
          const scale = Math.max(videoRect.width / videoWidth, videoRect.height / videoHeight);
          const offsetX = (videoWidth - videoRect.width / scale) / 2;
          const offsetY = (videoHeight - videoRect.height / scale) / 2;

          const transform = (x: number, y: number) => ({
            x: (x - offsetX) * scale,
            y: (y - offsetY) * scale,
          });

          const left = (topLeft[0] - offsetX) * scale;
          const top = (topLeft[1] - offsetY) * scale;
          let width = (bottomRight[0] - topLeft[0]) * scale;
          let height = (bottomRight[1] - topLeft[1]) * scale;

          // Reject degenerate/small boxes - prevents green bar glitch when face partially obscured
          const minSize = 40;
          if (
            width < minSize ||
            height < minSize ||
            width <= 0 ||
            height <= 0 ||
            width > videoRect.width * 1.5 ||
            height > videoRect.height * 1.5
          ) {
            setFaceBox(null);
            onFaceDetected?.(false);
            return;
          }

          // Transform landmarks to display coordinates
          let landmarks: [number, number][] | undefined;
          if (face.landmarks && Array.isArray(face.landmarks)) {
            landmarks = face.landmarks.map((lm) => {
              const p = transform(lm[0], lm[1]);
              return [p.x, p.y];
            });
          }

          setFaceBox({
            left: Math.max(0, left),
            top: Math.max(0, top),
            width,
            height,
            landmarks,
          });
          onFaceDetected?.(true);
        } else {
          setFaceBox(null);
          onFaceDetected?.(false);
        }
      } catch {
        setFaceBox(null);
        onFaceDetected?.(false);
      } finally {
        animationRef.current = requestAnimationFrame(detect);
      }
    };

    const rafId = requestAnimationFrame(detect);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      cancelAnimationFrame(rafId);
    };
  }, [isActive, modelLoaded, onFaceDetected, videoRef]);

  if (!isActive) return null;

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {faceBox && (
        <div
          className="absolute box-border transition-all duration-150"
          style={{
            left: faceBox.left,
            top: faceBox.top,
            width: faceBox.width,
            height: faceBox.height,
          }}
        >
          {/* Face_Identification_GUI style: green hollow square box */}
          {/* Outer shadow rectangle - darker green, thicker, extends 2px beyond (like cv2.rectangle shadow) */}
          <div
            className="absolute rounded-none border-[3px] border-[rgb(0,180,70)]"
            style={{
              left: -2,
              top: -2,
              right: -2,
              bottom: -2,
            }}
          />
          {/* Inner main rectangle - bright green hollow box (like cv2.rectangle thickness 2) */}
          <div className="absolute inset-0 rounded-none border-2 border-[rgb(0,255,100)]" />
        </div>
      )}
      {!faceBox && modelLoaded && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-amber-500/90 text-black text-xs font-medium px-3 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
          Position your face in frame
        </div>
      )}
    </div>
  );
}

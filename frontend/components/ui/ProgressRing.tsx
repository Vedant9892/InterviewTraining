"use client";

import { useEffect, useState } from "react";

interface ProgressRingProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  showValue?: boolean;
}

export function ProgressRing({
  value,
  size = 80,
  strokeWidth = 6,
  label,
  showValue = true,
}: ProgressRingProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setDisplayValue(value), 100);
    return () => clearTimeout(timer);
  }, [value]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (displayValue / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(148, 163, 184, 0.1)"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgb(59, 130, 246)"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: "stroke-dashoffset 1s ease-in-out",
            }}
          />
        </svg>

        {showValue && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-semibold text-white">
              {Math.round(displayValue)}
            </span>
          </div>
        )}
      </div>

      {label && (
        <p className="mt-2 text-xs text-[var(--text-secondary)]">{label}</p>
      )}
    </div>
  );
}

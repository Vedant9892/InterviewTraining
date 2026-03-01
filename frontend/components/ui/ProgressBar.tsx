"use client";

interface ProgressBarProps {
  value: number;
  label?: string;
  showValue?: boolean;
  height?: "sm" | "md" | "lg";
  color?: "primary" | "success" | "warning";
}

export function ProgressBar({
  value,
  label,
  showValue = true,
  height = "md",
  color = "primary",
}: ProgressBarProps) {
  const heights = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  };

  const colors = {
    primary: "bg-blue-500",
    success: "bg-green-500",
    warning: "bg-amber-500",
  };

  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <span className="text-sm text-[var(--text-secondary)]">{label}</span>
          )}
          {showValue && (
            <span className="text-sm font-medium text-white">{value}%</span>
          )}
        </div>
      )}
      <div
        className={`w-full ${heights[height]} bg-[var(--bg-elevated)] rounded-full overflow-hidden`}
      >
        <div
          className={`${heights[height]} ${colors[color]} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

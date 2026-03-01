"use client";

interface StatusBadgeProps {
  status: "active" | "ready" | "recording" | "completed" | "inactive";
  label?: string;
  size?: "sm" | "md";
}

export function StatusBadge({ status, label, size = "md" }: StatusBadgeProps) {
  const statusConfig = {
    active: {
      bg: "bg-green-500/10",
      text: "text-green-400",
      dot: "bg-green-400",
    },
    ready: {
      bg: "bg-blue-500/10",
      text: "text-blue-400",
      dot: "bg-blue-400",
    },
    recording: {
      bg: "bg-red-500/10",
      text: "text-red-400",
      dot: "bg-red-400 pulse-subtle",
    },
    completed: {
      bg: "bg-purple-500/10",
      text: "text-purple-400",
      dot: "bg-purple-400",
    },
    inactive: {
      bg: "bg-gray-500/10",
      text: "text-gray-400",
      dot: "bg-gray-400",
    },
  };

  const config = statusConfig[status];
  const padding = size === "sm" ? "px-2 py-1" : "px-3 py-1.5";
  const textSize = size === "sm" ? "text-xs" : "text-sm";

  return (
    <div
      className={`inline-flex items-center space-x-2 ${config.bg} ${padding} rounded-full`}
    >
      <div className={`w-2 h-2 rounded-full ${config.dot}`} />
      {label && (
        <span className={`${textSize} font-medium ${config.text}`}>{label}</span>
      )}
    </div>
  );
}

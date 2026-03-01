"use client";

import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  title?: string;
  className?: string;
  hover?: boolean;
}

export function Card({
  children,
  title,
  className = "",
  hover = true,
}: CardProps) {
  return (
    <div
      className={`card p-6 ${hover ? "" : "hover:border-[var(--border-subtle)]"} ${className}`}
    >
      {title && (
        <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      )}
      {children}
    </div>
  );
}

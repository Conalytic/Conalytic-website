"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { type ComponentPropsWithoutRef } from "react";

interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const variantClasses = {
  primary:
    "bg-[#6B5FF8] text-white hover:bg-[#5a43f0] shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 active:scale-[0.98]",
  secondary:
    "bg-white/10 text-white hover:bg-white/15 border border-white/10 backdrop-blur-sm active:scale-[0.98]",
  outline:
    "border border-[#6B5FF8] text-[#6B5FF8] hover:bg-[#6B5FF8] hover:text-white active:scale-[0.98]",
  ghost:
    "text-white/70 hover:text-white hover:bg-white/5 active:scale-[0.98]",
};

const sizeClasses = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-2.5 text-sm rounded-xl",
  lg: "px-8 py-3.5 text-base rounded-xl",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  external,
  className,
  children,
  onClick,
  type = "button",
  disabled,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 cursor-pointer",
    variantClasses[variant],
    sizeClasses[size],
    disabled && "opacity-50 cursor-not-allowed pointer-events-none",
    className
  );

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}

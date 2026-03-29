import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "outline" | "success";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
        variant === "default" && "bg-[#6B5FF8]/15 text-[#a78bfa] border border-[#6B5FF8]/25",
        variant === "outline" && "border border-white/20 text-white/70",
        variant === "success" && "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25",
        className
      )}
    >
      {children}
    </span>
  );
}

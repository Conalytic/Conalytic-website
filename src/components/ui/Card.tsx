/** Presentational card surface with optional hover lift. */
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl p-6",
        "glass-card",
        hover && "transition-all duration-300 hover:border-brand-500/30 hover:-translate-y-1",
        className
      )}
    >
      {children}
    </div>
  );
}

interface StatCardProps {
  value: string;
  label: string;
  suffix?: string;
}

export function StatCard({ value, label, suffix }: StatCardProps) {
  return (
    <div className="text-center">
      <div className="text-4xl font-bold gradient-text mb-1">
        {value}
        {suffix && <span className="text-2xl">{suffix}</span>}
      </div>
      <div className="text-navy-900/50 dark:text-white/50 text-sm">{label}</div>
    </div>
  );
}

"use client";

/** Compact horizontal stat strip (used inside some marketing layouts). */
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

const STATS: Stat[] = [
  { value: 10000, suffix: "+", label: "Queries answered daily" },
  { value: 95, suffix: "%", label: "Customer satisfaction" },
  { value: 3, prefix: "<", suffix: "s", label: "Average response time" },
  { value: 500, suffix: "+", label: "Companies trust Conalytic" },
];

function useCountUp(target: number, duration = 1800, started: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, started]);

  return count;
}

function StatItem({ stat, started }: { stat: Stat; started: boolean }) {
  const count = useCountUp(stat.value, 1800, started);

  const display =
    count >= 1000 ? (count / 1000).toFixed(count % 1000 === 0 ? 0 : 1) + "k" : count.toString();

  return (
    <div className="text-center px-8 py-2">
      <div className="text-4xl font-bold gradient-text mb-1">
        {stat.prefix}
        {display}
        {stat.suffix}
      </div>
      <div className="text-sm text-navy-900/50 dark:text-white/50 font-medium">{stat.label}</div>
    </div>
  );
}

interface StatsBarProps {
  className?: string;
}

export function StatsBar({ className }: StatsBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className={cn("py-16 relative overflow-hidden", className)}>
      {/* Decorative glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" />

      <div className="max-w-5xl mx-auto px-4">
        <div
          className={cn(
            "glass-card rounded-3xl",
            "divide-y md:divide-y-0 md:divide-x divide-white/8",
            "grid grid-cols-1 md:grid-cols-4"
          )}
        >
          {STATS.map((stat) => (
            <StatItem key={stat.label} stat={stat} started={started} />
          ))}
        </div>
      </div>
    </section>
  );
}

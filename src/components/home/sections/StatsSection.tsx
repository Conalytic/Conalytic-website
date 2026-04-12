"use client";

/** Animated stat counters for social proof on the home page. */
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { staggerContainer, fadeUpChild, viewportOnce } from "@/lib/motion";

const STATS = [
  { end: 2000, suffix: "+",  label: "teams using Conalytic", decimal: false },
  { end: 10,   suffix: "M+", label: "queries answered",      decimal: false },
  { end: 94,   suffix: "%",  label: "faster than manual reports", decimal: false },
  { end: 4.9,  suffix: "★",  label: "average customer rating",   decimal: true  },
];

function StatItem({ end, suffix, label, decimal, active }: {
  end: number; suffix: string; label: string; decimal: boolean; active: boolean;
}) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!active) return;
    const duration = 1800;
    const startTime = performance.now();
    const frame = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(eased * end);
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, [active, end]);

  const display = decimal ? val.toFixed(1) : Math.floor(val).toLocaleString();

  return (
    <div className="flex flex-col items-center text-center px-6">
      <p className="text-5xl sm:text-6xl font-black tabular-nums text-gray-900 dark:text-white mb-2">
        {display}{suffix}
      </p>
      <p className="text-sm text-gray-500 dark:text-white/62 max-w-[120px] leading-snug">{label}</p>
    </div>
  );
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setActive(true); io.disconnect(); } },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="py-10 md:py-20 px-4 border-y border-gray-100 dark:border-white/[0.05] bg-white dark:bg-[#0E0E14]">
      <motion.div
        ref={ref}
        className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 divide-x divide-gray-100 dark:divide-white/[0.06]"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        {STATS.map((s) => (
          <motion.div key={s.label} variants={fadeUpChild} className="flex justify-center">
            <StatItem {...s} active={active} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

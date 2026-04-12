"use client";

/**
 * Subtle route transition — template remounts per navigation so `initial` runs each time.
 */
import { motion } from "framer-motion";
import { SAAS_EASE } from "@/lib/motion";

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: SAAS_EASE }}
      className="min-h-0 w-full flex-1"
    >
      {children}
    </motion.div>
  );
}

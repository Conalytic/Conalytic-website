"use client";

/**
 * Respects OS “Reduce motion” — Framer animations shorten or disable automatically.
 */
import { MotionConfig } from "framer-motion";

export function MotionConfigProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

function useAmbientLite(particles: "default" | "always") {
  const [lite, setLite] = useState(true);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const narrow = window.matchMedia("(max-width: 768px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setLite(true);
      return;
    }
    if (particles === "always") {
      setLite(false);
      return;
    }
    setLite(coarse || narrow);
  }, [particles]);

  return lite;
}

function themeParticleColors() {
  const isDark = document.documentElement.classList.contains("dark");
  return isDark
    ? { line: (a: number) => `rgba(148, 163, 184, ${a})`, node: "rgba(203, 213, 225, 0.48)" }
    : { line: (a: number) => `rgba(100, 116, 139, ${a})`, node: "rgba(100, 116, 139, 0.45)" };
}

type AmbientCanvasMode = "mesh" | "dots";

/** Local particle canvas — mesh (dots + lines) or dots-only. */
function AmbientCanvas({
  className,
  mode = "mesh",
}: {
  className?: string;
  mode?: AmbientCanvasMode;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let colors = themeParticleColors();
    const dotsOnly = mode === "dots";

    const nodes = Array.from({ length: dotsOnly ? 48 : 42 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * (dotsOnly ? 0.00028 : 0.00035),
      vy: (Math.random() - 0.5) * (dotsOnly ? 0.00028 : 0.00035),
      r: dotsOnly ? 1 + Math.random() * 2.4 : 1.2 + Math.random() * 2.2,
    }));

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = w * devicePixelRatio;
      canvas.height = h * devicePixelRatio;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };

    const observer = new MutationObserver(() => {
      colors = themeParticleColors();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > 1) n.vx *= -1;
        if (n.y < 0 || n.y > 1) n.vy *= -1;
      }

      if (!dotsOnly) {
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const a = nodes[i];
            const b = nodes[j];
            const dx = (a.x - b.x) * w;
            const dy = (a.y - b.y) * h;
            const dist = Math.hypot(dx, dy);
            if (dist < 140) {
              const alpha = (1 - dist / 140) * 0.14;
              ctx.strokeStyle = colors.line(alpha);
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(a.x * w, a.y * h);
              ctx.lineTo(b.x * w, b.y * h);
              ctx.stroke();
            }
          }
        }
      }

      for (const n of nodes) {
        if (dotsOnly) {
          ctx.fillStyle = `rgba(255, 255, 255, ${0.22 + (n.r / 3.4) * 0.35})`;
        } else {
          ctx.fillStyle = colors.node;
        }
        ctx.beginPath();
        ctx.arc(n.x * w, n.y * h, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, [mode]);

  return <canvas ref={ref} className={cn("pointer-events-none absolute inset-0", className)} aria-hidden />;
}

/** White floating dots only — for dark inset panels (no grid, no connector lines). */
export function AmbientDotCanvas({ className }: { className?: string }) {
  return <AmbientCanvas mode="dots" className={className} />;
}

export function BrandAmbient({
  variant = "hero",
  className,
  particles = "default",
}: {
  variant?: "hero" | "subtle" | "footer" | "particles";
  className?: string;
  /** When `always`, show particle mesh on mobile (still respects reduced motion). */
  particles?: "default" | "always";
}) {
  const lite = useAmbientLite(particles);

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      {variant === "particles" && !lite ? <AmbientCanvas /> : null}
      {variant === "hero" && (
        <>
          <div className="ambient-orb ambient-orb-a opacity-80" />
          <div className="ambient-orb ambient-orb-b opacity-70" />
          {!lite ? <div className="ambient-mesh opacity-60" /> : null}
          {!lite ? <AmbientCanvas /> : null}
        </>
      )}
      {variant === "subtle" && (
        <>
          <div className="ambient-orb ambient-orb-c opacity-50" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,var(--ambient-orb-a),transparent_60%)]" />
        </>
      )}
      {variant === "footer" && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_20%_100%,var(--ambient-orb-b),transparent_65%)]" />
      )}
      {variant !== "particles" ? <div className="ambient-grid absolute inset-0 opacity-60" /> : null}
    </div>
  );
}

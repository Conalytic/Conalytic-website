"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** Full-viewport particle mesh — ink + lime network. */
function ParticleMesh() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let w = 0;
    let h = 0;

    const count = reduced ? 18 : 56;
    const nodes = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00028,
      vy: (Math.random() - 0.5) * 0.00028,
      r: 0.8 + Math.random() * 1.8,
      pulse: Math.random() * Math.PI * 2,
    }));

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * devicePixelRatio;
      canvas.height = h * devicePixelRatio;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };

    let isDark = document.documentElement.classList.contains("dark");

    const observer = new MutationObserver(() => {
      isDark = document.documentElement.classList.contains("dark");
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      if (!reduced) {
        for (const n of nodes) {
          n.x += n.vx;
          n.y += n.vy;
          n.pulse += 0.02;
          if (n.x < 0 || n.x > 1) n.vx *= -1;
          if (n.y < 0 || n.y > 1) n.vy *= -1;
        }

        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const a = nodes[i];
            const b = nodes[j];
            const dx = (a.x - b.x) * w;
            const dy = (a.y - b.y) * h;
            const dist = Math.hypot(dx, dy);
            if (dist < 160) {
              const alpha = (1 - dist / 160) * 0.1;
              ctx.strokeStyle = isDark
                ? `rgba(201, 255, 51, ${alpha})`
                : `rgba(95, 143, 0, ${alpha})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(a.x * w, a.y * h);
              ctx.lineTo(b.x * w, b.y * h);
              ctx.stroke();
            }
          }
        }

        for (const n of nodes) {
          const glow = 0.35 + Math.sin(n.pulse) * 0.15;
          ctx.fillStyle = isDark
            ? `rgba(201, 255, 51, ${glow})`
            : `rgba(95, 143, 0, ${glow * 0.85})`;
          ctx.beginPath();
          ctx.arc(n.x * w, n.y * h, n.r, 0, Math.PI * 2);
          ctx.fill();
        }
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
  }, []);

  return <canvas ref={ref} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden />;
}

/** Cursor-following lime spotlight (desktop only). */
function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) return;

    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const tick = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      el.style.transform = `translate(${x - 280}px, ${y - 280}px)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed left-0 top-0 z-0 h-[560px] w-[560px] rounded-full opacity-60 transition-opacity duration-500 lg:opacity-50"
      style={{
        background:
          "radial-gradient(circle, var(--ambient-spotlight) 0%, transparent 70%)",
      }}
      aria-hidden
    />
  );
}

/**
 * Fixed site-wide ambient layer — aurora orbs, grid, grain, particles.
 * Mounted once in SiteChrome so every marketing page inherits motion.
 */
export function PageAmbient({ className }: { className?: string }) {
  return (
    <div
      className={cn("pointer-events-none fixed inset-0 z-0 overflow-hidden", className)}
      aria-hidden
    >
      {/* Animated aurora blobs */}
      <div className="ambient-orb ambient-orb-a" />
      <div className="ambient-orb ambient-orb-b" />
      <div className="ambient-orb ambient-orb-c" />

      {/* Slow gradient mesh shift */}
      <div className="ambient-mesh" />

      {/* Particle network */}
      <ParticleMesh />

      {/* Cursor spotlight */}
      <CursorSpotlight />

      {/* Subtle grid */}
      <div className="ambient-grid absolute inset-0" />

      {/* Film grain */}
      <div className="ambient-grain absolute inset-0" />

      {/* Top vignette for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#f5f6f9]/70 dark:to-[#0f0f0f]/60" />
    </div>
  );
}

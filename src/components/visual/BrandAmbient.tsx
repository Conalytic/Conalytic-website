"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** Local particle mesh for hero sections. */
function AmbientCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;

    const nodes = Array.from({ length: 42 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00035,
      vy: (Math.random() - 0.5) * 0.00035,
      r: 1.2 + Math.random() * 2.2,
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

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
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
          if (dist < 140) {
            const alpha = (1 - dist / 140) * 0.14;
            ctx.strokeStyle = `rgba(201, 255, 51, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x * w, a.y * h);
            ctx.lineTo(b.x * w, b.y * h);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        ctx.fillStyle = "rgba(201, 255, 51, 0.55)";
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
    };
  }, []);

  return <canvas ref={ref} className={cn("pointer-events-none absolute inset-0", className)} aria-hidden />;
}

export function BrandAmbient({
  variant = "hero",
  className,
}: {
  variant?: "hero" | "subtle" | "footer";
  className?: string;
}) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      {variant === "hero" && (
        <>
          <div className="ambient-orb ambient-orb-a opacity-80" />
          <div className="ambient-orb ambient-orb-b opacity-70" />
          <div className="ambient-mesh opacity-60" />
          <AmbientCanvas />
        </>
      )}
      {variant === "subtle" && (
        <>
          <div className="ambient-orb ambient-orb-c opacity-50" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(201,255,51,0.08),transparent_60%)]" />
        </>
      )}
      {variant === "footer" && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_20%_100%,rgba(201,255,51,0.06),transparent_65%)]" />
      )}
      <div className="ambient-grid absolute inset-0 opacity-60" />
    </div>
  );
}

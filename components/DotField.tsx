"use client";

import { useEffect, useRef } from "react";

const GAP = 22;
const RADIUS = 170; // cursor influence radius (px)
const PULL = 4; // max shift toward the cursor (px)
const BASE = [196, 196, 204]; // resting dot color
const HOT = [82, 82, 91]; // dot color right under the cursor

/** Grid of dots that darken and lean slightly toward the cursor, staying anchored to the grid. */
export default function DotField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0;
    const target = { x: -9999, y: -9999 };
    const cur = { x: -9999, y: -9999 };
    let strength = 0, targetStrength = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let y = GAP / 2; y < h + GAP; y += GAP) {
        for (let x = GAP / 2; x < w + GAP; x += GAP) {
          const dx = cur.x - x, dy = cur.y - y;
          const d = Math.hypot(dx, dy);
          const t = d < RADIUS ? (1 - d / RADIUS) ** 2 * strength : 0;
          const px = d > 0 ? x + (dx / d) * PULL * t : x;
          const py = d > 0 ? y + (dy / d) * PULL * t : y;
          const c = BASE.map((b, i) => Math.round(b + (HOT[i] - b) * t));
          ctx.fillStyle = `rgb(${c[0]},${c[1]},${c[2]})`;
          ctx.beginPath();
          ctx.arc(px, py, 1.1 + 0.6 * t, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const tick = () => {
      cur.x += (target.x - cur.x) * 0.15;
      cur.y += (target.y - cur.y) * 0.15;
      strength += (targetStrength - strength) * 0.1;
      draw();
      const settled = Math.abs(target.x - cur.x) < 0.3 && Math.abs(target.y - cur.y) < 0.3 && Math.abs(targetStrength - strength) < 0.01;
      raf = settled ? 0 : requestAnimationFrame(tick);
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (strength < 0.01) { cur.x = e.clientX; cur.y = e.clientY; }
      target.x = e.clientX;
      target.y = e.clientY;
      targetStrength = 1;
      kick();
    };
    const onLeave = () => { targetStrength = 0; kick(); };

    resize();
    window.addEventListener("resize", resize);
    if (!still) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);
      window.addEventListener("blur", onLeave);
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, []);

  return <canvas ref={ref} className="dot-canvas" aria-hidden />;
}

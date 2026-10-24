"use client";

import { useEffect, useRef } from "react";

const GAP = 22;
const RADIUS = 520; // cursor influence radius (px)
const PULL = 4; // max shift toward the cursor (px)
const BASE = [190, 190, 202]; // resting dot color
const DOT_R = 1; // resting dot radius (px)
const HOT = [140, 140, 150]; // dot color right under the cursor
const TRAIL_R = 90; // trail width (px)
const TRAIL_LIFE = 900; // ms a trail point lasts
const TRAIL_MAX = 0.55; // max tint strength, kept faint
// newest → oldest: teal → blue → purple
const TRAIL_COLORS = [[20, 184, 166], [59, 130, 246], [139, 92, 246]];
const trailColor = (a: number) => {
  const f = a * 2, i = Math.min(1, Math.floor(f)), k = f - i;
  return TRAIL_COLORS[i].map((c, j) => c + (TRAIL_COLORS[i + 1][j] - c) * k);
};

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
    let trail: { x: number; y: number; t: number }[] = [];

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
      const now = performance.now();
      trail = trail.filter((p) => now - p.t < TRAIL_LIFE);
      ctx.clearRect(0, 0, w, h);
      if (strength < 0.01 && trail.length === 0) {
        // Resting state: one path, one fill. Much cheaper than per-dot colour maths.
        ctx.fillStyle = `rgb(${BASE[0]},${BASE[1]},${BASE[2]})`;
        ctx.beginPath();
        for (let y = GAP / 2; y < h + GAP; y += GAP) {
          for (let x = GAP / 2; x < w + GAP; x += GAP) {
            ctx.moveTo(x + DOT_R, y);
            ctx.arc(x, y, DOT_R, 0, Math.PI * 2);
          }
        }
        ctx.fill();
        return;
      }
      for (let y = GAP / 2; y < h + GAP; y += GAP) {
        for (let x = GAP / 2; x < w + GAP; x += GAP) {
          const dx = cur.x - x, dy = cur.y - y;
          const d = Math.hypot(dx, dy);
          const t = d < RADIUS ? (1 - d / RADIUS) ** 2 * strength : 0;
          const px = d > 0 ? x + (dx / d) * PULL * t : x;
          const py = d > 0 ? y + (dy / d) * PULL * t : y;
          let c = BASE.map((b, i) => b + (HOT[i] - b) * t);
          let best = 0, bestAge = 0;
          for (const p of trail) {
            const td = Math.hypot(p.x - x, p.y - y);
            if (td >= TRAIL_R) continue;
            const age = (now - p.t) / TRAIL_LIFE;
            const v = (1 - td / TRAIL_R) ** 2 * (1 - age);
            if (v > best) { best = v; bestAge = age; }
          }
          if (best > 0) {
            const tc = trailColor(bestAge), k = best * TRAIL_MAX;
            c = c.map((v, i) => v + (tc[i] - v) * k);
          }
          c = c.map(Math.round);
          ctx.fillStyle = `rgb(${c[0]},${c[1]},${c[2]})`;
          ctx.beginPath();
          ctx.arc(px, py, DOT_R + 0.4 * t, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const tick = () => {
      cur.x += (target.x - cur.x) * 0.15;
      cur.y += (target.y - cur.y) * 0.15;
      strength += (targetStrength - strength) * 0.1;
      draw();
      const settled = Math.abs(target.x - cur.x) < 0.3 && Math.abs(target.y - cur.y) < 0.3 && Math.abs(targetStrength - strength) < 0.01 && trail.length === 0;
      raf = settled ? 0 : requestAnimationFrame(tick);
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (strength < 0.01) { cur.x = e.clientX; cur.y = e.clientY; }
      target.x = e.clientX;
      target.y = e.clientY;
      const last = trail[trail.length - 1];
      if (!last || Math.hypot(last.x - e.clientX, last.y - e.clientY) > 12) trail.push({ x: e.clientX, y: e.clientY, t: performance.now() });
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

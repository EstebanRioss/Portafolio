import { useEffect, useRef } from "react";
import { utils } from "animejs";
import { prefersReducedMotion, isCoarsePointer } from "./useAnime";

/**
 * Interactive constellation canvas: slowly drifting particles connected by
 * faint red lines that also link to the cursor, creating a "network" ambience
 * behind the whole portfolio.
 */
export default function ConstellationBackground({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduce = prefersReducedMotion();
    const coarse = isCoarsePointer();

    let w = 0;
    let h = 0;
    let raf = 0;
    let mouse = { x: -9999, y: -9999 };
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const count = coarse ? 32 : 62;
    const LINK_DIST = 130;
    const MOUSE_DIST = 200;
    const particles = [];

    const rand = (a, b) => utils.random(a, b);

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      particles.length = 0;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: rand(0, w),
          y: rand(0, h),
          vx: rand(-0.16, 0.16),
          vy: rand(-0.16, 0.16),
          r: rand(1, 2.1),
          o: rand(0.25, 0.75),
        });
      }
    };

    const step = () => {
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10 || p.x > w + 10) p.vx *= -1;
        if (p.y < -10 || p.y > h + 10) p.vy *= -1;
      }

      const links = (a, b, alphaBase) => {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 >= LINK_DIST * LINK_DIST) return;
        const d = Math.sqrt(d2);
        const alpha = (1 - d / LINK_DIST) * alphaBase;
        ctx.strokeStyle = `rgba(248,113,113,${alpha.toFixed(3)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      };

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          links(particles[i], particles[j], 0.18);
        }
      }

      if (mouse) {
        for (const p of particles) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < MOUSE_DIST * MOUSE_DIST && mouse.x > 0) {
            const d = Math.sqrt(d2);
            const alpha = (1 - d / MOUSE_DIST) * 0.45;
            ctx.strokeStyle = `rgba(239,68,68,${alpha.toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        ctx.fillStyle = `rgba(253,164,175,${p.o.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (mouse && mouse.x > 0) {
        const pulse = Math.max(0, 1 - Math.min(1, distanceToMouse(mouse)));
        const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 70);
        grad.addColorStop(0, `rgba(220,38,38,${0.10 * (0.4 + pulse * 0.6)})`);
        grad.addColorStop(1, "rgba(220,38,38,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(mouse.x - 70, mouse.y - 70, 140, 140);
      }

      if (!reduce) raf = requestAnimationFrame(step);
    };

    const distanceToMouse = (m) =>
      Math.min(...particles.map((p) => Math.hypot(p.x - m.x, p.y - m.y)));

    const onMouseMove = (e) => {
      mouse = { x: e.clientX, y: e.clientY };
    };
    const onMouseLeave = () => {
      mouse = { x: -9999, y: -9999 };
    };
    const onResize = () => {
      resize();
      seed();
      if (reduce) step();
    };

    resize();
    seed();
    if (reduce) {
      step();
    } else {
      raf = requestAnimationFrame(step);
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 -z-10 opacity-90 ${className}`}
    />
  );
}
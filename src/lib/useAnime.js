import { useEffect, useRef } from "react";
import { animate, stagger, createTimeline } from "animejs";

export function prefersReducedMotion() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isCoarsePointer() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(pointer: coarse)").matches;
}

/**
 * Scroll-triggered stagger reveal for the direct children of `ref`.
 * Children live with opacity:0 (see `.reveal-group > *` in index.css) until the
 * container scrolls into view, then they animate in with an anime.js stagger.
 * After the reveal the inline transform is released so 3D tilt (`.tilt-3d`)
 * keeps working.
 */
export function useRevealChildren(ref, options = {}, deps = []) {
  const {
    axis = "y",
    distance = 42,
    start = 0,
    staggerDelay = 70,
    duration = 720,
    ease = "outExpo",
  } = options;

  const optsRef = useRef({ axis, distance, start, staggerDelay, duration, ease });
  useEffect(() => {
    optsRef.current = { axis, distance, start, staggerDelay, duration, ease };
  }, [axis, distance, start, staggerDelay, duration, ease]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = optsRef.current;
    let targets = Array.from(el.children);

    if (prefersReducedMotion()) {
      targets.forEach((child) => {
        child.style.opacity = "1";
      });
      return;
    }

    const run = () => {
      animate(targets, {
        opacity: [0, 1],
        [o.axis === "x" ? "translateX" : "translateY"]: [o.distance, 0],
        duration: o.duration,
        delay: stagger(o.staggerDelay, { start: o.start }),
        ease: o.ease,
        onComplete: () => {
          targets.forEach((child) => {
            child.style.transform = "";
            child.style.willChange = "";
          });
        },
      });
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          run();
          io.disconnect();
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, ...deps]);
}

/**
 * 3D tilt-on-hover. Pointer position maps to CSS vars --rx / --ry which are
 * consumed by `.tilt-3d`, and anime.js springs the card back when the pointer
 * leaves.
 */
export function useTilt(ref, { max = 9 } = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || isCoarsePointer()) return;

    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      el.style.setProperty("--ry", `${((px - 0.5) * 2 * max).toFixed(2)}deg`);
      el.style.setProperty("--rx", `${((0.5 - py) * 2 * max).toFixed(2)}deg`);
    };

    const onLeave = () => {
      animate(el, {
        "--rx": "0deg",
        "--ry": "0deg",
        duration: 950,
        ease: "outElastic(1, 0.55)",
      });
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave, { passive: true });
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [ref, max]);
}

/**
 * Magnetic hover effect — the element is gently pulled towards the cursor and
 * springs back with an anime.js elastic ease when the pointer leaves.
 */
export function useMagnetic(ref, { strength = 0.4 } = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || isCoarsePointer()) return;

    let tx = 0;
    let ty = 0;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = (e.clientX - rect.left - rect.width / 2) * strength;
      const cy = (e.clientY - rect.top - rect.height / 2) * strength;
      tx += (cx - tx) * 0.3;
      ty += (cy - ty) * 0.3;
      el.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0)`;
    };

    const onLeave = () => {
      tx = 0;
      ty = 0;
      animate(el, {
        translateX: 0,
        translateY: 0,
        duration: 750,
        ease: "outElastic(1, 0.6)",
      });
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave, { passive: true });
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [ref, strength]);
}

/**
 * Animated count-up that fires when the element scrolls into view.
 */
export function useCounter(ref, { value, suffix = "", decimals = 0, duration = 1600 } = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const format = (n) => `${n.toFixed(decimals)}${suffix}`;

    if (prefersReducedMotion()) {
      el.textContent = format(value);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const obj = { n: 0 };
        animate(obj, {
          n: value,
          duration,
          ease: "outExpo",
          onUpdate: () => {
            el.textContent = format(obj.n);
          },
        });
      },
      { threshold: 0.5 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [ref, value, suffix, decimals, duration]);
}

/**
 * Subtle pointer parallax — element drifts relative to the cursor with an
 * anime.js tween each move.
 */
export function useParallax(ref, { factor = 10 } = {}) {
  const anim = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || isCoarsePointer()) return;

    const onMove = (e) => {
      const cx = e.clientX / window.innerWidth - 0.5;
      const cy = e.clientY / window.innerHeight - 0.5;
      if (anim.current) anim.current.pause();
      anim.current = animate(el, {
        translateX: cx * factor,
        translateY: cy * factor,
        duration: 420,
        ease: "outQuad",
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (anim.current) anim.current.pause();
    };
  }, [ref, factor]);
}

/**
 * Letter-by-letter entrance. Every `.hero-letter` inside `ref` is animated in
 * with an anime.js timeline (translation + rotation + opacity stagger).
 */
export function useLetterEntrance(ref, { start = 200, staggerDelay = 34, distance = 64 } = {}) {
  const ran = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const letters = Array.from(el.querySelectorAll(".hero-letter"));
    if (!letters.length) return;

    if (prefersReducedMotion()) {
      letters.forEach((l) => (l.style.opacity = 1));
      return;
    }

    const run = () => {
      if (ran.current) return;
      ran.current = true;
      const tl = createTimeline({ defaults: { ease: "outBack(1.35)" } });
      tl.add(letters, {
        opacity: [0, 1],
        translateY: [distance, 0],
        rotate: [-7, 0],
        duration: 820,
        delay: stagger(staggerDelay, { start }),
      }).play();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) run();
      },
      { threshold: 0.2 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [ref, start, staggerDelay, distance]);
}

/**
 * "Char wave" — a flame-like flicker that follows the cursor across the name
 * letters. Each character pops up and drops back in sequence.
 */
export function useCharWave(ref) {
  const anim = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || isCoarsePointer()) return;
    const spans = Array.from(el.querySelectorAll(".hero-letter"));
    if (!spans.length) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      let best = 0;
      let bestDist = Infinity;
      spans.forEach((s, i) => {
        const sr = s.getBoundingClientRect();
        const d = Math.abs(sr.left - rect.left + sr.width / 2 - mx);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      const range = spans.slice(Math.max(0, best - 2), Math.min(spans.length, best + 3));
      if (anim.current) anim.current.pause();
      anim.current = animate(range, {
        translateY: [{ to: -12, duration: 250 }, { to: 0, duration: 500 }],
        scale: [{ to: 1.18, duration: 250 }, { to: 1, duration: 500 }],
        ease: "outQuad",
      });
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      el.removeEventListener("pointermove", onMove);
      if (anim.current) anim.current.pause();
    };
  }, [ref]);
}

/**
 * Flashy text scramble fired once when `ref` enters the viewport.
 */
export function useScrambleIn(ref, { text, chars = "!<>-_\\/[]{}—=+*^?#____", duration = 900 } = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.textContent = text;
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const obj = { p: 0 };
        animate(obj, {
          p: 1,
          duration,
          ease: "inOutQuad",
          onUpdate: () => {
            const progress = obj.p;
            const revealed = Math.floor(progress * text.length);
            const tail = text
              .slice(revealed)
              .split("")
              .map(() => chars[Math.floor(Math.random() * chars.length)])
              .join("");
            el.textContent = text.slice(0, revealed) + tail;
          },
        });
      },
      { threshold: 0.4 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [ref, text, chars, duration]);
}
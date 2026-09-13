import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import { NAV_LINKS } from "../data/content";
import { prefersReducedMotion } from "../lib/useAnime";

const LABELS = {
  top: "montando el hero…",
  about: "ensamblando «sobre mí»…",
  projects: "construyendo proyectos…",
  stack: "cargando stack…",
  contact: "conectando contacto…",
};

const ROUTE = ["top", ...NAV_LINKS.map((l) => l.href.slice(1))];

export default function PageBuilder() {
  const [built, setBuilt] = useState("top");
  const [done, setDone] = useState(false);
  const pctRef = useRef(null);
  const doneRef = useRef(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 20,
    mass: 0.4,
  });

  const reduce = prefersReducedMotion();

  useMotionValueEvent(progress, "change", (v) => {
    if (pctRef.current) {
      pctRef.current.textContent = `${Math.round(v * 100)}%`;
    }
    const isDone = v >= 0.99;
    if (isDone !== doneRef.current) {
      doneRef.current = isDone;
      setDone(isDone);
    }
  });

  useEffect(() => {
    const els = ROUTE.map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setBuilt(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  if (reduce) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed bottom-24 left-6 z-40 hidden sm:block pointer-events-none"
      aria-hidden="true"
    >
      <div className="flex items-center gap-3 rounded-full border border-white/10 bg-[#0b0b0e]/85 backdrop-blur-xl px-4 py-2.5 shadow-[0_14px_44px_-14px_rgba(0,0,0,0.85)]">
        <span className="flex h-2.5 w-2.5 shrink-0">
          {done ? (
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
          ) : (
            <>
              <span className="absolute inline-flex h-2.5 w-2.5 animate-ping rounded-full bg-red-500 opacity-70" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
            </>
          )}
        </span>
        <div className="flex flex-col leading-tight">
          <span className="text-[9px] uppercase tracking-[0.25em] text-gray-500">
            {done ? "página lista" : "armando página"}
          </span>
          <span className="font-mono text-[11px] text-gray-300">
            {LABELS[built] ?? LABELS.top}{" "}
            <span className="text-red-400 tabular-nums">
              <span ref={pctRef}>0%</span>
            </span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}
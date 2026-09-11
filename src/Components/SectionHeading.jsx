import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { animate, stagger } from "animejs";
import { prefersReducedMotion } from "../lib/useAnime";

function useSectionTitleReveal(ref) {
  const ran = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const letters = Array.from(el.querySelectorAll(".section-title-letter"));
    if (!letters.length) return;

    if (prefersReducedMotion()) {
      letters.forEach((l) => (l.style.opacity = 1));
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || ran.current) return;
        ran.current = true;
        animate(letters, {
          opacity: [0, 1],
          translateY: [24, 0],
          rotate: [6, 0],
          filter: ["blur(6px)", "blur(0px)"],
          duration: 700,
          delay: stagger(26, { start: 60 }),
          ease: "outExpo",
        });
        io.disconnect();
      },
      { threshold: 0.4 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
}

export default function SectionHeading({ kicker, title, description }) {
  const titleRef = useRef(null);
  useSectionTitleReveal(titleRef);
  const reduceMotion = prefersReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mb-14 md:mb-16"
    >
      <div className="flex items-center gap-4 mb-4">
        <span className="hidden sm:block h-px w-12 bg-red-600/60" />
        <p className="text-xs uppercase tracking-[0.35em] text-red-500/90 font-medium">
          {kicker}
        </p>
      </div>

      <h2
        ref={titleRef}
        className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-white"
      >
        {title.split("").map((char, i) => (
          <span
            key={`${char}-${i}`}
            className="section-title-letter inline-block"
            style={{ opacity: reduceMotion ? 1 : 0 }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h2>

      {description && (
        <p className="mt-4 text-gray-400 max-w-2xl text-sm md:text-[15px] leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, ArrowRight, FileDown, Sparkles } from "lucide-react";
import { PROFILE } from "../data/content";
import {
  useLetterEntrance,
  useCharWave,
  useParallax,
  useCounter,
} from "../lib/useAnime";

function useTypewriter(words, typeSpeed = 65, deleteSpeed = 35, holdDelay = 2000) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    let timeout;

    if (!deleting && text === word) {
      timeout = setTimeout(() => setDeleting(true), holdDelay);
    } else if (deleting && text === "") {
      timeout = setTimeout(() => {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      }, 40);
    } else {
      timeout = setTimeout(
        () => setText(word.slice(0, text.length + (deleting ? -1 : 1))),
        deleting ? deleteSpeed : typeSpeed,
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, holdDelay]);

  return text;
}

const LETTERS = (word) => word.split("");

function TerminalCard({ data }) {
  const { prompt, content } = data;
  const lines = [
    { key: "nombre", value: `"${content.nombre}"` },
    { key: "rol", value: `"${content.rol}"` },
    { key: "stack", value: JSON.stringify(content.stack).replace(/"([^"]+)"/g, "'$1'") },
    { key: "foco", value: `"${content.foco}"` },
    { key: "disponible", value: String(content.disponible), prop: true },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative hidden lg:block w-full max-w-md mx-auto"
    >
      <div className="absolute -inset-1 bg-gradient-to-tr from-red-600/40 to-red-900/10 rounded-2xl blur-lg opacity-50" />
      <div className="relative rounded-2xl border border-white/10 bg-black/70 backdrop-blur-sm overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/[0.03]">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-amber-400/80" />
          <span className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-3 text-[11px] font-mono text-gray-400">
            {prompt}: ~
          </span>
        </div>
        <div className="p-5 font-mono text-[13px] leading-7">
          <p className="text-gray-400">
            <span className="text-red-400">$</span> {prompt} --dev
          </p>
          <p className="text-gray-400">{"{"}</p>
          {lines.map((line, i) => (
            <motion.p
              key={line.key}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3 + i * 0.12 }}
              className="pl-4 text-gray-300"
            >
              <span className="text-red-400/90">{line.key}</span>
              <span className="text-gray-500">: </span>
              {line.prop ? (
                <span className="text-green-400">{line.value}</span>
              ) : (
                <span className="text-gray-200">{line.value}</span>
              )}
              {i < lines.length - 1 ? "," : ""}
            </motion.p>
          ))}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9, duration: 0.4 }}
            className="text-gray-400"
          >
            {"}"}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.5 }}
            className="text-gray-500"
          >
            <span className="text-green-400">✓</span> Disponible para nuevos proyectos
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}

function Stat({ stat, delay }) {
  const valueRef = useRef(null);
  const numeric = parseInt(stat.value.replace(/\D/g, ""), 10) || 0;
  const suffix =
    stat.value.replace(/\D/g, "").length === stat.value.length ? "" : stat.value.replace(/[\d,]/g, "");

  useCounter(valueRef, { value: numeric, suffix, duration: 1800 + delay });

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6 + delay * 0.15, duration: 0.7 }}
      className="text-center md:text-left"
    >
      <p className="font-display text-3xl md:text-4xl font-semibold">
        <span ref={valueRef} className="animated-gradient-text">
          {stat.value}
        </span>
      </p>
      <p className="mt-1 text-xs uppercase tracking-widest text-gray-500">
        {stat.label}
      </p>
    </motion.div>
  );
}

export default function Hero() {
  const typed = useTypewriter(PROFILE.roles);
  const nameRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const firstNameLetters = LETTERS(PROFILE.firstName);
  const lastNameLetters = LETTERS(PROFILE.lastName);

  useLetterEntrance(nameRef, { start: 300, staggerDelay: 32, distance: 64 });
  useCharWave(nameRef);
  useParallax(leftRef, { factor: 12 });
  useParallax(rightRef, { factor: -10 });

  return (
    <section
      id="top"
      className="relative pt-32 lg:pt-40 min-h-screen flex flex-col justify-center px-6 md:px-8 text-white overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          <div ref={leftRef} className="relative">
            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-red-600/30 bg-red-600/10 text-[13px] text-red-300"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </span>
              Disponible para proyectos
            </motion.div>

            {/* Name — anime.js staggered letters + char-wave on hover */}
            <h1
              ref={nameRef}
              className="font-display text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] select-none"
            >
              {firstNameLetters.map((char, i) => (
                <span key={`f-${i}`} className="hero-letter text-white">
                  {char}
                </span>
              ))}
              <br />
              <span className="inline-block animated-gradient-text">
                {lastNameLetters.map((char, i) => (
                  <span key={`l-${i}`} className="hero-letter">
                    {char}
                  </span>
                ))}
              </span>
            </h1>

            {/* Role typewriter */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-5 flex items-center gap-1 min-h-[28px]"
            >
              <Sparkles size={16} className="text-red-500 shrink-0" />
              <p className="text-lg md:text-xl text-gray-300">
                {typed}
                <span className="caret ml-0.5 inline-block w-[2px] h-6 bg-red-500 align-middle" />
              </p>
            </motion.div>

            {/* Summary */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.7 }}
              className="mt-6 text-gray-400 leading-relaxed max-w-xl text-sm md:text-[15px]"
            >
              {PROFILE.heroSummary}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15, duration: 0.7 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a
                href="#projects"
                className="sheen group flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-red-600 rounded-full hover:bg-red-700 transition-colors shadow-[0_0_15px_rgba(220,38,38,0.4)]"
              >
                Ver Proyectos
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href={PROFILE.cvUrl}
                download
                className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-gray-300 border border-gray-600 rounded-full hover:text-white hover:border-red-500 hover:bg-white/5 transition-colors"
              >
                <FileDown size={16} />
                Descargar CV
              </a>
              <div className="flex items-center gap-3">
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="text-gray-400 hover:text-white transition-colors p-2.5 hover:bg-white/5 rounded-full"
                >
                  <Github size={18} />
                </a>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-gray-400 hover:text-white transition-colors p-2.5 hover:bg-white/5 rounded-full"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </motion.div>
          </div>

          {/* RIGHT — terminal */}
          <div ref={rightRef}>
            <TerminalCard data={PROFILE.terminal} />
          </div>
        </div>

        {/* STATS — anime.js animated counters */}
        <div className="mt-20 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10 pt-10">
          {PROFILE.stats.map((stat, i) => (
            <Stat key={stat.label} stat={stat} delay={i * 0.12} />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-9 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-gray-500 hover:text-red-400 transition-colors"
      >
        <span className="text-[10px] uppercase tracking-[0.35em]">Scroll</span>
        <span className="w-6 h-10 rounded-full border border-gray-600 flex justify-center pt-2">
          <span className="float-y w-1 h-2 rounded-full bg-red-500" />
        </span>
      </a>
    </section>
  );
}
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { ArrowUp } from "lucide-react";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import About from "./Components/About";
import Projects from "./Components/Projects";
import Stack from "./Components/Stack";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";

const STAR_POSITIONS = [
  { top: "12%", left: "18%" },
  { top: "22%", left: "68%" },
  { top: "30%", left: "38%" },
  { top: "16%", left: "88%" },
  { top: "42%", left: "12%" },
  { top: "58%", left: "82%" },
  { top: "66%", left: "28%" },
  { top: "74%", left: "58%" },
  { top: "82%", left: "14%" },
  { top: "90%", left: "72%" },
  { top: "36%", left: "58%" },
  { top: "62%", left: "44%" },
];

function Background() {
  const stars = useMemo(
    () =>
      STAR_POSITIONS.map((pos, i) => (
        <i key={i} style={{ top: pos.top, left: pos.left, animationDelay: `${(i * 0.7) % 5}s` }} />
      )),
    [],
  );

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-grid" />
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />
      <div className="stars">{stars}</div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
    </div>
  );
}

function CursorGlow() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let x = -9999;
    let y = -9999;

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(loop);
    };

    const loop = () => {
      el.style.transform = `translate3d(${x - 160}px, ${y - 160}px, 0)`;
      raf = 0;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <div ref={ref} className="cursor-glow" />;
}

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setVisible(window.scrollY > 600);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#top"
          aria-label="Volver arriba"
          initial={{ opacity: 0, scale: 0.6, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 12 }}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)] px-4 py-3 hover:bg-red-700 transition-colors"
        >
          <ArrowUp size={16} />
          <span className="hidden sm:inline text-xs font-medium tracking-wide">Arriba</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative min-h-screen text-white font-sans overflow-x-hidden"
      >
        <Background />
        <CursorGlow />

        <Navbar />

        <main>
          <Hero />
          <About />
          <Projects />
          <Stack />
          <Contact />
        </main>

        <Footer />
        <BackToTop />
      </motion.div>
    </MotionConfig>
  );
}

export default App;
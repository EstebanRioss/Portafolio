import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { ArrowUp } from "lucide-react";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import About from "./Components/About";
import Projects from "./Components/Projects";
import Stack from "./Components/Stack";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";

function SectionWrapper({ children }) {
  return <div className="relative z-10">{children}</div>;
}

function Background({ children }) {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Blueprint grid */}
      <div className="absolute inset-0 bg-grid" />

      {/* Glow blobs */}
      <motion.div
        className="absolute -top-40 -left-40 w-[700px] h-[700px] bg-red-600/10 rounded-full blur-[180px]"
        animate={{ x: ["0%", "12%", "0%"], y: ["0%", "8%", "0%"] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[650px] h-[650px] bg-red-500/[0.08] rounded-full blur-[200px]"
        animate={{ x: ["0%", "-12%", "0%"], y: ["0%", "-8%", "0%"] }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] bg-red-900/10 rounded-full blur-[220px]"
        animate={{ opacity: [0.3, 0.55, 0.3], scale: [1, 1.08, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
      {children}
    </div>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => setVisible(latest > 600));

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#top"
          aria-label="Volver arriba"
          initial={{ opacity: 0, scale: 0.6, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 12 }}
          whileHover={{ y: -3 }}
          className="fixed bottom-6 right-6 z-40 group flex items-center gap-2 rounded-full bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.5)] px-4 py-3 hover:bg-red-700 transition-colors"
        >
          <ArrowUp size={16} />
          <span className="hidden sm:inline text-xs font-medium tracking-wide">
            Arriba
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}

function App() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative min-h-screen text-white font-sans overflow-x-hidden"
    >
      <Background />

      <Navbar />

      <main>
        <SectionWrapper>
          <Hero />
        </SectionWrapper>

        <SectionWrapper>
          <About />
        </SectionWrapper>

        <SectionWrapper>
          <Projects />
        </SectionWrapper>

        <SectionWrapper>
          <Stack />
        </SectionWrapper>

        <SectionWrapper>
          <Contact />
        </SectionWrapper>
      </main>

      <SectionWrapper>
        <Footer />
      </SectionWrapper>

      <BackToTop />
    </motion.div>
  );
}

export default App;
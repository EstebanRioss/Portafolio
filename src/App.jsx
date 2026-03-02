import { useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import About from "./Components/About";
import Projects from "./Components/Projects";
import Stack from "./Components/Stack";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import Hero from "./Components/Hero";
import { motion } from "framer-motion";

function SectionWrapper({ children }) {
  return (
    <div className="relative z-10">
      {children}
    </div>
  );
}

function App() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative min-h-screen text-white font-sans overflow-x-hidden "
    >
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-red-600/20 rounded-full blur-[220px]"
        animate={{
          opacity: [0.15, 0.25, 0.15],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* ===== FONDO ANIMADO ===== */}
      <div className="fixed inset-0 -z-10 overflow-hidden">

        {/* Blob 1 */}
        <motion.div
          className="absolute -top-40 -left-40 w-[900px] h-[900px] bg-red-600/15 rounded-full blur-[180px]"
          animate={{
            x: ["0%", "15%", "0%"],
            y: ["0%", "10%", "0%"],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Blob 2 */}
        <motion.div
          className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-red-500/12 rounded-full blur-[200px]"
          animate={{
            x: ["0%", "-15%", "0%"],
            y: ["0%", "-10%", "0%"],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Oscurecedor suave */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
      </div>

      <Navbar />

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

      <Footer />
    </motion.div>
  );
}

export default App;
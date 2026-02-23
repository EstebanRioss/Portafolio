import { useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import About from "./Components/About";
import Projects from "./Components/Projects";
import Stack from "./Components/Stack";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import Hero from "./Components/Hero";

function SectionWrapper({ children, position = "left" }) {
  return (
    <div className="relative overflow-hidden">
      {/* Red ambient background */}
      <div
        className={`absolute ${
          position === "left"
            ? "-left-40"
            : position === "right"
            ? "-right-40"
            : "left-1/2 -translate-x-1/2"
        } top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 blur-[160px] -z-0`}
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
}

function App() {
  return (
    <div className="bg-black text-white min-h-screen font-sans">
      <Navbar />

      <div className="section-bg section-center">
        <Hero />
      </div>

      <div className="section-bg section-left">
        <About />
      </div>

      <div className="section-bg section-right">
        <Projects />
      </div>

      <div className="section-bg section-left">
        <Stack />
      </div>

      <div className="section-bg section-right">
        <Contact />
      </div>

      <Footer />
    </div>
  );
}

export default App;

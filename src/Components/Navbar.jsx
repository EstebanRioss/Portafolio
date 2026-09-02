import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, FileDown } from "lucide-react";
import { NAV_LINKS, PROFILE } from "../data/content";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);

      const pos = window.scrollY + window.innerHeight * 0.4;
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= pos) current = id;
      }
      setActive(current);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-red-600/25"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-4 flex justify-between items-center">
        {/* LOGO */}
        <a href="#top" className="flex items-center gap-2.5 group">
          <img
            src="/logo.png"
            alt="Logo de Esteban Ríos"
            className="h-9 w-auto object-contain rounded-md group-hover:opacity-90 transition-opacity"
          />
          <span className="font-display text-lg font-semibold tracking-tight select-none">
            <span className="text-white">Esteban</span>
            <span className="text-red-600">.dev</span>
          </span>
        </a>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link, index) => {
            const isActive = active === link.href.slice(1);
            return (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className={`relative text-sm tracking-wide transition-colors duration-300 group ${
                  isActive ? "text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                {link.name}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] rounded-full bg-red-600 transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </motion.a>
            );
          })}

          <motion.a
            href={PROFILE.cvUrl}
            download
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-red-600 rounded-full hover:bg-red-700 hover:gap-2.5 transition-all shadow-[0_0_15px_rgba(220,38,38,0.4)] hover:shadow-[0_0_25px_rgba(220,38,38,0.6)]"
          >
            <FileDown size={15} />
            Descargar CV
          </motion.a>
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Abrir menú"
          className="md:hidden text-red-500"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-black/95 backdrop-blur-xl border-t border-red-600/25"
          >
            <div className="flex flex-col items-center py-8 gap-7">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="text-sm tracking-widest text-gray-300 hover:text-red-500 transition duration-300 uppercase"
                >
                  {link.name}
                </motion.a>
              ))}
              <a
                href={PROFILE.cvUrl}
                download
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-red-600 rounded-full hover:bg-red-700 transition-colors shadow-[0_0_15px_rgba(220,38,38,0.4)]"
              >
                <FileDown size={15} />
                Descargar CV
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SCROLL PROGRESS */}
      <motion.div
        style={{ scaleX }}
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-600 to-red-900 origin-left"
      />
    </motion.nav>
  );
}
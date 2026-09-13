import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";
import { Menu, X, FileDown, Github, Linkedin, Mail } from "lucide-react";
import { NAV_LINKS, PROFILE, SOCIALS } from "../data/content";
import { useMagnetic } from "../lib/useAnime";

const SOCIAL_ICONS = { Github, Linkedin, Mail };

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const cvRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const barProgress = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 28,
    mass: 0.4,
  });
  const headX = useTransform(barProgress, (v) => `${v * 100}%`);
  const headOpacity = useTransform(barProgress, [0, 0.02], [0, 1]);

  useMagnetic(cvRef, { strength: 0.3 });

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const isActive = (href) => active === href.slice(1);
  const elevated = scrolled || isOpen;

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="max-w-6xl mx-auto px-3 sm:px-6 pt-3 sm:pt-4">
        <motion.div
          animate={{ scale: elevated ? 1 : 0.985, y: elevated ? 0 : 2 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className={`relative flex items-center justify-between gap-2 rounded-2xl px-3 sm:px-5 transition-colors duration-300 ${
            elevated
              ? "h-14 sm:h-16 bg-[#0c0c0f]/85 backdrop-blur-2xl border border-white/[0.08] shadow-[0_16px_50px_-18px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.05)]"
              : "h-[76px] bg-transparent border border-transparent"
          }`}
        >
          {/* Top accent line (appears on scroll) */}
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute top-0 inset-x-10 h-px bg-gradient-to-r from-transparent via-red-600/60 to-transparent transition-opacity duration-500 ${
              elevated ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Logo */}
          <a href="#top" className="flex items-center gap-2.5 group shrink-0">
            <span className="relative">
              <img
                src="/logo.png"
                alt="Logo de Esteban Ríos"
                className="h-8 w-8 rounded-lg object-cover group-hover:opacity-90 transition-opacity"
              />
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-red-600 ring-2 ring-[#0c0c0f] opacity-0 group-hover:opacity-100 transition-opacity" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-lg font-semibold tracking-tight select-none">
                Esteban<span className="text-red-600">.dev</span>
              </span>
              <span className="hidden lg:block text-[10px] text-gray-500 tracking-wide mt-0.5">
                Full Stack Developer
              </span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {NAV_LINKS.map((link, index) => {
              const activeLink = isActive(link.href);
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className={`group relative rounded-full px-3 lg:px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-300 ${
                    activeLink
                      ? "text-white"
                      : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {activeLink && (
                    <motion.span
                      layoutId="nav-active"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-red-600/15 border border-red-600/30 shadow-[0_0_18px_rgba(220,38,38,0.25)]"
                    />
                  )}
                  <span className="relative flex items-center gap-1.5">
                    <span className="font-mono text-[10px] text-red-600/80">
                      0{index + 1}
                    </span>
                    {link.name}
                  </span>
                  <span
                    className={`absolute -bottom-px left-4 right-4 h-[2px] rounded-full bg-gradient-to-r from-red-600 to-red-400 transition-transform duration-300 origin-left ${
                      activeLink
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </motion.a>
              );
            })}
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-2.5">
            <AnimatePresence>
              {scrolled && (
                <motion.span
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.3 }}
                  className="hidden xl:flex items-center gap-2 text-[11px] text-gray-400"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-60" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>
                  Disponible
                </motion.span>
              )}
            </AnimatePresence>

            <span className="h-5 w-px bg-white/10" />

            <motion.a
              ref={cvRef}
              href={PROFILE.cvUrl}
              download
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="sheen flex items-center gap-2 px-4 sm:px-5 py-2.5 text-sm font-medium text-white bg-red-600 rounded-full hover:bg-red-700 transition-colors shadow-[0_0_15px_rgba(220,38,38,0.35)]"
            >
              <FileDown size={15} />
              <span className="hidden sm:inline">Descargar CV</span>
            </motion.a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isOpen}
            className="md:hidden flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-medium text-gray-300 hover:text-white hover:border-red-600/40 transition-colors"
          >
            {isOpen ? <X size={16} /> : <Menu size={16} />}
            <span className="tracking-wide">{isOpen ? "Cerrar" : "Menú"}</span>
          </button>

          {/* Scroll progress with springy glow head */}
          <span className="pointer-events-none absolute bottom-0 inset-x-6 h-[2px]">
            <motion.span
              style={{ scaleX: barProgress }}
              className="block h-full origin-left rounded-full bg-gradient-to-r from-red-600 via-rose-500 to-red-800 will-change-transform"
            />
            <motion.span
              style={{ left: headX, opacity: headOpacity }}
              className="absolute -top-0.5 h-3 w-3 -translate-x-1/2 rounded-full bg-red-400 shadow-[0_0_14px_3px_rgba(248,113,113,0.8)]"
            />
          </span>
        </motion.div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden mt-2 rounded-2xl border border-white/10 bg-[#0b0b0e]/95 backdrop-blur-xl px-4 py-6 shadow-[0_28px_70px_-20px_rgba(0,0,0,0.9)]"
            >
              <div className="flex flex-col">
                {NAV_LINKS.map((link, i) => {
                  const activeLink = isActive(link.href);
                  return (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      initial={{ opacity: 0, x: -14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * i, duration: 0.3 }}
                      className={`flex items-center gap-3 py-3.5 px-3 rounded-xl text-sm transition-colors ${
                        activeLink
                          ? "text-white bg-red-600/10 border border-red-600/20"
                          : "text-gray-300 border border-transparent hover:text-red-500 hover:bg-white/5"
                      }`}
                    >
                      <span className="font-mono text-[11px] text-red-600/80">
                        0{i + 1}
                      </span>
                      {link.name}
                      <span className="ml-auto text-gray-600 group-hover:text-red-500">
                        →
                      </span>
                    </motion.a>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.22, duration: 0.3 }}
                className="mt-5 pt-5 border-t border-white/10"
              >
                <div className="flex items-center justify-center gap-4 pb-5">
                  {SOCIALS.map((social) => {
                    const Icon = SOCIAL_ICONS[social.icon];
                    return (
                      <a
                        key={social.name}
                        href={social.href}
                        target={social.href.startsWith("http") ? "_blank" : undefined}
                        rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        aria-label={social.name}
                        onClick={() => setIsOpen(false)}
                        className="p-2.5 rounded-full text-gray-400 hover:text-white hover:bg-white/5 border border-white/10 transition-colors"
                      >
                        <Icon size={17} />
                      </a>
                    );
                  })}
                </div>

                <a
                  href={PROFILE.cvUrl}
                  download
                  onClick={() => setIsOpen(false)}
                  className="sheen flex items-center justify-center gap-2 w-full px-6 py-3 text-sm font-medium text-white bg-red-600 rounded-full hover:bg-red-700 transition-colors shadow-[0_0_15px_rgba(220,38,38,0.35)]"
                >
                  <FileDown size={15} />
                  Descargar CV
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
import { motion } from "framer-motion";
import { ArrowUp, Github, Linkedin, Mail, Heart } from "lucide-react";
import { PROFILE } from "../data/content";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <p className="font-display text-lg font-semibold tracking-tight">
            <span className="text-white">Esteban</span>
            <span className="text-red-600">.dev</span>
          </p>
          <p className="mt-2 text-xs text-gray-500 flex items-center justify-center md:justify-start gap-1.5">
            Construido con React, TailwindCSS y mucha pasta de mi cuenta
            <Heart size={12} className="animate-heart text-red-500" />
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="p-2.5 rounded-full text-gray-500 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Github size={17} />
          </a>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="p-2.5 rounded-full text-gray-500 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Linkedin size={17} />
          </a>
          <a
            href={`mailto:${PROFILE.email}`}
            aria-label="Email"
            className="p-2.5 rounded-full text-gray-500 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Mail size={17} />
          </a>
          <a
            href="#top"
            aria-label="Volver arriba"
            className="ml-2 sheen flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 border border-white/10 rounded-full hover:text-white hover:border-red-600/50 hover:bg-white/5 transition-colors"
          >
            <ArrowUp size={15} />
          </a>
        </div>
      </div>

      <div className="border-t border-white/5 py-5 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs text-gray-600"
        >
          © {year} {PROFILE.name} — Full Stack Developer
        </motion.p>
      </div>
    </footer>
  );
}
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Copy, Check, Github, Linkedin, Send } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { PROFILE, SOCIALS } from "../data/content";

const SOCIAL_ICONS = { Github, Linkedin, Mail };

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24 md:py-32 px-6 md:px-8 text-white">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          kicker="04 · Contacto"
          title="Hablemos"
          description="¿Tenés un proyecto en mente, una consulta sobre una vía o querés sumar a alguien que piensa en producción?"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-8 md:p-12"
        >
          <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight mb-3">
            ¿Trabajamos <span className="text-gradient">juntos</span>?
          </h3>
          <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-9 max-w-xl">
            Actualmente disponible para oportunidades como Full Stack Developer.
            Interesado en proyectos donde pueda aportar arquitectura limpia,
            integración frontend-backend y soluciones escalables.
          </p>

          {/* Email card */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl border border-red-600/25 bg-black/40 backdrop-blur-sm p-5 mb-8">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-11 h-11 rounded-xl bg-red-600/10 border border-red-600/25 flex items-center justify-center shrink-0">
                <Mail size={18} className="text-red-500" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-widest text-gray-500 mb-0.5">
                  Escríbeme
                </p>
                <p className="text-sm md:text-base text-white font-medium">
                  {PROFILE.email}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 border border-white/10 rounded-full hover:text-white hover:border-white/25 transition-colors"
                title="Copiar email"
              >
                {copied ? (
                  <>
                    <Check size={15} className="text-green-500" />
                    <span className="text-green-500">Copiado</span>
                  </>
                ) : (
                  <>
                    <Copy size={15} />
                    Copiar
                  </>
                )}
              </button>
              <a
                href={`mailto:${PROFILE.email}?subject=Contacto desde tu portfolio`}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-red-600 rounded-full hover:bg-red-700 transition-colors shadow-[0_0_15px_rgba(220,38,38,0.4)]"
              >
                <Send size={15} />
                <span className="hidden sm:inline">Enviar email</span>
              </a>
            </div>
          </div>

          {/* Socials */}
          <div className="grid sm:grid-cols-2 gap-3">
            {SOCIALS.map((social) => {
              const Icon = SOCIAL_ICONS[social.icon];
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4 hover:border-red-600/40 hover:bg-white/[0.04] transition-all duration-300"
                >
                  <Icon size={18} className="text-red-500 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">{social.name}</p>
                    <p className="text-xs text-gray-500 truncate">{social.handle}</p>
                  </div>
                  <span className="text-gray-600 group-hover:text-red-500 group-hover:translate-x-0.5 transition-all">
                    ↗
                  </span>
                </a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
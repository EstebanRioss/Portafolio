import { motion } from "framer-motion";
import { Layers, Code2, Database, Rocket, GraduationCap } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { ABOUT_CARDS } from "../data/content";

const ICONS = { Layers, Code2, Database, Rocket };

function handleSpotlight(e) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
}

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-8 text-white">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          kicker="01 · Quién soy"
          title="Sobre mí"
          description="Un perfil orientado a resolver problemas reales de producto, desde la base de datos hasta el pixel final."
        />

        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20">
          {/* LEFT — narrative */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <p className="text-gray-300 leading-relaxed">
              Soy{" "}
              <span className="text-white font-medium">
                Analista Programador Universitario
              </span>{" "}
              en formación y estudiante de{" "}
              <span className="text-white font-medium">
                Ingeniería en Sistemas
              </span>
              . Me especializo en desarrollar aplicaciones web de punta a punta
              con arquitectura cliente-servidor, cuidando tanto la experiencia
              del usuario como la salud técnica del backend.
            </p>

            <p className="text-gray-400 leading-relaxed">
              Construyo sistemas con arquitecturas en capas, principios SOLID y
              APIs REST seguras con autenticación JWT. Me enfoco en escribir
              código mantenible, modular y listo para producción: monitoreado,
              containerizado y con su pipeline de CI/CD.
            </p>

            {/* Academic highlights */}
            <div className="pt-2">
              <p className="text-xs uppercase tracking-[0.3em] text-red-500/80 mb-4 flex items-center gap-2">
                <GraduationCap size={14} />
                Base académica
              </p>
              <div className="flex flex-wrap gap-2.5">
                {[
                  "Tecnico en informatica",
                  "Analista Programador Universitario",
                  "Ingeniería en Sistemas",
                  
                ].map((item) => (
                  <span
                    key={item}
                    className="text-xs px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-gray-300 hover:border-red-600/40 hover:text-white transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT — what I do */}
          <div className="grid sm:grid-cols-2 gap-4">
            {ABOUT_CARDS.map((card, i) => {
              const Icon = ICONS[card.icon];
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  onMouseMove={handleSpotlight}
                  className="spotlight group rounded-2xl border border-white/10 bg-white/[0.02] p-6 overflow-hidden hover:border-red-600/40 hover:bg-white/[0.04] transition-colors duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-red-600/10 border border-red-600/25 flex items-center justify-center mb-4 group-hover:bg-red-600/20 transition-colors">
                    <Icon size={20} className="text-red-500" />
                  </div>
                  <h3 className="font-display text-base font-semibold text-white mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {card.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { PROJECTS, PROJECT_CATEGORIES } from "../data/content";

function ProjectCard({ project, index }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-7 overflow-hidden hover:border-red-600/40 hover:shadow-[0_20px_60px_rgba(220,38,38,0.12)] transition-all duration-300"
    >
      {/* corner number */}
      <span className="absolute top-5 right-7 font-display text-5xl font-bold text-white/[0.04] group-hover:text-red-600/10 transition-colors duration-300 select-none">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* top accent line */}
      <span className="absolute top-0 left-0 h-[2px] w-0 bg-gradient-to-r from-red-600 to-transparent group-hover:w-full transition-all duration-500" />

      <p className="text-xs uppercase tracking-[0.2em] text-red-500/80 mb-2">
        {project.tagline}
      </p>
      <h3 className="font-display text-xl font-semibold text-white mb-3 tracking-tight">
        {project.title}
      </h3>

      <p className="text-sm text-gray-400 leading-relaxed mb-5 flex-1">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="text-[11px] px-2.5 py-1 rounded-md border border-white/10 bg-white/[0.03] text-gray-400 group-hover:border-red-600/25 transition-colors"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-6 border-t border-white/5 pt-5">
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group/link"
        >
          <Github size={17} />
          <span className="text-xs font-medium tracking-wide">Código fuente</span>
          <span className="hidden sm:inline text-gray-600 group-hover/link:text-red-500 transition-colors">
            ↗
          </span>
        </a>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("all");

  const filtered =
    filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-24 md:py-32 px-6 md:px-8 text-white">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          kicker="02 · Trabajo"
          title="Proyectos"
          description="Productos reales que construí de punta a punta: SaaS, bots con IA y aplicaciones web en producción."
        />

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap gap-2.5 mb-12"
        >
          {PROJECT_CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFilter(cat.value)}
              className={`px-4 py-1.5 text-sm rounded-full border transition-all duration-300 ${
                filter === cat.value
                  ? "border-red-600/60 bg-red-600/15 text-red-300 shadow-[0_0_12px_rgba(220,38,38,0.25)]"
                  : "border-white/10 text-gray-400 hover:text-white hover:border-white/25"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
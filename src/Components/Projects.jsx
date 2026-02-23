import { motion } from "framer-motion";

function ProjectCard({ title, description, tech }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-black border border-red-600/20 rounded-xl p-6 hover:border-red-600/50 hover:shadow-[0_10px_40px_rgba(220,38,38,0.15)] transition-all duration-300"
    >
      <h3 className="text-lg font-medium text-white mb-3 tracking-tight">
        {title}
      </h3>

      <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">
        {tech}
      </p>

      <p className="text-sm text-gray-400 leading-relaxed">
        {description}
      </p>

      <div className="mt-6 flex gap-6 text-sm">
        <a
          href="#"
          className="text-red-500 hover:text-red-400 transition"
        >
          Demo →
        </a>
        <a
          href="#"
          className="text-gray-400 hover:text-white transition"
        >
          Código →
        </a>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-28 px-8 md:px-20 bg-black text-white"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-semibold mb-16 tracking-tight"
        >
          <span className="text-red-500">/</span> Proyectos
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10">
          <ProjectCard
            title="Bot de WhatsApp con IA"
            tech="Node.js · Puppeteer · OpenRouter · Baileys"
            description="Bot inteligente con integración a modelos de lenguaje (LLMs), manejo de sesiones y automatización de flujos conversacionales. Implementación de scraping y arquitectura modular orientada a eventos."
          />

          <ProjectCard
            title="Gestión de Eventos"
            tech="Angular · TailwindCSS · Node.js · JWT"
            description="Aplicación web cliente-servidor con CRUD completo, autenticación JWT y arquitectura en capas. Integración frontend-backend con validaciones y manejo de estado optimizado."
          />

          <ProjectCard
            title="JFit – Plataforma Fitness"
            tech="React · Supabase · PostgreSQL · Auth"
            description="SPA para gestión de rutinas y planes nutricionales. Sistema de autenticación, panel administrativo y consumo de servicios backend con arquitectura basada en componentes."
          />
        </div>
      </div>
    </section>
  );
}
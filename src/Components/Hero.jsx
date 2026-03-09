// components/Hero.jsx

import { motion } from "framer-motion";
import { Github, Linkedin, Download } from "lucide-react";

const heroContainer = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const containerLeft = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const letterLeft = {
  hidden: { opacity: 0, x: -60 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  const firstName = "Esteban";
  const lastName = "Ríos";

  return (
    <section className=" pt-24 min-h-screen flex flex-col justify-center px-8 md:px-24 text-white relative overflow-hidden">

      <div className="relative z-10 max-w-6xl">

        {/* NAME */}
        <div className="mb-16">
        <motion.div
        variants={heroContainer}
        initial="hidden"
        animate="show"
        className="mb-16"
      >
          
          {/* First Name */}
          <motion.h1
            variants={containerLeft}
            initial="hidden"
            animate="show"
            className="flex flex-wrap text-5xl md:text-7xl font-semibold tracking-tight leading-tight"
          >
            {firstName.split("").map((char, index) => (
              <motion.span key={`f-${index}`} variants={letterLeft}>
                {char}
              </motion.span>
            ))}
          </motion.h1>

          {/* Last Name - delayed */}
          <motion.h1
            variants={containerLeft}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.6 }}
            className="flex flex-wrap text-5xl md:text-7xl font-semibold tracking-tight leading-tight text-red-600 mt-3"
          >
            {lastName.split("").map((char, index) => (
              <motion.span key={`l-${index}`} variants={letterLeft}>
                {char}
              </motion.span>
            ))}
          </motion.h1>

          {/* BUTTONS / CTAS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="mt-10 flex flex-wrap items-center gap-5"
          >
            <a
              href="#projects"
              className="px-6 py-3 text-sm font-medium text-white bg-red-600 rounded-full hover:bg-red-700 transition-colors shadow-[0_0_15px_rgba(220,38,38,0.4)] hover:shadow-[0_0_25px_rgba(220,38,38,0.6)]"
            >
              Ver Proyectos
            </a>
            <a
              href="/CV_Esteban_Rios.pdf"
              download
              className="px-6 py-3 text-sm font-medium text-gray-300 border border-gray-600 rounded-full hover:text-white hover:border-red-500 hover:bg-white/5 transition-all flex items-center gap-2"
            >
              <Download size={16} /> CV
            </a>
            
            <div className="flex items-center gap-4 ml-2 pl-6 border-l border-gray-700">
              <a href="https://github.com/EstebanRioss" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/esteban-rios-b6056a309/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full">
                <Linkedin size={20} />
              </a>
            </div>
          </motion.div>

        </motion.div>
        </div>

        {/* CONTENT GRID */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="grid md:grid-cols-3 gap-16 max-w-6xl"
        >
          
          {/* PROFILE */}
          <div className="space-y-8">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-3">
                Perfil
              </p>
              <p className="text-sm text-gray-200 leading-relaxed">
                Full Stack Developer con experiencia en desarrollo de aplicaciones
                web escalables, arquitectura en capas y despliegue en entornos
                productivos containerizados.
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-3">
                Especialización
              </p>
              <p className="text-sm text-gray-300 leading-relaxed">
                SaaS · Arquitectura DAO · Integraciones API · Automatización ·
                Sistemas de reservas · Bots con IA · Alta disponibilidad
              </p>
            </div>
          </div>

          {/* FRONTEND + BACKEND */}
          <div className="space-y-8">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-3">
                Frontend
              </p>
              <p className="text-sm text-gray-300 leading-relaxed">
                React · Next.js 14 · Angular · TypeScript · Vite · TailwindCSS ·
                Framer Motion · UI Modular
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-3">
                Backend
              </p>
              <p className="text-sm text-gray-300 leading-relaxed">
                Node.js · Express · Java · JPA · Hibernate · JWT · bcrypt ·
                Arquitectura en Capas · Principios SOLID · APIs REST
              </p>
            </div>
          </div>

          {/* DATABASE + DEVOPS */}
          <div className="space-y-8">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-3">
                Bases de Datos
              </p>
              <p className="text-sm text-gray-300 leading-relaxed">
                PostgreSQL (Primary/Replica) · MySQL · Supabase ·
                Modelado Relacional · Backups automáticos · Replicación
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-3">
                DevOps & Infraestructura
              </p>
              <p className="text-sm text-gray-300 leading-relaxed">
                Docker · Docker Compose · Prometheus · Grafana · CI/CD ·
                GitHub Actions · Linux · Monitoreo · pgBadger
              </p>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
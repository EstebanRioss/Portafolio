// components/Hero.jsx

import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const letter = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  const firstName = "Esteban";
  const lastName = "Ríos";

  return (
    <section className="min-h-screen flex flex-col justify-center px-8 md:px-24 bg-black text-white relative overflow-hidden">
      {/* Decorative subtle gradient */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-600/10 blur-[140px] -z-0" />

      <div className="relative z-10 max-w-5xl">
        {/* NAME */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mb-12"
        >
          <h1 className="flex flex-wrap text-4xl md:text-6xl font-semibold tracking-tight leading-tight">
            {firstName.split("").map((char, index) => (
              <motion.span key={`f-${index}`} variants={letter}>
                {char}
              </motion.span>
            ))}
          </h1>

          <h1 className="flex flex-wrap text-4xl md:text-6xl font-semibold tracking-tight leading-tight text-red-600 mt-2">
            {lastName.split("").map((char, index) => (
              <motion.span key={`l-${index}`} variants={letter}>
                {char}
              </motion.span>
            ))}
          </h1>
        </motion.div>

        {/* ROLE + INFO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="grid md:grid-cols-2 gap-14 max-w-4xl"
        >
          {/* LEFT COLUMN */}
          <div className="space-y-10">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-3">
                Rol
              </p>
              <p className="text-sm text-gray-200 font-medium">
                Full Stack Developer
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-3">
                Frontend
              </p>
              <p className="text-sm text-gray-300 leading-relaxed">
                React · Angular · Vite · TailwindCSS · Framer Motion
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-3">
                Backend
              </p>
              <p className="text-sm text-gray-300 leading-relaxed">
                Node.js · .NET · APIs REST · JWT · Arquitectura en capas · SOLID
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-10">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-3">
                Bases de Datos
              </p>
              <p className="text-sm text-gray-300 leading-relaxed">
                PostgreSQL · MySQL · MongoDB · Supabase · Modelado relacional
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-3">
                DevOps & Infraestructura
              </p>
              <p className="text-sm text-gray-300 leading-relaxed">
                Docker · Linux · Git · Redes TCP/IP · CI/CD básico
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-3">
                Formación
              </p>
              <p className="text-sm text-gray-300 leading-relaxed">
                Analista Programador Universitario · Ingeniería en Informática ·
                Programación competitiva en C++ (algoritmos y optimización)
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

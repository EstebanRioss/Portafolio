// components/Hero.jsx

import { motion } from "framer-motion";

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
    <section className="min-h-screen flex flex-col justify-center px-8 md:px-24 bg-black text-white relative overflow-hidden">
      
      {/* Red ambient background */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-red-600/10 blur-[160px] -z-0" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-red-600/5 blur-[140px] -z-0" />

      <div className="relative z-10 max-w-6xl">

        {/* NAME */}
        <div className="mb-16">
          
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
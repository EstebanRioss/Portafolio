import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="py-28 px-8 md:px-20 bg-black text-white"
    >
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-semibold mb-12 tracking-tight"
        >
          <span className="text-red-500">/</span> Sobre mí
        </motion.h2>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-16">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-sm text-gray-300 leading-relaxed">
              Soy <span className="text-white font-medium">Analista Programador Universitario</span>
              en formación y estudiante de Ingeniería en Informática.
              Me especializo en el desarrollo de aplicaciones web bajo
              arquitectura cliente-servidor con enfoque en diseño limpio,
              escalabilidad y buenas prácticas.
            </p>

            <p className="text-sm text-gray-400 leading-relaxed">
              Trabajo con arquitecturas en capas, principios SOLID y diseño de
              APIs REST seguras con autenticación JWT. Me enfoco en escribir
              código mantenible, modular y preparado para producción.
            </p>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">
                Enfoque Técnico
              </p>
              <p className="text-sm text-gray-300">
                Desarrollo Full Stack · Integración frontend-backend · Modelado
                de bases de datos · Optimización de rendimiento
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">
                Experiencia Destacada
              </p>
              <p className="text-sm text-gray-300">
                Bot de WhatsApp con IA · Plataforma fitness con Supabase ·
                Sistema de gestión de eventos con Angular y Node.js
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">
                Base Académica
              </p>
              <p className="text-sm text-gray-300">
                Programación competitiva en C++ con enfoque en algoritmos,
                estructuras de datos y optimización computacional
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
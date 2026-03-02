// components/Contact.jsx

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-28 px-8 md:px-20 text-white"
    >
      <div className="max-w-4xl mx-auto text-left">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-semibold mb-12 tracking-tight"
        >
          <span className="text-red-500">/</span> Contacto
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-sm text-gray-400 leading-relaxed mb-12 max-w-xl"
        >
          Actualmente disponible para oportunidades como Full Stack Developer.
          Interesado en proyectos desafiantes donde pueda aportar arquitectura
          limpia, integración frontend-backend y soluciones escalables.
        </motion.p>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex gap-10"
        >
          <a
            href="https://github.com/EstebanRioss"
            className="group flex items-center gap-3 text-gray-400 hover:text-red-500 transition-all duration-300"
          >
            <Github className="w-5 h-5 group-hover:scale-110 transition" />
            <span className="text-sm tracking-wide">GitHub</span>
          </a>

          <a
            href="https://www.linkedin.com/in/esteban-rios-b6056a309/"
            className="group flex items-center gap-3 text-gray-400 hover:text-red-500 transition-all duration-300"
          >
            <Linkedin className="w-5 h-5 group-hover:scale-110 transition" />
            <span className="text-sm tracking-wide">LinkedIn</span>
          </a>

          <a
            href="mailto:esteban_690@hotmail.com"
            className="group flex items-center gap-3 text-gray-400 hover:text-red-500 transition-all duration-300"
          >
            <Mail className="w-5 h-5 group-hover:scale-110 transition" />
            <span className="text-sm tracking-wide">Email</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

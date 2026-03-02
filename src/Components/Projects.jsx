import { motion } from "framer-motion";
import { Github } from "lucide-react";

function ProjectCard({ title, description, tech,link }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className=" border border-red-600/20 rounded-xl p-6 hover:border-red-600/50 hover:shadow-[0_10px_40px_rgba(220,38,38,0.15)] transition-all duration-300"
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

      <div className="mt-6 flex items-center gap-6 text-sm">
        <a
          href={link}
          className="text-gray-400 hover:text-white transition transform hover:scale-110"
        >
          <Github size={20} />
        </a>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-28 px-8 md:px-20 text-white"
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
            title="Memoryals – SaaS de Suscripciones"
            tech="MEAN Stack · MercadoPago · JWT · Cron Jobs · SaaS Architecture"
            description="
            Plataforma SaaS de membresías con planes por rango etario y sistema de cuotas mensuales automatizadas.
            Implementa autenticación JWT con roles (cliente/admin), aprobación de cuentas,
            generación automática de cuotas mediante cron jobs y recordatorios por email.
            Integración completa con MercadoPago para pagos recurrentes y seguimiento
            de transacciones. Panel administrativo con métricas y gráficos en tiempo real.
            "
            link="https://github.com/EstebanRioss/Memoryals-Frontend"
          />
          <ProjectCard
            title="Canchas – SaaS de Alquiler Deportivo"
            tech="Next.js 14 · PostgreSQL Replication · Docker · Prometheus · CI/CD"
            description="
            Plataforma SaaS de reservas deportivas con arquitectura containerizada,
            base de datos replicada (Primary/Replica), monitoreo en tiempo real
            con Prometheus y Grafana, autenticación JWT segura y backups automáticos.
            Infraestructura preparada para producción con Docker Compose y CI/CD.
            "
            link="https://github.com/EstebanRioss/HiaFinal"
          />
          
          <ProjectCard
            title="AI WhatsApp Assistant – Scraping + LLM"
            tech="Node.js · Baileys · Puppeteer · OpenRouter · Mistral 7B"
            description="
            Asistente conversacional integrado a WhatsApp que genera respuestas
            utilizando modelos LLM (Mistral 7B vía OpenRouter) combinados con
            scraping dinámico de contenido web. Implementa autenticación persistente
            con Baileys, gestión de sesiones multi-file y arquitectura modular
            para procesamiento de mensajes en tiempo real.
            "
            link="https://github.com/EstebanRioss/chatbotwp"
          />

          <ProjectCard
            title="Sistema de Gestión de Reservas"
            tech="Java · JPA · Hibernate · MySQL · DAO Pattern"
            description="
            Sistema de gestión de reservas desarrollado en Java con arquitectura en capas
            basada en el patrón DAO. Implementa persistencia con JPA + Hibernate,
            validación de conflictos de horarios y tests unitarios con JUnit.
            Diseño orientado a dominio con separación clara entre lógica de negocio
            y acceso a datos.
            "
            link="https://github.com/EstebanRioss/Trabajo_Final"
          />
          <ProjectCard
            title="JFit – Plataforma Fitness"
            tech="React · Vite · Supabase · TailwindCSS · Admin Panel"
            description="
            Plataforma web de fitness con autenticación y panel administrativo.
            Implementa registro/login mediante Supabase, gestión de usuarios,
            ejercicios y estadísticas. Arquitectura basada en componentes reutilizables
            y diseño responsive optimizado para despliegue en entornos serverless.
            "
            link="https://github.com/EstebanRioss/fitness"
          />

          <ProjectCard
            title="Event Manager – Plataforma de Eventos"
            tech="Node.js · Express · MongoDB · Angular 19 · JWT · SSR"
            description="
            Aplicación web fullstack para gestión de eventos, entradas y facturación.
            Backend desarrollado con Express y MongoDB (Mongoose) exponiendo APIs REST
            para usuarios, eventos, categorías, pagos y facturas. Implementa autenticación
            JWT, hash seguro con bcrypt y envío de emails con Nodemailer.
            Frontend en Angular 19 con soporte SSR, consumo reactivo de APIs con RxJS
            y panel administrativo con visualización de métricas.
            Arquitectura modular desacoplada lista para despliegue en producción.
            "
            link="https://github.com/EstebanRioss/proyfrontendgrupo08"
          />
        </div>
      </div>
    </section>
  );
}
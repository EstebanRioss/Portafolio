// components/Stack.jsx

import { motion } from "framer-motion";

function StackBlock({ title, items }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="border border-red-600/20 rounded-xl p-6 hover:border-red-600/40 transition-all duration-300"
    >
      <h3 className="text-sm uppercase tracking-widest text-gray-500 mb-4">
        {title}
      </h3>

      <div className="space-y-2">
        {items.map((item, index) => (
          <p
            key={index}
            className="text-sm text-gray-300 hover:text-red-400 transition"
          >
            {item}
          </p>
        ))}
      </div>
    </motion.div>
  );
}

export default function Stack() {
  return (
    <section
      id="stack"
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
          <span className="text-red-500">/</span> Stack Técnico
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-10">

          <StackBlock
            title="Frontend"
            items={[
              "React 18",
              "Next.js 14 (App Router)",
              "Angular 20",
              "TypeScript 5",
              "Vite",
              "TailwindCSS",
              "Framer Motion",
              "Chart.js",
            ]}
          />

          <StackBlock
            title="Backend & APIs"
            items={[
              "Node.js (Express 5)",
              "Next.js API Routes",
              ".NET",
              "Java (Maven)",
              "RESTful APIs",
              "JWT (httpOnly Cookies)",
              "Arquitectura en Capas",
              "DAO Pattern",
              "Principios SOLID",
            ]}
          />

          <StackBlock
            title="Bases de Datos & Persistencia"
            items={[
              "PostgreSQL (Replication Primary/Replica)",
              "MongoDB (Mongoose)",
              "MySQL 8",
              "JPA 2.2",
              "Hibernate 5",
              "Supabase",
              "Modelado Relacional",
            ]}
          />

          <StackBlock
            title="Infraestructura & DevOps"
            items={[
              "Docker (Multi-stage)",
              "Docker Compose",
              "CI/CD (GitHub Actions)",
              "Prometheus & Grafana",
              "pg_dump Backups",
              "Linux",
              "Git & GitHub",
            ]}
          />

          <StackBlock
            title="Integraciones & Automatización"
            items={[
              "MercadoPago SDK",
              "Baileys (WhatsApp Integration)",
              "Puppeteer (Web Scraping)",
              "OpenRouter (Mistral 7B)",
              "SendGrid / Nodemailer / Resend",
              "node-cron",
              "Axios",
            ]}
          />

          <StackBlock
            title="Testing & Calidad"
            items={[
              "JUnit 5",
              "Testing Angular (Jasmine/Karma)",
              "Validaciones de negocio",
              "Manejo de excepciones personalizadas",
            ]}
          />

        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";

function StackBlock({ title, items }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="border border-red-600/20 rounded-xl p-6 bg-black hover:border-red-600/40 transition-all duration-300"
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
          <span className="text-red-500">/</span> Stack Técnico
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-10">
          <StackBlock
            title="Frontend"
            items={[
              "React",
              "Angular",
              "TailwindCSS",
              "Vite",
              "HTML5",
              "CSS3",
              "JavaScript (ES6+)",
            ]}
          />

          <StackBlock
            title="Backend"
            items={[
              "Node.js",
              ".NET",
              "Express",
              "APIs REST",
              "JWT Authentication",
              "Arquitectura en Capas",
              "Principios SOLID",
            ]}
          />

          <StackBlock
            title="Bases de Datos"
            items={[
              "PostgreSQL",
              "MySQL",
              "MongoDB",
              "Supabase",
              "Modelado Relacional",
            ]}
          />

          <StackBlock
            title="DevOps & Herramientas"
            items={[
              "Docker",
              "Linux",
              "Git & GitHub",
              "Programación en C++",
              "Optimización Algorítmica",
            ]}
          />
        </div>
      </div>
    </section>
  );
}

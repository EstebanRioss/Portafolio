import { motion } from "framer-motion";
import { Layout, Server, Database, Container, Zap, ShieldCheck, PlusCircle } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { STACK_GROUPS, EXTRA_EXPERIENCE } from "../data/content";

const ICONS = { Layout, Server, Database, Container, Zap, ShieldCheck };

function StackGroup({ group, index }) {
  const Icon = ICONS[group.icon];
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08 }}
      whileHover={{ y: -4 }}
      className="group rounded-2xl border border-white/10 bg-white/[0.02] p-7 hover:border-red-600/35 hover:bg-white/[0.04] hover:shadow-[0_15px_50px_rgba(220,38,38,0.1)] transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-red-600/10 border border-red-600/25 flex items-center justify-center group-hover:bg-red-600/20 transition-colors">
          <Icon size={18} className="text-red-500" />
        </div>
        <h3 className="text-sm uppercase tracking-widest text-gray-300 font-semibold">
          {group.title}
        </h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {group.items.map((item) => (
          <span
            key={item}
            className="text-xs px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.02] text-gray-400 hover:text-white hover:border-red-600/40 transition-colors"
          >
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Stack() {
  return (
    <section id="stack" className="py-24 md:py-32 px-6 md:px-8 text-white">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          kicker="03 · Herramientas"
          title="Stack Técnico"
          description="Tecnologías con las que construyo y despliego software todos los días."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STACK_GROUPS.map((group, index) => (
            <StackGroup key={group.title} group={group} index={index} />
          ))}
        </div>

        {/* Extra */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-10 flex flex-wrap items-center gap-3 rounded-2xl border border-dashed border-red-600/25 bg-red-600/[0.03] p-6"
        >
          <PlusCircle size={18} className="text-red-500 shrink-0" />
          <span className="text-sm text-gray-400 mr-1">También:</span>
          {EXTRA_EXPERIENCE.map((item) => (
            <span
              key={item}
              className="text-xs px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-gray-300"
            >
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
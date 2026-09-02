import { motion } from "framer-motion";

export default function SectionHeading({ kicker, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mb-14 md:mb-16"
    >
      <div className="flex items-center gap-4 mb-4">
        <span className="hidden sm:block h-px w-12 bg-red-600/60" />
        <p className="text-xs uppercase tracking-[0.35em] text-red-500/90 font-medium">
          {kicker}
        </p>
      </div>

      <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-white">
        {title}
      </h2>

      {description && (
        <p className="mt-4 text-gray-400 max-w-2xl text-sm md:text-[15px] leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
"use client";

import { motion, Variants } from "framer-motion";

const skills = [
  { name: "Next.js", icon: "▲", color: "oklch(0.25 0.01 265)", category: "Framework" },
  { name: "React", icon: "⚛", color: "oklch(0.75 0.15 200)", category: "Library" },
  { name: "TypeScript", icon: "TS", color: "oklch(0.65 0.18 230)", category: "Language" },
  { name: "Three.js", icon: "⬡", color: "oklch(0.65 0.22 290)", category: "3D" },
  { name: "Tailwind", icon: "🌊", color: "oklch(0.72 0.15 200)", category: "Styling" },
  { name: "Framer Motion", icon: "◈", color: "oklch(0.65 0.22 290)", category: "Animation" },
  { name: "Node.js", icon: "⬡", color: "oklch(0.72 0.18 140)", category: "Backend" },
  { name: "PostgreSQL", icon: "🐘", color: "oklch(0.65 0.15 225)", category: "Database" },
  { name: "Prisma", icon: "◇", color: "oklch(0.65 0.14 290)", category: "ORM" },
  { name: "Docker", icon: "🐳", color: "oklch(0.65 0.15 210)", category: "DevOps" },
  { name: "Figma", icon: "◧", color: "oklch(0.72 0.22 25)", category: "Design" },
  { name: "Git", icon: "⊛", color: "oklch(0.65 0.22 40)", category: "Tools" },
];

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative py-24 sm:py-32 overflow-hidden"
      aria-label="Skills section"
    >
      {/* Background accent */}
      <div
        className="absolute top-1/2 right-0 w-[500px] h-[400px] -translate-y-1/2 rounded-full bg-[oklch(0.75_0.15_200/5%)] blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-[0.25em] text-[oklch(0.52_0.15_200)] mb-4"
          >
            — Tech Stack
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold leading-tight"
          >
            Tools I <span className="text-gradient">master</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-muted-foreground max-w-xl mx-auto"
          >
            A curated set of technologies I use daily to ship fast, beautiful, and scalable products.
          </motion.p>
        </div>

        {/* Skills grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              variants={item}
              whileHover={{ scale: 1.06, y: -4 }}
              className="group relative glass rounded-2xl p-5 flex flex-col items-center justify-center text-center cursor-default transition-all duration-300 hover:glass-strong hover:border-black/12 card-shadow"
            >
              {/* Category label */}
              <span className="absolute top-2.5 right-2.5 text-[9px] text-muted-foreground/40 font-medium uppercase tracking-wider">
                {skill.category}
              </span>

              {/* Icon */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold mb-3 transition-all duration-300 group-hover:scale-110"
                style={{
                  background: `${skill.color.replace(")", " / 15%)")} `,
                  color: skill.color,
                  border: `1px solid ${skill.color.replace(")", " / 30%)")}`,
                }}
              >
                {skill.icon}
              </div>

              {/* Name */}
              <p className="text-xs font-semibold text-foreground/80 group-hover:text-foreground transition-colors duration-200">
                {skill.name}
              </p>

              {/* Hover shimmer */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${skill.color.replace(")", " / 8%)")}, transparent 70%)`,
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

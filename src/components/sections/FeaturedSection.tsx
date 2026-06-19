"use client";

import { motion, Variants } from "framer-motion";
import { useState } from "react";

const projects = [
  {
    id: "project-1",
    title: "E-Commerce Platform",
    description:
      "A blazing-fast e-commerce store built with Next.js App Router, Stripe payments, and a headless CMS. Handles 10k+ products with real-time inventory.",
    tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    color: "oklch(0.65 0.22 290)",
    accent: "oklch(0.75 0.15 200)",
    emoji: "🛍️",
    year: "2024",
    link: "#",
  },
  {
    id: "project-2",
    title: "3D Portfolio Engine",
    description:
      "A WebGL-powered portfolio builder that lets creators design immersive 3D presentations. Built on Three.js with a drag-and-drop editor.",
    tags: ["Three.js", "React", "WebGL", "Framer Motion"],
    color: "oklch(0.75 0.15 200)",
    accent: "oklch(0.65 0.22 290)",
    emoji: "🌐",
    year: "2024",
    link: "#",
  },
  {
    id: "project-3",
    title: "AI SaaS Dashboard",
    description:
      "A production-grade SaaS dashboard with AI-powered analytics, real-time collaboration, and beautiful data visualizations. 500+ active users.",
    tags: ["Next.js", "OpenAI", "Prisma", "Recharts"],
    color: "oklch(0.72 0.18 60)",
    accent: "oklch(0.65 0.22 290)",
    emoji: "🤖",
    year: "2023",
    link: "#",
  },
];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function FeaturedSection() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section
      id="featured"
      className="relative py-24 sm:py-32 overflow-hidden"
      aria-label="Featured projects section"
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-0 left-1/3 w-[400px] h-[400px] rounded-full bg-[oklch(0.65_0.22_290/5%)] blur-[100px]" />
        <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] rounded-full bg-[oklch(0.75_0.15_200/5%)] blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-16 gap-6">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs font-semibold uppercase tracking-[0.25em] text-[oklch(0.55_0.18_60)] mb-4"
            >
              — Featured Work
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl font-extrabold leading-tight"
            >
              Selected <span className="text-gradient-warm">projects</span>
            </motion.h2>
          </div>

          <motion.a
            href="#contact"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 group"
          >
            View all work
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </div>

        {/* Project cards grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <motion.article
              key={project.id}
              id={project.id}
              variants={card}
              onMouseEnter={() => setHovered(project.id)}
              onMouseLeave={() => setHovered(null)}
              className="group relative glass rounded-3xl overflow-hidden cursor-pointer transition-all duration-500"
              style={{
                boxShadow:
                  hovered === project.id
                    ? `0 20px 60px ${project.color.replace(")", " / 15%)")}, 0 0 0 1px ${project.color.replace(")", " / 15%)")}`
                    : "var(--project-card-shadow)",
              }}
            >
              {/* Gradient banner */}
              <div
                className="h-40 relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg in oklch, ${project.color}, ${project.accent})`,
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-500">
                  {project.emoji}
                </div>
                <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(-45deg, white 0 1px, transparent 0 8px)",
                  }}
                />
                {/* Year badge */}
                <span className="absolute top-4 right-4 text-[10px] font-bold text-white/60 glass px-2 py-1 rounded-full">
                  {project.year}
                </span>
              </div>

              {/* Card content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-gradient transition-all duration-300">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full text-[10px] font-semibold"
                      style={{
                        background: project.color.replace(")", " / 10%)"),
                        color: project.color,
                        border: `1px solid ${project.color.replace(")", " / 25%)")}`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href={project.link}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold transition-all duration-200 group/link"
                  style={{ color: project.color }}
                >
                  View Project
                  <svg
                    className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>

              {/* Hover shimmer */}
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at 50% 0%, ${project.color.replace(")", " / 5%)")}, transparent 70%)`,
                }}
              />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

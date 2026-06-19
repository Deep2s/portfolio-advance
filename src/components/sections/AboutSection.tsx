"use client";

import { motion, Variants } from "framer-motion";

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay: 0.15 } },
};

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-24 sm:py-32 overflow-hidden"
      aria-label="About section"
    >
      {/* Subtle background accent */}
      <div
        className="absolute top-1/2 left-0 w-[600px] h-[400px] -translate-y-1/2 rounded-full bg-[oklch(0.65_0.22_290/6%)] blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold uppercase tracking-[0.25em] text-[oklch(0.52_0.22_290)] mb-4"
        >
          — About Me
        </motion.p>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6">
              Crafting the{" "}
              <span className="text-gradient">intersection</span>{" "}
              of code & creativity
            </h2>

            <div className="space-y-4 text-muted-foreground text-base leading-relaxed">
              <p>
                I&apos;m a full-stack developer with a passion for building
                beautiful, performant web experiences. I specialize in React
                ecosystem, modern TypeScript, and pushing the boundaries of what
                browsers can do.
              </p>
              <p>
                From interactive 3D visuals powered by Three.js to smooth
                micro-animations with Framer Motion — I believe the best
                interfaces feel{" "}
                <span className="text-foreground font-medium">alive</span>.
              </p>
              <p>
                When I&apos;m not shipping products, you&apos;ll find me
                exploring generative art, contributing to open source, or
                mentoring junior developers.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {["Next.js", "TypeScript", "Three.js", "Node.js", "React", "Figma"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full text-xs font-medium glass text-muted-foreground border border-black/8 dark:border-white/8 card-shadow"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </motion.div>

          {/* Right: Visual card */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative"
          >
            {/* Main card */}
            <div className="glass-strong rounded-3xl p-8 relative overflow-hidden">
              {/* Decorative gradient top-right */}
              <div
                className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br from-[oklch(0.65_0.22_290)] to-[oklch(0.75_0.15_200)] opacity-20 blur-2xl"
                aria-hidden="true"
              />

              {/* Avatar placeholder with gradient */}
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[oklch(0.65_0.22_290)] to-[oklch(0.75_0.15_200)] flex items-center justify-center text-3xl font-black text-white mb-6 shadow-xl">
                DG
              </div>

              <h3 className="text-xl font-bold text-foreground mb-1">
                Thedeep G
              </h3>
              <p className="text-sm text-[oklch(0.52_0.18_200)] font-medium mb-4">
                Full-Stack Developer & Creative Coder
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                📍 India &nbsp;•&nbsp; 🌐 Open to Remote
              </p>

              {/* Mini stats */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-black/8 dark:border-white/8">
                {[
                  { n: "3+", label: "Yrs Exp" },
                  { n: "20+", label: "Projects" },
                  { n: "10k+", label: "Commits" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="text-xl font-extrabold text-gradient">{s.n}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating badge — bottom left */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 glass-strong rounded-2xl px-4 py-3 flex items-center gap-2 shadow-xl"
            >
              <span className="text-lg">🚀</span>
              <div>
                <p className="text-xs font-semibold text-foreground">
                  Currently building
                </p>
                <p className="text-[10px] text-muted-foreground">
                  Next-gen portfolio
                </p>
              </div>
            </motion.div>

            {/* Floating badge — top right */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute -top-4 -right-4 glass-strong rounded-2xl px-4 py-3 flex items-center gap-2 shadow-xl"
            >
              <span className="text-lg">✨</span>
              <div>
                <p className="text-xs font-semibold text-foreground">
                  Open to work
                </p>
                <p className="text-[10px] text-muted-foreground">
                  Full-time / Freelance
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

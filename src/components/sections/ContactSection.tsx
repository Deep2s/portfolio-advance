"use client";

import { motion } from "framer-motion";

const contactMethods = [
  {
    icon: "✉️",
    label: "Email",
    value: "hello@deepg.dev",
    href: "mailto:hello@deepg.dev",
  },
  {
    icon: "💼",
    label: "LinkedIn",
    value: "linkedin.com/in/deepg",
    href: "https://linkedin.com",
  },
  {
    icon: "🐙",
    label: "GitHub",
    value: "github.com/deepg",
    href: "https://github.com",
  },
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative py-24 sm:py-32 overflow-hidden"
      aria-label="Contact section"
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-gradient-to-r from-[oklch(0.65_0.22_290/8%)] to-[oklch(0.75_0.15_200/8%)] blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold uppercase tracking-[0.25em] text-[oklch(0.65_0.22_290)] mb-4"
        >
          — Get In Touch
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6"
        >
          Let&apos;s build something{" "}
          <span className="text-gradient">incredible</span> together
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted-foreground text-lg max-w-xl mx-auto mb-12"
        >
          Whether you have a project in mind, want to collaborate, or just want
          to say hello — my inbox is always open.
        </motion.p>

        {/* CTA button */}
        <motion.a
          href="mailto:hello@deepg.dev"
          id="contact-email-cta"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-3 px-10 py-5 rounded-full font-bold text-base bg-gradient-to-r from-[oklch(0.65_0.22_290)] to-[oklch(0.75_0.15_200)] text-white shadow-2xl hover:shadow-[0_0_60px_oklch(0.65_0.22_290/40%)] transition-all duration-300 mb-16"
        >
          <span>Say Hello 👋</span>
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </motion.a>

        {/* Contact method pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {contactMethods.map((method) => (
            <a
              key={method.label}
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 glass rounded-2xl px-5 py-3 hover:glass-strong hover:border-white/20 transition-all duration-300"
            >
              <span className="text-xl group-hover:scale-110 transition-transform duration-200">
                {method.icon}
              </span>
              <div className="text-left">
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                  {method.label}
                </p>
                <p className="text-xs font-semibold text-foreground/80 group-hover:text-foreground transition-colors">
                  {method.value}
                </p>
              </div>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

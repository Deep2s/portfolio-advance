"use client";

import { motion } from "framer-motion";

const socialLinks = [
  { label: "GitHub", href: "https://github.com", icon: "GH" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "LI" },
  { label: "Twitter", href: "https://twitter.com", icon: "TW" },
  { label: "Email", href: "mailto:hello@example.com", icon: "@" },
];

export default function Footer() {
  return (
    <footer
      className="relative border-t border-border/30 bg-background/80"
      aria-label="Footer"
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[oklch(0.65_0.22_290)] to-[oklch(0.75_0.15_200)] flex items-center justify-center text-sm font-bold text-white">
              D
            </div>
            <div>
              <p className="font-semibold text-foreground/80 text-sm">
                deepg.dev
              </p>
              <p className="text-muted-foreground text-xs">
                Crafted with care ✦ {new Date().getFullYear()}
              </p>
            </div>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-3"
          >
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                aria-label={link.label}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full glass flex items-center justify-center text-xs font-bold text-muted-foreground hover:text-foreground hover:border-[oklch(0.65_0.22_290)/50%] hover:glow-purple transition-all duration-300"
              >
                {link.icon}
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const navLinks = [
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
];

export default function Navbar() {
  const { scrollY, progress } = useScrollProgress();
  const [menuOpen, setMenuOpen] = useState(false);
  const isScrolled = scrollY > 50;

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-7 left-0 right-0 z-50 transition-all duration-500",
          isScrolled ? "glass-strong py-3 shadow-lg shadow-black/8" : "py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="group flex items-center gap-2"
            aria-label="Home"
          >
            <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[oklch(0.65_0.22_290)] to-[oklch(0.75_0.15_200)] flex items-center justify-center text-sm font-bold text-white shadow-md group-hover:scale-110 transition-transform duration-300">
              D
            </span>
            <span className="font-semibold text-foreground/90 hidden sm:block">
              deepg<span className="text-gradient">.dev</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 group"
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute inset-0 rounded-lg bg-black/4 dark:bg-white/5 scale-0 group-hover:scale-100 transition-transform duration-200 origin-center" />
              </a>
            ))}
            <a
              href="#contact"
              className="ml-4 px-5 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-[oklch(0.65_0.22_290)] to-[oklch(0.75_0.15_200)] text-white hover:opacity-90 hover:scale-105 transition-all duration-200 shadow-md"
            >
              Talk to deepak
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            id="menu-toggle"
            className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-200"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span
              className={cn(
                "w-5 h-0.5 bg-foreground/70 rounded transition-all duration-300",
                menuOpen && "rotate-45 translate-y-2"
              )}
            />
            <span
              className={cn(
                "w-5 h-0.5 bg-foreground/70 rounded transition-all duration-300",
                menuOpen && "opacity-0 scale-x-0"
              )}
            />
            <span
              className={cn(
                "w-5 h-0.5 bg-foreground/70 rounded transition-all duration-300",
                menuOpen && "-rotate-45 -translate-y-2"
              )}
            />
          </button>
        </div>

        {/* Scroll progress bar */}
        <div
          className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-[oklch(0.65_0.22_290)] via-[oklch(0.75_0.15_200)] to-[oklch(0.65_0.22_290)] transition-opacity duration-300"
          style={{
            width: `${progress}%`,
            opacity: isScrolled ? 1 : 0,
          }}
        />
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-[100px] left-4 right-4 z-40 glass-strong rounded-2xl p-4 md:hidden"
          >
            <nav className="flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="#contact"
                className="mt-2 px-4 py-3 rounded-xl text-sm font-semibold text-center bg-gradient-to-r from-[oklch(0.65_0.22_290)] to-[oklch(0.75_0.15_200)] text-white"
                onClick={() => setMenuOpen(false)}
              >
                Talk to deepak
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

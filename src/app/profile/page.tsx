"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import TransitionWrapper from "@/components/layout/TransitionWrapper";
import { motion } from "framer-motion";
import {
  GitBranch,
  Briefcase,
  Mail,
  Download,
  Code2,
  Cpu,
  Globe,
  Layout,
  Database,
  GraduationCap,
  Languages,
  Phone,
  Send,
  Cloud,
} from "lucide-react";

/* Load desk environment without SSR (Three.js needs browser APIs) */
const DeskEnvironment = dynamic(
  () => import("@/components/Hero/DeskEnvironment"),
  { ssr: false }
);

const PROFILE_PHRASES = [
  "Full Stack Engineer",
  "Generative AI Engineer",
  "Mobile App Specialist",
  "Backend & API Architect",
];

function ProfileTypewriter() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    if (subIndex === PROFILE_PHRASES[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), 2200);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % PROFILE_PHRASES.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 35 : 70);

    return () => clearTimeout(timeout);
  }, [subIndex, reverse, index]);

  useEffect(() => {
    const timeout = setTimeout(() => setBlink((prev) => !prev), 500);
    return () => clearTimeout(timeout);
  }, [blink]);

  const currentText = PROFILE_PHRASES[index].substring(0, subIndex);

  return (
    <div className="h-[28px] sm:h-[32px] flex items-center justify-start select-none font-mono text-sm sm:text-base font-semibold tracking-wide text-neutral-800 mb-4">
      <span className="flex flex-wrap justify-start">
        {currentText.split("").map((char, charIdx) => (
          <motion.span
            key={`${index}-${charIdx}`}
            initial={{ opacity: 0, scale: 0.8, y: 2 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              type: "spring",
              damping: 15,
              stiffness: 400,
            }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>
      <span
        className={`inline-block w-[2px] h-[0.9em] ml-1 rounded-full transition-all duration-150 bg-neutral-800 ${
          blink ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}


export default function ProfilePage() {
  const skills = [
    { name: "React & Next.js", icon: <Layout className="w-4 h-4" /> },
    { name: "NestJS & Node.js", icon: <Database className="w-4 h-4" /> },
    { name: "React Native & Mobile", icon: <Globe className="w-4 h-4" /> },
    { name: "Microservices & APIs", icon: <Cpu className="w-4 h-4" /> },
    { name: "PostgreSQL & MySQL", icon: <Code2 className="w-4 h-4" /> },
    { name: "AWS & Deployments", icon: <Cloud className="w-4 h-4" /> },
  ];

  return (
    <TransitionWrapper>
      <div className="relative w-full h-full overflow-hidden font-poppins">
        {/* ── Three.js desk scene — full background ── */}
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <DeskEnvironment />
        </div>

        {/* ── Subtle light overlay on left side for text readability ── */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.4) 25%, rgba(255,255,255,0) 45%)",
          }}
        />

        {/* ── Scrollable content layer ── */}
        <div className="absolute inset-0 z-10 w-full h-full overflow-y-auto overflow-x-hidden pt-24 pb-32 px-6 sm:px-12 md:px-20 scroll-smooth" style={{ pointerEvents: "none" }}>
          <div className="max-w-3xl pl-0 sm:pl-12" style={{ pointerEvents: "auto" }}>

            {/* Header */}
            <header className="mb-16">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
              >
                <p className="text-neutral-500 text-sm font-medium tracking-widest uppercase mb-3">
                  Hello, I'm
                </p>
                <h1 className="text-3xl sm:text-4xl font-[200] tracking-tight mb-2 text-neutral-900">
                  <span className="font-[700] text-transparent bg-clip-text bg-gradient-to-r from-neutral-950 to-neutral-700">
                    Deepak Mittal
                  </span>
                </h1>
                
                <ProfileTypewriter />
                
                <p className="text-lg sm:text-xl text-neutral-600 max-w-xl font-light leading-relaxed">
                  Generative AI Developer &amp; Full Stack Engineer crafting scalable web, mobile, and intelligent applications.
                </p>
              </motion.div>
            </header>

            {/* Cards row */}
            <div className="flex flex-col gap-8">

              {/* About card */}
              <motion.section
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="px-1"
              >
                <h2 className="text-xl font-semibold mb-4 text-neutral-800">
                  About Me
                </h2>
                <div className="space-y-3 text-neutral-600 font-light text-sm leading-relaxed">
                  <p>
                    I am a Full Stack Engineer with over 3 years of experience building scalable web and mobile applications with strong backend expertise. I specialize in designing modular REST APIs and microservice-based systems using NestJS, Node.js, and TypeScript, backed by PostgreSQL and MySQL databases, with deployment on AWS.
                  </p>
                  <p>
                    Focused on clean architecture, performance optimization, and delivering reliable, maintainable solutions for real-world business use cases, I enjoy integrating intelligent features and creating seamless user journeys.
                  </p>
                </div>
              </motion.section>

              {/* Skills card */}
              <motion.section
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="px-1"
              >
                <h2 className="text-xl font-semibold mb-4 text-neutral-800">
                  Core Focus
                </h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-200 bg-white/60 text-neutral-700 text-sm backdrop-blur-md shadow-sm"
                    >
                      {skill.icon}
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* Education Section */}
              <motion.section
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="px-1"
              >
                <h2 className="text-xl font-semibold mb-4 text-neutral-800 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-neutral-600" />
                  Education
                </h2>
                <div className="space-y-4">
                  <div className="border-l-2 border-neutral-200 pl-4 py-1">
                    <h3 className="text-sm font-semibold text-neutral-800">
                      Master of Computer Applications (MCA)
                    </h3>
                    <p className="text-xs text-neutral-500 font-light">
                      University of Rajasthan, Jaipur | 2021 – 2023
                    </p>
                  </div>
                  <div className="border-l-2 border-neutral-200 pl-4 py-1">
                    <h3 className="text-sm font-semibold text-neutral-800">
                      Bachelors in Commerce (BCOM - Computers)
                    </h3>
                    <p className="text-xs text-neutral-500 font-light">
                      University of Rajasthan, Jaipur | 2018 – 2021
                    </p>
                  </div>
                </div>
              </motion.section>

              {/* Languages Section */}
              <motion.section
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.48, ease: "easeOut" }}
                className="px-1"
              >
                <h2 className="text-xl font-semibold mb-4 text-neutral-800 flex items-center gap-2">
                  <Languages className="w-5 h-5 text-neutral-600" />
                  Languages
                </h2>
                <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-neutral-600 font-light">
                  <div>
                    <span className="font-semibold text-neutral-800">English:</span> Professional proficiency
                  </div>
                  <div>
                    <span className="font-semibold text-neutral-800">Hindi:</span> Native/Bilingual proficiency
                  </div>
                </div>
              </motion.section>

              {/* Connect row */}
              <motion.section
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.55, ease: "easeOut" }}
                className="flex flex-wrap gap-3"
              >
                <a
                  href="https://github.com/Deep2s"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-neutral-200 bg-white/70 backdrop-blur-md hover:bg-neutral-50 transition-all duration-300 text-neutral-700 text-sm font-medium shadow-sm"
                >
                  <GitBranch className="w-4 h-4 text-neutral-500" />
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/thedeepg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-neutral-200 bg-white/70 backdrop-blur-md hover:bg-neutral-50 transition-all duration-300 text-neutral-700 text-sm font-medium shadow-sm"
                >
                  <Briefcase className="w-4 h-4 text-neutral-500" />
                  LinkedIn
                </a>

                <a
                  href="tel:+918619378143"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-neutral-200 bg-white/70 backdrop-blur-md hover:bg-neutral-50 transition-all duration-300 text-neutral-700 text-sm font-medium shadow-sm"
                >
                  <Phone className="w-4 h-4 text-neutral-500" />
                  +91 8619378143
                </a>
                <a
                  href="/hire"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 text-white text-sm font-semibold hover:scale-105 transition-transform duration-300 shadow-md"
                >
                  <Send className="w-4 h-4" />
                  Hire Me
                </a>
                <a
                  href="/resume.pdf"
                  download="Deepak_Mittal_Resume.pdf"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 text-white text-sm font-semibold hover:scale-105 transition-transform duration-300 shadow-md"
                >
                  <Download className="w-4 h-4" />
                  Resume
                </a>
              </motion.section>
            </div>
          </div>
        </div>
      </div>
    </TransitionWrapper>
  );
}

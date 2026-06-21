"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import TransitionWrapper from "@/components/layout/TransitionWrapper";
import { Building2, User } from "lucide-react";

const TYPEWRITER_PHRASES = [
  "Professional Journey.",
  "Corporate Experience.",
  "Freelance & Independent."
];

const PHRASE_COLORS = [
  "text-white",
  "text-[#fdfbf7]", // Light Cream
  "text-[#f59e0b]"  // Golden
];

const CURSOR_COLORS = [
  "bg-white",
  "bg-[#fdfbf7]",
  "bg-[#f59e0b]"
];

function TypewriterHeader() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    if (subIndex === TYPEWRITER_PHRASES[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), 2200);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % TYPEWRITER_PHRASES.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 60 : 100);

    return () => clearTimeout(timeout);
  }, [subIndex, reverse, index]);

  useEffect(() => {
    const timeout = setTimeout(() => setBlink((prev) => !prev), 500);
    return () => clearTimeout(timeout);
  }, [blink]);

  const currentText = TYPEWRITER_PHRASES[index].substring(0, subIndex);

  return (
    <h1 className={`text-4xl sm:text-5xl font-bold tracking-tight mb-4 min-h-[48px] sm:min-h-[56px] flex items-center justify-center select-none transition-colors duration-300 ${PHRASE_COLORS[index]}`}>
      <span className="flex flex-wrap justify-center">
        {currentText.split("").map((char, charIdx) => (
          <motion.span
            key={`${index}-${charIdx}`}
            initial={{ opacity: 0, scale: 0.6, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              type: "spring",
              damping: 15,
              stiffness: 350,
            }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>
      <span
        className={`inline-block w-[3px] h-[0.8em] ml-2 rounded-full transition-all duration-150 ${CURSOR_COLORS[index]} ${
          blink ? "opacity-100" : "opacity-0"
        }`}
      />
    </h1>
  );
}

// Dynamically import Three.js components to avoid SSR issues
const Canvas = dynamic(
  () => import("@react-three/fiber").then((mod) => mod.Canvas),
  { ssr: false }
);

const ExperienceBackground = dynamic(
  () => import("@/components/three/ExperienceBackground"),
  { ssr: false }
);

interface JobExperience {
  role: string;
  company: string;
  period: string;
  description: string[];
  skills: string[];
}

const CORPORATE_EXPERIENCES: JobExperience[] = [
  {
    role: "Full Stack Developer",
    company: "Qnix Pvt Ltd",
    period: "Mar 2025 - Present",
    description: [
      "Developing enterprise-level organization management platforms using React and TypeScript, enabling large teams to manage users, roles, workflows, and operational data efficiently.",
      "Architecting scalable frontend systems with reusable components, modular structure, and optimized state management for maintainable and high-performance applications.",
      "Designing and implementing a GIS research tool with map-driven workflows, supporting geospatial visualization, analytics, and real-time location-based insights.",
      "Integrated Google Maps and KML/GeoJSON layers to render custom markers, polygons, routes, and spatial datasets for interactive geographic analysis.",
      "Developed real-time data synchronization and API integrations, ensuring smooth communication between frontend and backend services.",
      "Contributed to React Native mobile applications, building cross-platform features and maintaining consistent UX across Android and iOS.",
      "Improved application performance, reducing load times and enhancing responsiveness for enterprise-scale users."
    ],
    skills: ["TypeScript", "JavaScript", "SQL", "React.js", "React Native", "D3.js", "Google Maps API", "REST APIs", "Node.js", "NestJS", "MySQL", "Microservices"]
  },
  {
    role: "Full Stack Developer",
    company: "Codeprism Technologies Pvt Ltd",
    period: "Jan 2023 - Jan 2025",
    description: [
      "Led end-to-end development of enterprise-grade web applications using React.js, TypeScript, and NestJS, delivering scalable and maintainable full-stack solutions.",
      "Designed and built responsive frontend architectures with reusable components, custom hooks, and optimized state management, improving performance and developer productivity.",
      "Developed complex dashboards and admin panels with dynamic tables, filters, forms, and role-based workflows used by large-scale government and enterprise users.",
      "Implemented data visualization features using D3.js and interactive graphs, enabling users to analyze large and complex datasets efficiently.",
      "Improved page load performance by optimizing rendering, lazy loading, code-splitting, and API caching, resulting in faster UI responsiveness.",
      "Integrated real-time systems and voice/call workflows, ensuring low latency and high concurrency handling for production use cases.",
      "Created shared UI components, backend modules, and internal packages, standardizing architecture across projects and reducing development time."
    ],
    skills: ["TypeScript", "JavaScript", "SQL", "React.js", "D3.js", "NestJS", "PostgreSQL", "MySQL", "REST APIs", "LiveKit", "Docker", "Git", "Postman", "NextJS", "Ionic", "Angular", "Redux"]
  }
];

const FREELANCE_EXPERIENCES: JobExperience[] = [
  {
    role: "Full Stack Developer Intern",
    company: "Naresh IT (Hyderabad)",
    period: "June 2022 - Nov 2022",
    description: [
      "Worked on building responsive web applications using React and Node.js, developed reusable UI components, integrated REST APIs, and assisted in implementing backend features and database operations."
    ],
    skills: ["React.js", "Node.js", "REST APIs", "JavaScript", "HTML5", "CSS3", "Git"]
  },
  {
    role: "Independent Project Lead",
    company: "Travel Booking / Management System",
    period: "2024",
    description: [
      "Developed a full-stack travel booking system with package listings, search, filters, and seamless booking workflows.",
      "Built an admin panel to manage customers, bookings, payments, and agent-based reservations, with secure role-based access and real-time data updates."
    ],
    skills: ["React.js", "Next.js", "Node.js", "Nest.js", "PostgreSQL", "REST APIs", "TailwindCSS"]
  },
  {
    role: "Mobile App Developer",
    company: "Restaurant Food Delivery System",
    period: "2023",
    description: [
      "Engineered a mobile-first food delivery system with Android and iOS apps supporting cart, checkout, and secure payments.",
      "Designed an admin dashboard to handle order lifecycle management, customer data, menu updates, and transaction tracking with real-time API integration."
    ],
    skills: ["React Native", "TypeScript", "SQL", "REST APIs", "Node.js", "Mobile Development"]
  }
];

function ExperienceCard({ job, highlightColor = "bg-neutral-600" }: { job: JobExperience; highlightColor?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="group relative flex flex-col justify-between p-8 rounded-[32px] border border-white/10 bg-white/[0.02] backdrop-blur-md overflow-hidden transition-all duration-300 hover:bg-white/[0.06] hover:border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
    >
      {/* Accent Indicator Bar */}
      <div className={`absolute top-0 left-8 right-8 h-[2px] ${highlightColor} opacity-50 group-hover:opacity-100 transition-opacity duration-300`} />

      <div className="space-y-4">
        {/* Card Header */}
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block mb-1">
              {job.company}
            </span>
            <h3 className="text-xl font-semibold tracking-tight text-white group-hover:text-white transition-colors duration-300">
              {job.role}
            </h3>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] text-neutral-400 group-hover:text-neutral-200 transition-colors duration-300 select-none">
            {job.period}
          </span>
        </div>

        {/* Bullets */}
        <ul className="space-y-2.5 text-sm font-light text-neutral-300 leading-relaxed">
          {job.description.map((bullet, bIdx) => (
            <li key={bIdx} className="flex items-start gap-2.5">
              <span className="text-amber-500 mt-1.5 font-bold text-xs select-none">•</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Tech Tags */}
      <div className="flex flex-wrap gap-1.5 pt-6 mt-auto">
        {job.skills.map((skill, sIdx) => (
          <span
            key={sIdx}
            className="px-2.5 py-1 rounded-md bg-black/40 border border-white/5 text-[#fdfbf7]/70 text-[10px] font-medium tracking-wider uppercase font-mono"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function ExperiencePage() {
  return (
    <TransitionWrapper>
      <div className="relative w-full h-screen overflow-hidden font-poppins bg-[#0b0a0f] text-neutral-200">

        {/* ── Three.js Particle Wave Background ── */}
        <div className="absolute inset-0 z-0 h-full w-full pointer-events-none" aria-hidden="true">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 60 }}
            gl={{ antialias: true, alpha: true }}
            style={{ width: "100%", height: "100%" }}
            dpr={[1, 2]}
          >
            <ExperienceBackground />
          </Canvas>
        </div>

        {/* ── Dark gradient wash for readability ── */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background: "radial-gradient(circle at 10% 30%, rgba(11, 10, 15, 0.94) 0%, rgba(11, 10, 15, 0.8) 60%, rgba(11, 10, 15, 0.3) 100%)"
          }}
        />

        {/* ── Scrollable Content Layer ── */}
        <div className="absolute inset-0 z-10 w-full h-full overflow-y-auto overflow-x-hidden pt-24 pb-32 px-6 sm:px-12 md:px-24 scroll-smooth" style={{ pointerEvents: "none" }}>
          <div className="max-w-5xl mx-auto pl-0 sm:pl-16" style={{ pointerEvents: "auto" }}>
            
            <header className="mb-20 text-center flex flex-col items-center select-none">
              <TypewriterHeader />

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-sm sm:text-base text-neutral-400 font-light max-w-xl leading-relaxed text-center"
              >
                An overview of engineering projects, studio creations, and corporate roles spanning frontend, backend, and 3D graphics.
              </motion.p>
            </header>

            {/* Section: Corporate Experience */}
            <section className="mb-20">
              <h2 className="text-2xl font-light tracking-wide mb-8 border-b border-white/10 pb-3 flex items-center gap-3 select-none">
                <Building2 className="text-white/80" size={22} />
                Corporate Experience
              </h2>
              <div className="flex flex-col gap-8">
                {CORPORATE_EXPERIENCES.map((job, idx) => (
                  <ExperienceCard key={idx} job={job} highlightColor="bg-white/40" />
                ))}
              </div>
            </section>

            {/* Section: Freelance & Independent */}
            <section className="mb-10">
              <h2 className="text-2xl font-light tracking-wide mb-8 border-b border-white/10 pb-3 flex items-center gap-3 select-none">
                <User className="text-amber-500/80" size={22} />
                Freelance &amp; Independent
              </h2>
              <div className="flex flex-col gap-8">
                {FREELANCE_EXPERIENCES.map((job, idx) => (
                  <ExperienceCard key={idx} job={job} highlightColor="bg-amber-500/40" />
                ))}
              </div>
            </section>

          </div>
        </div>

      </div>
    </TransitionWrapper>
  );
}

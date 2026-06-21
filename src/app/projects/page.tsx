"use client";

import ProjectsBackground from "@/components/projects/ProjectsBackground";
import { ExternalLink, GraduationCap, Briefcase, Lock, Database } from "lucide-react";

type ProjectType = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  link?: string;
  demoCredentials?: {
    mobile: string;
    password: string;
  };
};

const OWN_PROJECTS: ProjectType[] = [
  {
    id: "01",
    title: "BookMyGrooming",
    subtitle: "Salon Booking Platform",
    description: "An all-in-one salon booking platform designed to streamline appointments, client management, and business operations. Self-developed own product.",
    tags: ["React", "TypeScript", "Node.js", "NestJS", "PostgreSQL", "AWS"],
    link: "https://bookmygrooming.com"
  },
  {
    id: "02",
    title: "DigiMadhavan",
    subtitle: "Pet Industry Digital Partner",
    description: "A collaborative partnership venture and digital platform dedicated to serving the pet care and grooming industry.",
    tags: ["Next.js", "TypeScript", "TailwindCSS", "AWS", "Pet Care"],
    link: "https://digimadhavan.com"
  },
  {
    id: "03",
    title: "DigiMadhavan Portal",
    subtitle: "Online Pet Clinic Management",
    description: "An online pet clinic management tool facilitating patient records, vet consultations, and clinic operations. Developed as an own product venture.",
    tags: ["React.js", "TypeScript", "Node.js", "PostgreSQL", "MySQL", "AWS"],
    link: "https://portal.digimadhavan.com/",
    demoCredentials: {
      mobile: "9876543211",
      password: "password123"
    }
  },
  {
    id: "04",
    title: "Kanah Cosmetics",
    subtitle: "Cosmetics E-Commerce Brand",
    description: "An elegant e-commerce platform and digital brand identity for cosmetics and skin care products. Self-developed and owned brand.",
    tags: ["Next.js", "TypeScript", "TailwindCSS", "E-Commerce", "Brand Development"],
    link: "https://kanah.in"
  }
];

const PROFESSIONAL_PROJECTS: ProjectType[] = [
  {
    id: "05",
    title: "Restaurant Food Ordering App",
    subtitle: "Client Mobile Application",
    description: "Engineered a mobile-first food delivery system with Android and iOS apps supporting cart, checkout, and secure payments.",
    tags: ["React Native", "TypeScript", "Node.js", "MySQL", "Mobile Development"],
    link: "https://play.google.com/store/apps/details?id=com.thedeepg.ashirwad"
  },
  {
    id: "06",
    title: "Prism LMS",
    subtitle: "Corporate Learning Management",
    description: "A comprehensive corporate Learning Management System (LMS) designed for tracking, documenting, and delivering educational courses.",
    tags: ["Next.js", "TypeScript", "Node.js", "NestJS", "PostgreSQL", "AWS"],
    link: "https://prismlms.com"
  },
  {
    id: "07",
    title: "GIS Research & Survey App",
    subtitle: "Geospatial Visualization & Analysis",
    description: "A GIS research tool with map-driven workflows, supporting geospatial visualization, analytics, and real-time location-based insights.",
    tags: ["React.js", "Google Maps API", "PostgreSQL", "AWS", "GeoJSON"]
  },
  {
    id: "08",
    title: "Learning Management System",
    subtitle: "Corporate Training & Delivery",
    description: "Designed and built high-performance enterprise-grade learning management platform with course delivery workflows.",
    tags: ["React", "TypeScript", "NestJS", "PostgreSQL", "AWS"]
  },
  {
    id: "09",
    title: "Admin Panels & Dashboards",
    subtitle: "Enterprise Management Systems",
    description: "Developed complex administrative dashboards and panels with dynamic tables, interactive charts, and role-based workflows.",
    tags: ["React.js", "D3.js", "TypeScript", "PostgreSQL", "MySQL"]
  }
];

function ProjectCard({ project }: { project: ProjectType }) {
  const isClickable = !!project.link;

  const cardContent = (
    <>
      {/* Number Watermark */}
      <span className="absolute top-4 right-6 text-[80px] font-bold text-white/[0.04] select-none pointer-events-none group-hover:text-white/[0.08] transition-colors duration-500">
        {project.id}
      </span>

      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-mono">
            {project.subtitle}
          </span>
          {isClickable ? (
            <ExternalLink className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white transition-colors" />
          ) : (
            <Lock className="w-3 h-3 text-neutral-600" />
          )}
        </div>
        <h3 className="text-xl font-semibold tracking-tight mb-3 text-white/90 group-hover:text-white transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-white/60 leading-relaxed font-light mb-6">
          {project.description}
        </p>

        {project.demoCredentials && (
          <div className="mb-6 p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 text-xs text-white/70 font-mono select-text">
            <div className="text-[9px] text-white/40 uppercase tracking-widest mb-1.5 font-bold">
              Demo Credentials
            </div>
            <div className="flex flex-col gap-1">
              <div><span className="text-white/40">Mobile:</span> {project.demoCredentials.mobile}</div>
              <div><span className="text-white/40">Password:</span> {project.demoCredentials.password}</div>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5 mt-auto">
        {project.tags.map((tag) => (
          <span 
            key={tag}
            className="text-[10px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-full border border-white/5 bg-black/30 text-white/50"
          >
            {tag}
          </span>
        ))}
      </div>
    </>
  );

  if (isClickable && project.link) {
    return (
      <a 
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex flex-col justify-between p-8 rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-md overflow-hidden transition-all duration-500 hover:bg-white/[0.08] hover:border-white/20 hover:-translate-y-2 shadow-[0_8px_32px_rgba(0,0,0,0.3)] cursor-pointer"
      >
        {cardContent}
      </a>
    );
  }

  return (
    <div 
      className="group relative flex flex-col justify-between p-8 rounded-[32px] border border-white/5 bg-white/[0.01] backdrop-blur-md overflow-hidden transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
    >
      {cardContent}
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <div className="relative w-full h-full bg-[#050505] text-white overflow-hidden">
      <ProjectsBackground />
      
      {/* Scrollable Content Overlay */}
      <div className="absolute inset-0 z-10 w-full h-full overflow-y-auto overflow-x-hidden pt-24 pb-32 px-6 sm:px-12 md:px-24 scroll-smooth">
        
        <div className="max-w-5xl mx-auto pl-0 md:pl-16">
          <header className="mb-20">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-[200] tracking-tight mb-4 drop-shadow-md">
              Selected <span className="font-[600]">Works</span>
            </h1>
            <p className="text-lg text-white/60 max-w-xl font-light tracking-wide">
              A curated showcase of self-developed ventures, client projects, and professional software solutions.
            </p>
          </header>

          {/* Section: Own Products */}
          <section className="mb-20">
            <h2 className="text-2xl font-light tracking-wide mb-8 border-b border-white/10 pb-3 flex items-center gap-3 select-none">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              Own Products &amp; Ventures
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {OWN_PROJECTS.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>

          {/* Section: Professional Work */}
          <section className="mb-10">
            <h2 className="text-2xl font-light tracking-wide mb-8 border-b border-white/10 pb-3 flex items-center gap-3 select-none">
              <span className="w-2 h-2 rounded-full bg-white/20" />
              Client &amp; Corporate Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PROFESSIONAL_PROJECTS.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}

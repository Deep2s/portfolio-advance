import ProjectsBackground from "@/components/projects/ProjectsBackground";
import Link from "next/link";

const PROJECTS = [
  {
    id: "01",
    title: "Cinematic Weather",
    description: "A hybrid 3D weather experience built with React Three Fiber, Spline, and Open-Meteo. Features real-time environmental syncing and dynamic particle systems.",
    tags: ["React", "Three.js", "Framer Motion", "Spline"],
    link: "/weather"
  },
  {
    id: "02",
    title: "Project Alpha",
    description: "An interactive spatial interface for modern web applications. Explores the intersection of 2D layout and 3D depth using WebGL.",
    tags: ["Next.js", "WebGL", "GSAP"],
    link: "/projects/alpha"
  },
  {
    id: "03",
    title: "E-Commerce Reimagined",
    description: "A proof of concept for a headless storefront focusing on micro-interactions and scroll-driven animations.",
    tags: ["Shopify", "React", "Tailwind"],
    link: "/projects/ecommerce"
  },
  {
    id: "04",
    title: "AI Chat Interface",
    description: "A natural language interface with real-time markdown parsing and beautiful code block syntax highlighting.",
    tags: ["OpenAI", "React", "WebSocket"],
    link: "/projects/ai-chat"
  }
];

export default function ProjectsPage() {
  return (
    <div className="relative w-full h-full bg-[#050505] text-white overflow-hidden">
      <ProjectsBackground />
      
      {/* Scrollable Content Overlay */}
      <div className="absolute inset-0 z-10 w-full h-full overflow-y-auto overflow-x-hidden pt-24 pb-32 px-6 sm:px-12 md:px-24 scroll-smooth">
        
        <div className="max-w-5xl mx-auto pl-0 sm:pl-16">
          <header className="mb-16">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-[200] tracking-tight mb-4 drop-shadow-md">
              Selected <span className="font-[600]">Works</span>
            </h1>
            <p className="text-lg text-white/60 max-w-xl font-light tracking-wide">
              A collection of digital experiences blending engineering, design, and motion.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROJECTS.map((project) => (
              <Link 
                key={project.id}
                href={project.link}
                className="group relative flex flex-col justify-between p-8 rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-md overflow-hidden transition-all duration-500 hover:bg-white/[0.08] hover:border-white/20 hover:-translate-y-2 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
              >
                {/* Number Watermark */}
                <span className="absolute top-4 right-6 text-[80px] font-bold text-white/[0.04] select-none pointer-events-none group-hover:text-white/[0.08] transition-colors duration-500">
                  {project.id}
                </span>

                <div>
                  <h2 className="text-2xl font-semibold tracking-tight mb-3 text-white/90 group-hover:text-white transition-colors">
                    {project.title}
                  </h2>
                  <p className="text-sm text-white/60 leading-relaxed font-light mb-8">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="text-[11px] font-medium tracking-wider uppercase px-3 py-1.5 rounded-full border border-white/10 bg-black/40 text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

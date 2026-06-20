import ProjectsBackground from "@/components/projects/ProjectsBackground";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import TransitionWrapper from "@/components/layout/TransitionWrapper";

export default function ProjectDetails({ params }: { params: { id: string } }) {
  // Generate a distinct theme color based on the project ID
  let themeColor = "#8ab4f8"; // default blue
  if (params.id === "alpha") themeColor = "#ff7b72"; // soft red/coral
  if (params.id === "ecommerce") themeColor = "#81c995"; // soft green
  if (params.id === "ai-chat") themeColor = "#c58af9"; // soft purple
  
  return (
    <TransitionWrapper>
      <div className="relative w-full h-full bg-[#050505] text-white overflow-hidden">
        <ProjectsBackground themeColor={themeColor} />
      
      {/* Scrollable Content Overlay */}
      <div className="absolute inset-0 z-10 w-full h-full overflow-y-auto overflow-x-hidden pt-20 pb-32 pr-8 pl-20 sm:pr-16 sm:pl-28 md:px-32 scroll-smooth">
        
        <div className="max-w-7xl mx-auto">
          <Link 
            href="/projects" 
            className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-12 text-sm font-medium tracking-wider uppercase"
          >
            <ArrowLeft size={16} />
            Back to Projects
          </Link>

          <header className="mb-16">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-[200] tracking-tight mb-6 drop-shadow-md">
              Project <span className="font-[600]">{params.id}</span>
            </h1>
            <div className="flex flex-wrap gap-3 mb-8">
              {["React", "Framer Motion", "WebGL"].map((tag) => (
                <span 
                  key={tag}
                  className="text-[12px] font-medium tracking-wider uppercase px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/80"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-xl sm:text-2xl text-white/70 max-w-2xl font-light tracking-wide leading-relaxed">
              This is the detailed case study for project {params.id}. It showcases the technical challenges, the design process, and the final execution.
            </p>
          </header>

          {/* Large Hero Image Placeholder */}
          <div className="w-full aspect-video rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-md mb-16 shadow-[0_8px_32px_rgba(0,0,0,0.3)] flex items-center justify-center">
            <span className="text-white/20 font-light tracking-widest uppercase text-lg">Hero Image / Video</span>
          </div>

          {/* Content Sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-white/80 font-light leading-relaxed">
            <div className="md:col-span-2 space-y-8">
              <h2 className="text-3xl font-medium text-white tracking-tight mb-4">The Challenge</h2>
              <p>
                Developing a high-performance web experience that balances stunning visual fidelity with seamless accessibility across all devices. We had to rethink the entire rendering pipeline.
              </p>
              <p>
                By leveraging modern tools and customized shaders, we were able to drop bundle sizes while drastically improving frame rates.
              </p>

              <h2 className="text-3xl font-medium text-white tracking-tight mb-4 pt-8">The Solution</h2>
              <p>
                A hybrid architecture utilizing the latest features of React Server Components alongside dynamic client-side 3D rendering.
              </p>
            </div>

            <div className="space-y-8 p-8 rounded-[24px] border border-white/10 bg-white/[0.02] backdrop-blur-sm h-fit">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50 mb-2">Role</h3>
                <p>Lead Engineer & Designer</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50 mb-2">Timeline</h3>
                <p>3 Months</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50 mb-2">Live Demo</h3>
                <a href="#" className="text-blue-400 hover:text-blue-300 underline decoration-white/20 underline-offset-4">View Website</a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    </TransitionWrapper>
  );
}

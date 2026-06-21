"use client";

import dynamic from "next/dynamic";
import TransitionWrapper from "@/components/layout/TransitionWrapper";
import { 
  Mail, 
  Phone, 
  Send,
  Sparkles
} from "lucide-react";

// Dynamically import WebGPU lights background to avoid SSR issues
const WebGPULightsCustom = dynamic(
  () => import("@/components/three/WebGPULightsCustom"),
  { ssr: false }
);

export default function HirePage() {
  return (
    <TransitionWrapper>
      <div className="relative w-full h-screen overflow-hidden font-poppins bg-[#0b0a0f] text-neutral-200">
        
        {/* ── WebGPU Lights Custom Background ── */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <WebGPULightsCustom className="w-full h-full" />
        </div>

        {/* ── Subtle gradient wash for text contrast on the left ── */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-[#0b0a0f]/95 to-[#0b0a0f]/90 md:bg-[linear-gradient(to_right,rgba(11,10,15,0.75)_0%,rgba(11,10,15,0.25)_45%,rgba(11,10,15,0)_100%)]"
        />

        {/* ── Scrollable Content Layer ── */}
        <div className="absolute inset-0 z-10 w-full h-full overflow-y-auto overflow-x-hidden pt-24 pb-32 px-6 sm:px-12 md:px-20 scroll-smooth" style={{ pointerEvents: "none" }}>
          <div className="max-w-5xl mx-auto pl-0 md:pl-12 text-left" style={{ pointerEvents: "auto" }}>
            
            {/* Header */}
            <header className="mb-10">
              <span className="text-xs font-bold tracking-widest text-amber-500 uppercase block mb-2 select-none">
                Hiring Options
              </span>
              <h1 className="text-4xl sm:text-5xl font-[200] tracking-tight mb-4 text-white">
                Hire <span className="font-[600]">Deepak Mittal</span>
              </h1>
              <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed max-w-2xl">
                Full Stack Developer with 3+ years of experience specializing in Next.js, NestJS, Node.js, PostgreSQL, MySQL, and AWS.
              </p>
            </header>

            {/* Content Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 w-full">
              
              {/* Left Column: Hiring Options */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-lg font-semibold text-white mb-2">1. Corporate Full-Time Engagement</h2>
                  <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed mb-3">
                    Available for Senior / Lead Full Stack Engineer and GenAI Developer positions. Expert in system architectures, microservices, NestJS, PostgreSQL, MySQL, and AWS.
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    <a
                      href="tel:+918619378143"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-neutral-900 border border-neutral-800 text-white text-xs font-semibold hover:bg-neutral-800 transition-colors shadow-md"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      Call +91 8619378143
                    </a>
                    <a
                      href="mailto:deepakmittald129@gmail.com?subject=Full-Time%20Hiring%20Inquiry%20-%20Deepak%20Mittal"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-900 text-xs font-semibold transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      Email Inquiry
                    </a>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-white mb-2">2. Contract &amp; Freelance Projects</h2>
                  <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed mb-3">
                    Consulting for SaaS MVPs (e.g. BookMyGrooming, DigiMadhavan Portal), custom GenAI / LLM pipelines, and map-driven GIS applications.
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    <a
                      href="tel:+918619378143"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-neutral-900 border border-neutral-800 text-white text-xs font-semibold hover:bg-neutral-800 transition-colors shadow-md"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      Call +91 8619378143
                    </a>
                    <a
                      href="mailto:deepakmittald129@gmail.com?subject=Freelance%20Project%20Inquiry%20-%20Deepak%20Mittal"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-900 text-xs font-semibold transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Email Project Details
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: Fresher Section */}
              <div>
                <h2 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                  <Sparkles className="w-4.5 h-4.5 text-amber-500" />
                  Free Resume Review &amp; Coding Help
                </h2>
                <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed mb-3">
                  If you are a fresher looking for feedback, I am ready to review your resume manually, offer coding guidance, or provide any career-related help to support you in getting a job.
                </p>
                <div className="flex flex-wrap gap-2.5">
                  <a
                    href="tel:+918619378143"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-neutral-900 border border-neutral-800 text-white text-xs font-semibold hover:bg-neutral-800 transition-colors shadow-md"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Call +91 8619378143
                  </a>
                  <a
                    href="mailto:deepakmittald129@gmail.com?subject=Fresher%20Resume%20Review%20/%20Coding%20Help%20Inquiry"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-900 text-xs font-semibold transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Email Request
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </TransitionWrapper>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";

import {
  Home,
  User,
  FolderGit2,
  Briefcase,
  Music,
  CloudSun,
  HeartHandshake,
  Menu,
  X
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close the drawer on navigation
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const icons: Array<{ name: string; href?: string; svg: React.ReactNode; onClick?: () => void }> = [
    {
      name: "Home",
      href: "/",
      svg: <Home size={18} strokeWidth={2} />
    },
    {
      name: "Profile",
      href: "/profile",
      svg: <User size={18} strokeWidth={2} />
    },
    {
      name: "Projects",
      href: "/projects",
      svg: <FolderGit2 size={18} strokeWidth={2} />
    },
    {
      name: "Experience",
      href: "/experience",
      svg: <Briefcase size={18} strokeWidth={2} />
    },
    {
      name: "Music",
      href: "/music",
      svg: <Music size={18} strokeWidth={2} />
    },
    {
      name: "Weather",
      href: "/weather",
      svg: <CloudSun size={18} strokeWidth={2} />
    },
    {
      name: "Hire Deepak",
      href: "/hire",
      svg: <HeartHandshake size={18} strokeWidth={2} />
    }
  ];

  return (
    <>
      {/* ── Desktop Sidebar ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="fixed left-4 top-1/2 -translate-y-1/2 z-[50] hidden md:flex flex-col justify-center gap-2 sm:gap-3 p-2 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] h-[auto]"
        style={{
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          border: "0.5px solid rgba(0, 0, 0, 0.12)",
          color: "#000000",
        }}
      >
        {icons.map((item, idx) => {
          const isActive = pathname === item.href;
          const content = (
            <>
              {item.svg}
              {/* Tooltip: Hidden on mobile, shows on right side on desktop */}
              <div className="hidden sm:block absolute left-full ml-3 px-2.5 py-1.5 bg-[rgba(255,255,255,0.95)] shadow-md text-black text-[12px] font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap" style={{
                border: "0.5px solid rgba(0, 0, 0, 0.1)",
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
              }}>
                {item.name}
              </div>
            </>
          );

          const itemClasses = `relative group flex-shrink-0 p-2.5 rounded-xl transition-colors flex items-center justify-center cursor-pointer ${
            isActive 
              ? "bg-black/10 text-[#b45309]" 
              : "hover:bg-black/5 text-neutral-800"
          }`;

          if (item.href) {
            return (
              <Link
                key={idx}
                href={item.href}
                className={itemClasses}
                aria-label={item.name}
              >
                {content}
              </Link>
            );
          }

          return (
            <button
              key={idx}
              onClick={item.onClick}
              className={itemClasses}
              aria-label={item.name}
            >
              {content}
            </button>
          );
        })}
      </motion.div>

      {/* ── Mobile Hamburger Button ── */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 left-6 z-[60] flex md:hidden items-center justify-center p-3 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.1)] cursor-pointer transition-transform hover:scale-105 active:scale-95"
        style={{
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          border: "0.5px solid rgba(0, 0, 0, 0.12)",
          color: "#000000",
        }}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
      </motion.button>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[55] bg-black/40 backdrop-blur-sm md:hidden"
            />

            {/* Drawer Content */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-[280px] max-w-[80vw] z-[58] p-6 pt-24 shadow-2xl flex flex-col md:hidden border-r border-black/10"
              style={{
                background: "rgba(255, 255, 255, 0.92)",
                backdropFilter: "blur(30px) saturate(190%)",
                WebkitBackdropFilter: "blur(30px) saturate(190%)",
                color: "#000000",
              }}
            >
              <div className="flex flex-col gap-2">
                {icons.map((item, idx) => {
                  const isActive = pathname === item.href;
                  const content = (
                    <>
                      <div className={isActive ? "text-[#b45309]" : "text-neutral-800"}>
                        {item.svg}
                      </div>
                      <span className={`text-[15px] font-medium tracking-wide ${
                        isActive ? "text-[#b45309] font-semibold" : "text-neutral-800"
                      }`}>
                        {item.name}
                      </span>
                    </>
                  );

                  const itemClasses = `relative flex items-center gap-4 p-3.5 rounded-2xl transition-all cursor-pointer w-full ${
                    isActive 
                      ? "bg-black/10" 
                      : "hover:bg-black/5 active:bg-black/10"
                  }`;

                  if (item.href) {
                    return (
                      <Link
                        key={idx}
                        href={item.href}
                        className={itemClasses}
                        aria-label={item.name}
                        onClick={() => setIsOpen(false)}
                      >
                        {content}
                      </Link>
                    );
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        item.onClick?.();
                        setIsOpen(false);
                      }}
                      className={itemClasses}
                      aria-label={item.name}
                    >
                      {content}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";

import {
  Home,
  User,
  FolderGit2,
  Briefcase,
  MessageSquare,
  Music,
  CloudSun,
  Lightbulb,
  HeartHandshake
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="fixed left-4 top-1/2 -translate-y-1/2 z-[50] flex flex-col justify-center gap-2 sm:gap-3 p-2 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] h-[auto]"
      style={{
        background: "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border: "0.5px solid rgba(0, 0, 0, 0.12)",
        color: "#000000",
      }}
    >
      {icons.map((item, idx) => {
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

        const itemClasses = "relative group flex-shrink-0 p-2.5 rounded-xl hover:bg-black/5 transition-colors flex items-center justify-center cursor-pointer";

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
  );
}

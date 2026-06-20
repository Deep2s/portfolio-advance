"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Sidebar() {
  const pathname = usePathname();

  const icons = [
    {
      name: "Home",
      href: "/",
      svg: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      )
    },
    {
      name: "Profile",
      svg: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      )
    },
    {
      name: "Projects",
      svg: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
        </svg>
      )
    },
    {
      name: "Contact",
      svg: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
      )
    },
    {
      name: "Talk",
      href: "/talk",
      svg: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      )
    },
    {
      name: "Music",
      href: "/music",
      svg: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18V5l12-2v13"></path>
          <circle cx="6" cy="18" r="3"></circle>
          <circle cx="18" cy="16" r="3"></circle>
        </svg>
      )
    }
  ];

  if (pathname === "/talk") return null;

  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="fixed left-4 top-1/2 -translate-y-1/2 z-[50] flex flex-col justify-center gap-3 p-2 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] h-[auto]"
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
            <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-[rgba(255,255,255,0.95)] shadow-md text-black text-[12px] font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap" style={{
              border: "0.5px solid rgba(0, 0, 0, 0.1)",
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            }}>
              {item.name}
            </div>
          </>
        );

        if (item.href) {
          return (
            <Link
              key={idx}
              href={item.href}
              className="relative group p-2.5 rounded-xl hover:bg-black/5 transition-colors flex items-center justify-center cursor-pointer"
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
            className="relative group p-2.5 rounded-xl hover:bg-black/5 transition-colors flex items-center justify-center cursor-pointer"
            aria-label={item.name}
          >
            {content}
          </button>
        );
      })}
    </motion.div>
  );
}

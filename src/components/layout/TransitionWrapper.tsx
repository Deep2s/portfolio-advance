"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function TransitionWrapper({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ clipPath: "inset(0 50% 0 50%)", filter: "brightness(0.5) blur(10px)" }}
      animate={{ clipPath: "inset(0 0% 0 0%)", filter: "brightness(1) blur(0px)" }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[40] bg-[#050505]"
    >
      {children}
    </motion.div>
  );
}

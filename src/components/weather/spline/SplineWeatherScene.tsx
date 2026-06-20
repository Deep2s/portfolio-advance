import Spline from "@splinetool/react-spline";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplineWeatherSceneProps {
  splineUrl: string;
}

export default function SplineWeatherScene({ splineUrl }: SplineWeatherSceneProps) {
  const [currentUrl, setCurrentUrl] = useState(splineUrl);

  // Smoothly crossfade when the Spline URL changes
  useEffect(() => {
    if (currentUrl !== splineUrl) {
      setCurrentUrl(splineUrl);
    }
  }, [splineUrl, currentUrl]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentUrl}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 w-full h-full"
        >
          {currentUrl.includes("placeholder") ? (
            <div className="absolute bottom-4 left-4 z-50">
              <div className="border border-dashed border-white/20 px-4 py-2 rounded-xl text-left backdrop-blur-md bg-black/40 shadow-2xl">
                <p className="text-white/80 font-medium text-xs mb-1">Spline Background Missing</p>
                <p className="text-white/50 text-[10px] max-w-[200px]">
                  Add your <code className="bg-white/10 px-1 py-0.5 rounded">.splinecode</code> URLs in <code className="bg-white/10 px-1 py-0.5 rounded">weatherEngine.ts</code>
                </p>
              </div>
            </div>
          ) : (
            <Spline 
              scene={currentUrl} 
              className="w-full h-full"
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

import BirdsBackground from "@/components/BirdsBackground";

export default function TalkPage() {
  return (
    <main className="relative h-screen w-full overflow-hidden -mt-11">
      {/* Background layer */}
      <BirdsBackground />
      
      {/* Content layer */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
        {/* Pointer events are none on this wrapper so the background can receive mouse events */}
        <div className="pointer-events-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Let&apos;s Talk
          </h1>
          <p className="text-xl text-white/80 drop-shadow-md text-center max-w-lg">
            Reach out for collaborations, questions, or just to say hi!
          </p>
        </div>
      </div>
    </main>
  );
}

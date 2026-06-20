"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, useMemo } from "react";
import { AudiusTrack, fetchTracksByCategory, getStreamUrl } from "@/lib/audius";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, List, X, Loader2, AlertCircle } from "lucide-react";

const MusicBackground = dynamic(() => import("@/components/MusicBackground"), {
  ssr: false,
});

export default function MusicPage() {
  const [tracks, setTracks] = useState<AudiusTrack[]>([]);
  const [currentTrack, setCurrentTrack] = useState<AudiusTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [playbackError, setPlaybackError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("Trending");
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  
  const categories = ["Trending", "Hindi", "Remix", "Background", "Creators"];
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  const hasInitialized = useRef(false);

  useEffect(() => {
    setHasMore(true);
    fetchTracksByCategory(activeCategory, 0).then((fetchedTracks) => {
      setTracks(fetchedTracks);
      if (fetchedTracks.length > 0) {
        if (!hasInitialized.current) {
          hasInitialized.current = true;
          // Select a random track by default on first load
          const randomIndex = Math.floor(Math.random() * fetchedTracks.length);
          const track = fetchedTracks[randomIndex];
          setCurrentTrack(track);
          // Set to play, the useEffect will handle the actual play call
          setIsPlaying(true);
          setIsBuffering(true);
        }
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory]);

  const loadMoreTracks = async () => {
    if (isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);
    try {
      const newTracks = await fetchTracksByCategory(activeCategory, tracks.length);
      if (newTracks.length === 0) {
        setHasMore(false);
      } else {
        setTracks(prev => {
          // Prevent duplicates by checking ids
          const existingIds = new Set(prev.map(t => t.id));
          const uniqueNewTracks = newTracks.filter(t => !existingIds.has(t.id));
          if (uniqueNewTracks.length === 0) setHasMore(false);
          return [...prev, ...uniqueNewTracks];
        });
      }
    } catch (e) {
      console.error("Failed to load more tracks:", e);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 100) {
      loadMoreTracks();
    }
  };

  useEffect(() => {
    const playCurrentTrack = async () => {
      if (audioRef.current && currentTrack && isPlaying) {
        try {
          initAudioContext();
          if (audioContextRef.current?.state === 'suspended') {
            await audioContextRef.current.resume();
          }
          await audioRef.current.play();
          setPlaybackError(null);
        } catch (e) {
          console.error("Auto-play error:", e);
          setIsPlaying(false);
          setIsBuffering(false);
          setPlaybackError("Playback failed. Please try again.");
        }
      }
    };
    
    playCurrentTrack();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack]);

  const initAudioContext = () => {
    if (!audioContextRef.current && audioRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioContextRef.current = ctx;

      const analyserNode = ctx.createAnalyser();
      analyserNode.fftSize = 2048;
      
      const source = ctx.createMediaElementSource(audioRef.current);
      source.connect(analyserNode);
      analyserNode.connect(ctx.destination);
      
      sourceRef.current = source;
      setAnalyser(analyserNode);
    }
  };

  const playTrack = async (track: AudiusTrack) => {
    if (track.id === currentTrack?.id) {
      togglePlay();
      return;
    }
    
    setCurrentTrack(track);
    setIsPlaying(true);
    setPlaybackError(null);
    setIsBuffering(true);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setPlaybackError(null);
      initAudioContext();
      if (audioContextRef.current?.state === 'suspended') {
        audioContextRef.current.resume();
      }
      setIsBuffering(true);
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(e => {
        console.error("Play error:", e);
        setIsPlaying(false);
        setIsBuffering(false);
        setPlaybackError("Playback failed. Please try again.");
      });
    }
  };

  const playNext = () => {
    if (tracks.length === 0) return;
    const currentIndex = tracks.findIndex(t => t.id === currentTrack?.id);
    const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % tracks.length : 0;
    playTrack(tracks[nextIndex]);
  };

  const playPrev = () => {
    if (tracks.length === 0) return;
    const currentIndex = tracks.findIndex(t => t.id === currentTrack?.id);
    const prevIndex = currentIndex >= 0 ? (currentIndex - 1 + tracks.length) % tracks.length : 0;
    playTrack(tracks[prevIndex]);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(e.target.value);
      setProgress(Number(e.target.value));
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const nextTrack = useMemo(() => {
    if (tracks.length === 0 || !currentTrack) return null;
    const currentIndex = tracks.findIndex(t => t.id === currentTrack.id);
    if (currentIndex >= 0 && currentIndex < tracks.length - 1) {
      return tracks[currentIndex + 1];
    }
    // Loop back to first track if at end
    return tracks[0];
  }, [tracks, currentTrack]);

  return (
    <main className="relative h-screen w-full overflow-hidden flex flex-col justify-between bg-black/20">
      <MusicBackground analyserNode={analyser} />

      {/* Main Audio Element */}
      <audio 
        ref={audioRef} 
        src={currentTrack ? getStreamUrl(currentTrack.id) : undefined}
        crossOrigin="anonymous"
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onEnded={playNext}
        onWaiting={() => setIsBuffering(true)}
        onPlaying={() => { setIsBuffering(false); setPlaybackError(null); }}
        onCanPlay={() => setIsBuffering(false)}
        onLoadStart={() => setIsBuffering(true)}
        onError={() => {
          setIsBuffering(false);
          setIsPlaying(false);
          setPlaybackError("Failed to load the audio stream.");
        }}
      />

      {/* Hidden Audio Element for Preloading Next Track */}
      {nextTrack && (
        <audio 
          src={getStreamUrl(nextTrack.id)} 
          preload="auto" 
          muted 
          style={{ display: 'none' }}
        />
      )}

      {/* Top Button */}
      <div className="absolute top-8 right-8 z-30">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 rounded-full glass-strong text-white font-semibold flex items-center gap-2 hover:bg-white/10 hover:scale-105 transition-all shadow-lg"
        >
          <List size={20} />
          Playlist
        </button>
      </div>

      {/* Playlist Sidebar */}
      <div 
        className={`absolute top-0 right-0 h-full w-full sm:w-96 glass-strong z-40 border-l border-white/10 shadow-2xl bg-black/60 backdrop-blur-2xl transition-transform duration-300 ease-in-out flex flex-col ${isModalOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6 pt-8 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white drop-shadow-md flex items-center gap-2"><List size={20} /> Playlist</h2>
          <button onClick={() => setIsModalOpen(false)} className="text-white/60 hover:text-white transition-colors hover:scale-110">
            <X size={28} />
          </button>
        </div>
        
        {/* Category Pills */}
        <div className="px-6 py-4 border-b border-white/10 shrink-0">
          <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-2">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full whitespace-nowrap text-sm font-medium transition-all ${activeCategory === cat ? 'bg-purple-500 text-white shadow-[0_0_10px_rgba(168,85,247,0.5)]' : 'bg-white/10 text-white/80 hover:bg-white/20'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        
        <div className="p-4 overflow-y-auto custom-scrollbar flex-1 pb-32" onScroll={handleScroll}>
          <div className="flex flex-col gap-3">
            {tracks.map((track) => (
              <div 
                key={track.id} 
                onClick={() => playTrack(track)}
                className={`p-3 rounded-xl glass-strong flex items-center gap-3 cursor-pointer transition-all hover:scale-[1.02] hover:bg-white/10 border ${currentTrack?.id === track.id ? 'border-purple-500/50 bg-white/10' : 'border-white/5'}`}
              >
                {track.artwork ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={track.artwork} alt={track.title} className="w-12 h-12 rounded-md object-cover shadow-md" />
                ) : (
                  <div className="w-12 h-12 rounded-md bg-white/5 flex items-center justify-center text-xl">🎵</div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold truncate text-sm">{track.title}</p>
                  <p className="text-white/60 text-xs truncate">{track.artist}</p>
                </div>
                {currentTrack?.id === track.id && isPlaying && (
                  <div className="flex gap-1 items-end h-4 pr-1">
                    <div className="w-1 bg-purple-500 animate-[bounce_1s_infinite] h-3"></div>
                    <div className="w-1 bg-purple-500 animate-[bounce_1s_infinite_0.2s] h-4"></div>
                    <div className="w-1 bg-purple-500 animate-[bounce_1s_infinite_0.4s] h-2"></div>
                  </div>
                )}
              </div>
            ))}
            {tracks.length === 0 && !isLoadingMore && (
              <div className="text-white/70 animate-pulse text-center mt-8">Loading trending tracks...</div>
            )}
            {isLoadingMore && (
              <div className="flex justify-center mt-4">
                <Loader2 className="animate-spin text-white/50" size={24} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Audio Player UI */}
      <div className="absolute bottom-0 left-0 w-full glass-strong border-t border-white/10 p-4 px-8 z-20 flex flex-col md:flex-row items-center justify-between gap-4 backdrop-blur-2xl bg-black/40">
        
        {/* Track Info */}
        <div className="flex items-center gap-4 w-full md:w-1/3">
          {currentTrack?.artwork ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={currentTrack.artwork} alt={currentTrack.title} className="w-14 h-14 rounded-md object-cover shadow-lg" />
          ) : (
            <div className="w-14 h-14 rounded-md bg-white/10 flex items-center justify-center">
              <span className="text-2xl">🎵</span>
            </div>
          )}
          <div className="min-w-0">
            {currentTrack ? (
              <>
                <p className="text-white font-bold truncate text-lg">{currentTrack.title}</p>
                <div className="flex items-center gap-2">
                  <p className="text-white/60 text-sm truncate">{currentTrack.artist}</p>
                  {playbackError && (
                    <span className="text-red-400 text-xs flex items-center gap-1 bg-red-400/10 px-2 py-0.5 rounded-md">
                      <AlertCircle size={12} /> {playbackError}
                    </span>
                  )}
                </div>
              </>
            ) : (
              <p className="text-white/60 text-sm italic">No track selected</p>
            )}
          </div>
        </div>

          {/* Player Controls */}
          <div className="flex flex-col items-center w-full md:w-1/3">
            <div className="flex items-center gap-6 mb-2">
              <button onClick={playPrev} disabled={!currentTrack} className="text-white/70 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                <SkipBack size={24} fill="currentColor" />
              </button>
              <button onClick={togglePlay} disabled={!currentTrack || (isBuffering && !isPlaying)} className="w-12 h-12 flex items-center justify-center bg-white text-black rounded-full hover:scale-105 transition-transform shadow-[0_0_15px_rgba(255,255,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
                {isBuffering ? (
                  <Loader2 size={24} className="animate-spin text-black" />
                ) : isPlaying ? (
                  <Pause size={24} fill="currentColor" />
                ) : (
                  <Play size={24} fill="currentColor" className="ml-1" />
                )}
              </button>
              <button onClick={playNext} disabled={!currentTrack} className="text-white/70 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                <SkipForward size={24} fill="currentColor" />
              </button>
            </div>
            
            <div className="flex items-center gap-3 w-full max-w-md">
              <span className="text-xs text-white/50 w-10 text-right">{formatTime(progress)}</span>
              <input 
                type="range" 
                min={0} 
                max={currentTrack?.duration || 100} 
                value={progress}
                onChange={handleSeek}
                disabled={!currentTrack}
                className="flex-1 h-1.5 bg-white/20 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full cursor-pointer hover:[&::-webkit-slider-thumb]:scale-125 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <span className="text-xs text-white/50 w-10">{formatTime(currentTrack?.duration || 0)}</span>
            </div>
          </div>

          {/* Volume Control */}
          <div className="flex items-center justify-end gap-3 w-full md:w-1/3 hidden md:flex">
            <button onClick={() => setVolume(volume === 0 ? 1 : 0)} className="text-white/70 hover:text-white transition-colors">
              {volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            <input 
              type="range" 
              min={0} 
              max={1} 
              step={0.01}
              value={volume}
              onChange={handleVolumeChange}
              className="w-24 h-1.5 bg-white/20 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full cursor-pointer hover:[&::-webkit-slider-thumb]:scale-125 transition-all"
            />
          </div>

        </div>
    </main>
  );
}

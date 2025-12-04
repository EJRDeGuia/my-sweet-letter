import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface MusicToggleProps {
  audioUrl?: string;
}

export const MusicToggle = ({ audioUrl }: MusicToggleProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioUrl) {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioUrl]);

  const toggleMusic = () => {
    setHasInteracted(true);
    
    if (!audioRef.current && !audioUrl) {
      // No audio URL provided - just toggle the visual state
      setIsPlaying(!isPlaying);
      return;
    }

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          // Autoplay blocked - that's okay
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <button
      onClick={toggleMusic}
      className="fixed bottom-6 right-6 z-50 group"
      aria-label={isPlaying ? "Mute music" : "Play music"}
    >
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/30 transition-all duration-300" />
        
        {/* Button */}
        <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-card border-2 border-primary/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:border-primary/50">
          {isPlaying ? (
            <Volume2 className="w-6 h-6 text-primary animate-pulse-soft" />
          ) : (
            <VolumeX className="w-6 h-6 text-muted-foreground" />
          )}
          
          {/* Musical notes decoration */}
          {isPlaying && (
            <>
              <span className="absolute -top-1 -right-1 text-xs animate-float" style={{ animationDelay: "0s" }}>
                ♪
              </span>
              <span className="absolute -top-2 right-2 text-xs animate-float" style={{ animationDelay: "0.5s" }}>
                ♫
              </span>
            </>
          )}
        </div>
        
        {/* Hint text */}
        {!hasInteracted && (
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-muted-foreground bg-card px-2 py-1 rounded-full shadow-sm animate-pulse-soft">
            Play music ♪
          </span>
        )}
      </div>
    </button>
  );
};

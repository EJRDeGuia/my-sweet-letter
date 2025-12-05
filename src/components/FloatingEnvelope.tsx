import { useState, useRef } from "react";
import { LetterContent } from "./LetterContent";

interface FloatingEnvelopeProps {
  message: string;
  recipientName: string;
}

export const FloatingEnvelope = ({ message, recipientName }: FloatingEnvelopeProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragProgress, setDragProgress] = useState(0);
  const startY = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (clientY: number) => {
    if (isOpen) return;
    setIsDragging(true);
    startY.current = clientY;
  };

  const handleDragMove = (clientY: number) => {
    if (!isDragging || isOpen) return;
    
    const deltaY = startY.current - clientY;
    const progress = Math.min(Math.max(deltaY / 150, 0), 1);
    setDragProgress(progress);
    
    if (progress >= 1) {
      setIsOpen(true);
      setIsDragging(false);
      setDragProgress(0);
    }
  };

  const handleDragEnd = () => {
    if (isDragging && dragProgress < 0.5) {
      setDragProgress(0);
    } else if (dragProgress >= 0.5) {
      setIsOpen(true);
    }
    setIsDragging(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientY);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (isOpen) {
    return <LetterContent message={message} recipientName={recipientName} onClose={handleClose} />;
  }

  return (
    <div
      ref={containerRef}
      className="relative select-none cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleDragEnd}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Main envelope container */}
      <div
        className={`relative w-72 h-52 sm:w-[380px] sm:h-[280px] transition-transform duration-500 ${
          !isDragging ? "animate-float" : ""
        }`}
        style={{
          transform: isDragging ? `translateY(${-dragProgress * 15}px) scale(${1 + dragProgress * 0.03})` : undefined,
        }}
      >
        {/* Envelope shadow */}
        <div 
          className="absolute inset-0 rounded-3xl blur-2xl opacity-25 -z-10"
          style={{ 
            background: "hsl(var(--paper-shadow))",
            transform: "translateY(20px) scale(0.9)",
          }}
        />

        {/* Envelope body */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden" style={{
          background: "linear-gradient(145deg, hsl(35 55% 82%) 0%, hsl(30 50% 75%) 50%, hsl(28 48% 70%) 100%)",
          boxShadow: "0 25px 60px -15px hsl(30 30% 40% / 0.35), inset 0 1px 0 hsl(40 60% 90% / 0.5)",
        }}>
          {/* Paper texture overlay */}
          <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOCIgbnVtT2N0YXZlcz0iNCIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuNSIvPjwvc3ZnPg==')]" />
          
          {/* Decorative stitched border */}
          <div className="absolute inset-4 border-2 border-dashed border-white/20 rounded-2xl pointer-events-none" />
          
          {/* Center heart with glow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Heart glow */}
              <div className="absolute inset-0 blur-xl opacity-40">
                <svg viewBox="0 0 24 24" fill="hsl(var(--heart))" className="w-20 h-20 sm:w-28 sm:h-28">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              {/* Heart main */}
              <svg 
                viewBox="0 0 24 24" 
                fill="hsl(var(--heart))" 
                className="w-16 h-16 sm:w-24 sm:h-24 drop-shadow-lg relative z-10 animate-pulse-soft"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
          </div>

          {/* Decorative corner flourishes */}
          <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-white/25 rounded-tl-lg" />
          <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-white/25 rounded-tr-lg" />
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-white/25 rounded-bl-lg" />
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-white/25 rounded-br-lg" />
        </div>

        {/* Envelope flap */}
        <div
          className="absolute top-0 left-0 right-0 h-1/2 origin-bottom transition-transform duration-500"
          style={{
            transform: `perspective(600px) rotateX(${dragProgress * 180}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Front of flap */}
          <div 
            className="absolute inset-0 rounded-t-3xl"
            style={{
              background: "linear-gradient(180deg, hsl(38 58% 85%) 0%, hsl(35 55% 80%) 40%, hsl(30 50% 75%) 100%)",
              clipPath: "polygon(0 100%, 50% 30%, 100% 100%)",
              backfaceVisibility: "hidden",
              boxShadow: "inset 0 -10px 20px hsl(30 40% 60% / 0.2)",
            }}
          >
            {/* Flap seal/decoration */}
            <div className="absolute bottom-[45%] left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[hsl(var(--heart))] opacity-60 shadow-md" />
          </div>
          {/* Back of flap */}
          <div 
            className="absolute inset-0 rounded-t-3xl"
            style={{
              background: "linear-gradient(180deg, hsl(340 40% 88%) 0%, hsl(340 35% 82%) 100%)",
              clipPath: "polygon(0 100%, 50% 30%, 100% 100%)",
              backfaceVisibility: "hidden",
              transform: "rotateX(180deg)",
            }}
          />
        </div>
      </div>

      {/* Drag hint */}
      <div className={`absolute -bottom-14 left-1/2 -translate-x-1/2 transition-opacity duration-300 ${isDragging ? "opacity-0" : "opacity-100"}`}>
        <div className="flex flex-col items-center gap-1 text-muted-foreground">
          <svg className="w-5 h-5 animate-float-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          <span className="font-[var(--font-handwritten)] text-base text-muted-foreground/80">Drag up to open</span>
        </div>
      </div>

      {/* Progress indicator */}
      {isDragging && (
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-24 h-1 bg-muted/50 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[hsl(var(--heart))] rounded-full transition-all duration-75"
            style={{ width: `${dragProgress * 100}%` }}
          />
        </div>
      )}
    </div>
  );
};

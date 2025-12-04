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
        className={`relative w-72 h-48 sm:w-96 sm:h-64 transition-transform duration-300 ${
          !isDragging ? "animate-float" : ""
        }`}
        style={{
          transform: isDragging ? `translateY(${-dragProgress * 20}px) scale(${1 + dragProgress * 0.05})` : undefined,
        }}
      >
        {/* Envelope shadow */}
        <div 
          className="absolute inset-0 rounded-lg blur-2xl opacity-40 -z-10"
          style={{ 
            background: "hsl(var(--paper-shadow))",
            transform: "translateY(20px) scale(0.9)",
          }}
        />

        {/* Envelope body */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[hsl(var(--envelope))] to-[hsl(var(--envelope-flap))] shadow-2xl overflow-hidden">
          {/* Paper texture overlay */}
          <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOCIgbnVtT2N0YXZlcz0iNCIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuNSIvPjwvc3ZnPg==')]" />
          
          {/* Decorative border */}
          <div className="absolute inset-2 border-2 border-dashed border-card/40 rounded-md pointer-events-none" />
          
          {/* Cute heart seal */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="relative">
              <div className="absolute inset-0 bg-[hsl(var(--heart-glow))] rounded-full blur-lg animate-pulse-soft" />
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-[hsl(var(--heart))] rounded-full shadow-lg animate-heart-beat">
                <svg viewBox="0 0 24 24" fill="hsl(var(--primary-foreground))" className="w-8 h-8 sm:w-10 sm:h-10">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Cute doodles */}
          <svg className="absolute top-3 left-3 w-6 h-6 text-card/40" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
          <svg className="absolute bottom-3 right-3 w-6 h-6 text-card/40" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
          
          {/* Small hearts */}
          <svg className="absolute top-4 right-8 w-4 h-4 text-[hsl(var(--heart))]/50 animate-pulse-soft" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <svg className="absolute bottom-6 left-8 w-3 h-3 text-[hsl(var(--heart))]/40 animate-pulse-soft" style={{ animationDelay: "0.5s" }} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>

        {/* Envelope flap */}
        <div
          className="absolute top-0 left-0 right-0 h-1/2 origin-bottom transition-transform duration-300"
          style={{
            transform: `perspective(500px) rotateX(${dragProgress * 180}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Front of flap */}
          <div 
            className="absolute inset-0 rounded-t-lg"
            style={{
              background: "linear-gradient(180deg, hsl(var(--envelope-flap)) 0%, hsl(var(--envelope)) 100%)",
              clipPath: "polygon(0 100%, 50% 30%, 100% 100%)",
              backfaceVisibility: "hidden",
            }}
          />
          {/* Back of flap */}
          <div 
            className="absolute inset-0 rounded-t-lg"
            style={{
              background: "hsl(var(--envelope-inner))",
              clipPath: "polygon(0 100%, 50% 30%, 100% 100%)",
              backfaceVisibility: "hidden",
              transform: "rotateX(180deg)",
            }}
          />
        </div>
      </div>

      {/* Drag hint */}
      <div className={`absolute -bottom-16 left-1/2 -translate-x-1/2 transition-opacity duration-300 ${isDragging ? "opacity-0" : "opacity-100"}`}>
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <div className="flex items-center gap-2 animate-float-slow">
            <svg className="w-5 h-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
          <span className="text-sm font-[var(--font-handwritten)] text-lg">Drag up to open</span>
        </div>
      </div>

      {/* Progress indicator */}
      {isDragging && (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-32 h-1 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-75"
            style={{ width: `${dragProgress * 100}%` }}
          />
        </div>
      )}
    </div>
  );
};

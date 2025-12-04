import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface LetterContentProps {
  message: string;
  recipientName: string;
  onClose: () => void;
}

export const LetterContent = ({ message, recipientName, onClose }: LetterContentProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 400);
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-500 ${
        isVisible ? "bg-foreground/20 backdrop-blur-sm" : "bg-transparent"
      }`}
      onClick={handleClose}
    >
      {/* Letter paper */}
      <div
        className={`relative max-w-2xl w-full max-h-[85vh] overflow-auto transition-all duration-700 ease-out ${
          isVisible 
            ? "opacity-100 scale-100 translate-y-0" 
            : "opacity-0 scale-90 translate-y-10"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Paper background with texture */}
        <div className="relative bg-[hsl(var(--paper))] rounded-lg shadow-2xl overflow-hidden">
          {/* Paper texture */}
          <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOCIgbnVtT2N0YXZlcz0iNCIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuNSIvPjwvc3ZnPg==')]" />
          
          {/* Decorative lined paper effect */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: "repeating-linear-gradient(transparent, transparent 31px, hsl(var(--border) / 0.3) 31px, hsl(var(--border) / 0.3) 32px)",
            backgroundPosition: "0 60px",
          }} />
          
          {/* Red margin line */}
          <div className="absolute top-0 bottom-0 left-16 w-px bg-[hsl(var(--heart))] opacity-30" />

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors z-10"
            aria-label="Close letter"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>

          {/* Letter content */}
          <div className="relative p-8 sm:p-12 pl-20 sm:pl-24">
            {/* Decorative heart corner */}
            <div className="absolute top-4 left-4">
              <svg className="w-8 h-8 text-[hsl(var(--heart))] opacity-50" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>

            {/* Date */}
            <p 
              className="text-right text-muted-foreground mb-6 font-[var(--font-handwritten)] text-lg opacity-0 animate-fade-in-up"
              style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
            >
              {new Date().toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </p>

            {/* Greeting */}
            <h2 
              className="font-[var(--font-script)] text-3xl sm:text-4xl text-[hsl(var(--heart))] mb-8 opacity-0 animate-fade-in-up"
              style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
            >
              My Dearest {recipientName},
            </h2>

            {/* Message body */}
            <div 
              className="font-[var(--font-handwritten)] text-xl sm:text-2xl leading-relaxed text-foreground space-y-4 opacity-0 animate-fade-in-up"
              style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
            >
              {message.split('\n\n').map((paragraph, index) => (
                <p key={index} className="indent-8">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Closing */}
            <div 
              className="mt-10 opacity-0 animate-fade-in-up"
              style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}
            >
              <p className="font-[var(--font-script)] text-2xl text-[hsl(var(--heart))]">
                -Ernest Judieanne ♥
              </p>
            </div>

            {/* Decorative elements */}
            <div className="absolute bottom-4 right-4 flex gap-1">
              {[...Array(3)].map((_, i) => (
                <svg 
                  key={i}
                  className="w-4 h-4 text-[hsl(var(--heart))] opacity-40 animate-pulse-soft"
                  style={{ animationDelay: `${i * 0.2}s` }}
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              ))}
            </div>

            {/* Lipstick kiss mark (optional cute touch) */}
            <div className="absolute bottom-12 left-6 opacity-20 rotate-12">
              <svg className="w-12 h-12 text-[hsl(var(--heart))]" viewBox="0 0 100 100" fill="currentColor">
                <ellipse cx="30" cy="50" rx="25" ry="15" />
                <ellipse cx="70" cy="50" rx="25" ry="15" />
              </svg>
            </div>
          </div>
        </div>

        {/* Paper fold shadow effect */}
        <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-foreground/5 to-transparent rounded-b-lg" />
      </div>
    </div>
  );
};

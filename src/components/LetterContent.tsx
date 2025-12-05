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
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-400 ${
        isVisible ? "bg-foreground/25 backdrop-blur-sm" : "bg-transparent"
      }`}
      onClick={handleClose}
    >
      {/* Letter paper */}
      <div
        className={`relative max-w-2xl w-full max-h-[85vh] overflow-auto transition-all duration-500 ease-out ${
          isVisible 
            ? "opacity-100 scale-100" 
            : "opacity-0 scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'hsl(var(--border)) transparent',
        }}
      >
        {/* Paper background with cream color */}
        <div className="relative overflow-hidden rounded-2xl" style={{
          background: "linear-gradient(180deg, hsl(45 80% 96%) 0%, hsl(42 70% 94%) 50%, hsl(40 65% 92%) 100%)",
          boxShadow: "0 30px 60px -15px hsl(30 30% 30% / 0.3), 0 0 0 1px hsl(35 40% 85%)",
        }}>
          {/* Paper texture */}
          <div className="absolute inset-0 opacity-[0.15] mix-blend-multiply bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOCIgbnVtT2N0YXZlcz0iNCIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuNSIvPjwvc3ZnPg==')]" />
          
          {/* Subtle lined paper effect */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.08]" style={{
            backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, hsl(30 30% 50%) 27px, hsl(30 30% 50%) 28px)",
            backgroundPosition: "0 80px",
          }} />

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-white/60 hover:bg-white/80 transition-colors z-10 shadow-sm"
            aria-label="Close letter"
          >
            <X className="w-4 h-4 text-foreground/60" />
          </button>

          {/* Letter content */}
          <div className="relative px-8 py-10 sm:px-14 sm:py-12">
            {/* Top decorative element */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-[hsl(var(--heart))/40] to-transparent" />
                <svg className="w-6 h-6 text-[hsl(var(--heart))]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-[hsl(var(--heart))/40] to-transparent" />
              </div>
            </div>

            {/* Date */}
            <p 
              className="text-center text-muted-foreground/70 mb-8 font-[var(--font-handwritten)] text-lg tracking-wide opacity-0 animate-fade-in-up"
              style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
            >
              {new Date().toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </p>

            {/* Greeting */}
            <h2 
              className="font-[var(--font-script)] text-3xl sm:text-4xl text-[hsl(var(--heart))] mb-10 text-center opacity-0 animate-fade-in-up"
              style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
            >
              Hello {recipientName},
            </h2>

            {/* Message body */}
            <div 
              className="font-[var(--font-handwritten)] text-[1.35rem] sm:text-[1.5rem] leading-[1.8] text-foreground/90 space-y-6 opacity-0 animate-fade-in-up"
              style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
            >
              {message.split('\n\n').map((paragraph, index) => (
                <p key={index} className="first-letter:text-[1.6em] first-letter:text-[hsl(var(--heart))] first-letter:font-[var(--font-script)]">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Closing */}
            <div 
              className="mt-12 opacity-0 animate-fade-in-up"
              style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
            >
              <div className="flex flex-col items-end">
                <p className="font-[var(--font-script)] text-2xl sm:text-3xl text-[hsl(var(--heart))]">
                  -Ernest Judieanne
                </p>
                <div className="mt-2 flex items-center gap-1">
                  {[...Array(3)].map((_, i) => (
                    <svg 
                      key={i}
                      className="w-4 h-4 text-[hsl(var(--heart))]"
                      style={{ opacity: 1 - i * 0.25 }}
                      viewBox="0 0 24 24" 
                      fill="currentColor"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom decorative element */}
            <div className="flex justify-center mt-10">
              <div className="flex items-center gap-2 opacity-40">
                <div className="w-16 h-px bg-gradient-to-r from-transparent to-[hsl(var(--heart))]" />
                <svg className="w-3 h-3 text-[hsl(var(--heart))]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
                <div className="w-16 h-px bg-gradient-to-l from-transparent to-[hsl(var(--heart))]" />
              </div>
            </div>
          </div>
        </div>

        {/* Paper edge shadow */}
        <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-foreground/5 to-transparent rounded-b-2xl pointer-events-none" />
      </div>
    </div>
  );
};

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
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isVisible ? "bg-foreground/30 backdrop-blur-sm" : "bg-transparent"
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
      >
        {/* Paper background */}
        <div className="relative bg-[hsl(var(--paper))] rounded-xl shadow-2xl overflow-hidden border border-border/30">
          {/* Paper texture */}
          <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOCIgbnVtT2N0YXZlcz0iNCIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuNSIvPjwvc3ZnPg==')]" />

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-muted/60 hover:bg-muted transition-colors z-10"
            aria-label="Close letter"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>

          {/* Letter content */}
          <div className="relative p-8 sm:p-12">
            {/* Decorative heart */}
            <div className="flex justify-center mb-6">
              <svg className="w-10 h-10 text-[hsl(var(--heart))] opacity-60" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>

            {/* Date */}
            <p 
              className="text-center text-muted-foreground mb-6 font-[var(--font-handwritten)] text-lg opacity-0 animate-fade-in-up"
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
              className="font-[var(--font-script)] text-3xl sm:text-4xl text-[hsl(var(--heart))] mb-8 text-center opacity-0 animate-fade-in-up"
              style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
            >
              Hello {recipientName},
            </h2>

            {/* Message body */}
            <div 
              className="font-[var(--font-handwritten)] text-xl sm:text-2xl leading-relaxed text-foreground space-y-4 opacity-0 animate-fade-in-up"
              style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
            >
              {message.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-center sm:text-left sm:indent-8">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Closing */}
            <div 
              className="mt-10 text-center opacity-0 animate-fade-in-up"
              style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
            >
              <p className="font-[var(--font-script)] text-2xl text-[hsl(var(--heart))]">
                -Ernest Judieanne ♥
              </p>
            </div>

            {/* Bottom decorative hearts */}
            <div className="flex justify-center gap-2 mt-8 opacity-50">
              {[...Array(3)].map((_, i) => (
                <svg 
                  key={i}
                  className="w-4 h-4 text-[hsl(var(--heart))]"
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

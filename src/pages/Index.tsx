import { Helmet } from "react-helmet-async";
import { FloatingEnvelope } from "@/components/FloatingEnvelope";
import { MusicToggle } from "@/components/MusicToggle";
import { Sparkles } from "@/components/Sparkles";

// ✨ CUSTOMIZE YOUR LETTER HERE ✨
const LETTER_CONFIG = {
  recipientName: "My Love", // Change to your girlfriend's name
  message: `Happy Birthday, my beautiful angel! 🎂

Today marks another year of your amazing existence, and I feel so incredibly lucky to be part of your journey. Every moment with you feels like a gift wrapped in sunshine and tied with starlight.

Your smile lights up my darkest days. Your laugh is my favorite melody. Your love is the greatest adventure I've ever known.

I promise to be there through every sunrise and sunset, through every storm and rainbow. You are my today, my tomorrow, and my forever.

May this year bring you endless happiness, all your dreams come true, and even more reasons to smile. You deserve the entire universe, and I'll spend every day trying to give it to you.

Here's to another beautiful year of us. 💕`,
  // Optional: Add your audio URL here (e.g., from a CDN or public folder)
  audioUrl: "", // Example: "/music/song.mp3" or "https://example.com/song.mp3"
};

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Happy Birthday, {LETTER_CONFIG.recipientName} ♥</title>
        <meta name="description" content="A special birthday letter filled with love" />
      </Helmet>

      <main className="min-h-screen relative overflow-hidden flex items-center justify-center">
        {/* Animated gradient background */}
        <div className="fixed inset-0 bg-background" />
        
        {/* Soft gradient overlay */}
        <div 
          className="fixed inset-0 opacity-50"
          style={{
            background: `
              radial-gradient(ellipse at 20% 20%, hsl(var(--sparkle-1) / 0.15) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 80%, hsl(var(--heart) / 0.1) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 50%, hsl(var(--sparkle-3) / 0.1) 0%, transparent 70%)
            `
          }}
        />

        {/* Sparkles and floating elements */}
        <Sparkles />

        {/* Main content - Floating envelope */}
        <div className="relative z-10 flex flex-col items-center justify-center px-4">
          {/* Title */}
          <h1 
            className="font-[var(--font-script)] text-3xl sm:text-4xl md:text-5xl text-[hsl(var(--heart))] mb-12 text-center animate-float-slow"
          >
            A Letter For You ♥
          </h1>

          {/* Envelope */}
          <FloatingEnvelope 
            message={LETTER_CONFIG.message} 
            recipientName={LETTER_CONFIG.recipientName} 
          />

        </div>

        {/* Music toggle */}
        <MusicToggle audioUrl={LETTER_CONFIG.audioUrl || undefined} />
      </main>
    </>
  );
};

export default Index;

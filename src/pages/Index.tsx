import { Helmet } from "react-helmet-async";
import { FloatingEnvelope } from "@/components/FloatingEnvelope";
import { MusicToggle } from "@/components/MusicToggle";
import { Sparkles } from "@/components/Sparkles";

// ✨ CUSTOMIZE YOUR LETTER HERE ✨
const LETTER_CONFIG = {
  recipientName: "Chichi",
  message: `Hello Chichi,

HAPPY BIRTHDAY, BABY!!!!!!

I know you don't really like celebrating your birthday, and I completely understand. I feel the same way about mine. But today is your special day, and I can't help but be excited for you. I know we argue sometimes, but I want you to know that I will always choose you. I haven't been certain about many things in my life, but when I met you, I knew you were the girl I wanted to build a future with. We still have a lot ahead of us, but I know we can overcome anything. As long as we're together, we'll break through every challenge.

"I love you without knowing how, or when, or from where.
I love you straightforwardly, without complexities or pride;
so I love you because I know no other way than this." — Pablo Neruda

I love you in that same quiet, certain way, simply, deeply, and without conditions. I love you because you bring peace into my life, because you understand me in ways no one else does, and because even during our tough moments, choosing you always feels right. You make my days lighter, and you inspire me to become better every single day.

Mahal na mahal kita, Chi. Happy birthday, baby. I miss you so much.

-Ernest Judieanne`,
  audioUrl: "/music/birthday-song.m4a",
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
            Happy Birthday Chichi ♥
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

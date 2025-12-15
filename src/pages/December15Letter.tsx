import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FloatingEnvelope } from "@/components/FloatingEnvelope";
import { MusicToggle } from "@/components/MusicToggle";
import { Sparkles } from "@/components/Sparkles";
import { BackgroundCollage } from "@/components/BackgroundCollage";
import { ArrowLeft } from "lucide-react";

const LETTER_CONFIG = {
  recipientName: "Chichi",
  message: `I'm sorry for showing up out of nowhere earlier. I acted out of emotion, but I knew that if I didn't come and talk to you, I would regret not trying for the rest of my life. I'm also truly sorry for how I acted yesterday and earlier today. You didn't deserve that version of me, and I take full responsibility for my actions.

When you agreed to try again, it overwhelmed me with joy and hope. I know it isn't a guarantee, and I understand that trust and healing take time. I'm not expecting everything to be okay instantly. What matters to me is that we're choosing to take a step forward together, no matter how small, and that alone means everything to me.

I want you to know that I am committed to growing—not just for us, but for myself too. I'm willing to listen more, to be patient, and to understand you better even when it's hard. Love is about compromise, effort, and choosing each other every day, and I am willing to do all of that because I believe in what we have. I believe our love can help build us into better people together.

Mahal na mahal kita, chichi. I will always support you and help you achieve anything you dream of, because seeing you happy gives my heart so much warmth and purpose. Thank you for giving us another chance, and thank you for not giving up on me. I promise to do better and to love you with sincerity, respect, and consistency.`,

  audioUrl: "/music/birthday-song.m4a",
};

const December15Letter = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = localStorage.getItem("letters-auth");
    if (!isAuth) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>December 15, 2025 - A Letter for {LETTER_CONFIG.recipientName} ♥</title>
        <meta name="description" content="A special letter filled with love" />
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
            `,
          }}
        />

        {/* Background Collage */}
        <BackgroundCollage />

        {/* Sparkles */}
        <Sparkles />

        {/* Back button */}
        <Link
          to="/archive"
          className="fixed top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-border hover:border-[hsl(var(--heart))/50] text-muted-foreground hover:text-foreground transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-[var(--font-handwritten)] text-sm">Back</span>
        </Link>

        {/* Main floating envelope */}
        <FloatingEnvelope
          recipientName={LETTER_CONFIG.recipientName}
          message={LETTER_CONFIG.message}
          date="December 15, 2025"
        />

        {/* Music toggle */}
        <MusicToggle audioUrl={LETTER_CONFIG.audioUrl} />
      </main>
    </>
  );
};

export default December15Letter;

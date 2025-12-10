import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Heart, ArrowLeft } from "lucide-react";
import { Sparkles } from "@/components/Sparkles";

const REASONS = [
  "The way your eyes light up when you laugh",
  "How you make even ordinary moments feel special",
  "Your kindness towards everyone you meet",
  "The sound of your voice when you're excited",
  "How you always know how to make me smile",
  "Your beautiful heart and soul",
  "The way you care so deeply about the people you love",
  "Your silly jokes that always make me laugh",
  "How safe I feel when I'm with you",
  "Your determination and strength",
  "The way you look at me like I'm your whole world",
  "How you make me want to be a better person",
  "Your warm hugs that feel like home",
  "The little things you do to show you care",
  "Simply because you're you ♥",
];

const ReasonsILoveYou = () => {
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
        <title>Reasons I Love You ♥</title>
        <meta name="description" content="All the reasons why I love you" />
      </Helmet>

      <main className="min-h-screen bg-background px-4 py-10 sm:py-16 overflow-hidden">
        {/* Soft gradient overlay */}
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse at 20% 30%, hsl(var(--heart) / 0.25) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 70%, hsl(var(--sparkle-1) / 0.2) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 50%, hsl(var(--sparkle-3) / 0.15) 0%, transparent 60%)
            `,
          }}
        />

        {/* Sparkles */}
        <Sparkles />

        <div className="relative z-10 max-w-2xl mx-auto">
          {/* Back button */}
          <Link
            to="/archive"
            className="inline-flex items-center gap-2 mb-8 text-muted-foreground hover:text-foreground font-[var(--font-handwritten)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to letters
          </Link>

          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="flex justify-center mb-5">
              <div className="relative">
                <div className="absolute inset-0 blur-2xl opacity-50">
                  <Heart className="w-20 h-20 text-[hsl(var(--heart))] fill-current" />
                </div>
                <Heart className="w-16 h-16 text-[hsl(var(--heart))] fill-current relative z-10" />
              </div>
            </div>
            <h1 className="font-[var(--font-script)] text-4xl sm:text-5xl text-foreground mb-3">
              Reasons I Love You
            </h1>
            <p className="text-muted-foreground font-[var(--font-handwritten)] text-lg">
              You found my secret list ♥
            </p>
          </div>

          {/* Reasons list */}
          <div className="space-y-4">
            {REASONS.map((reason, index) => (
              <div
                key={index}
                className="relative p-5 rounded-2xl bg-card/70 backdrop-blur-sm border border-border hover:border-[hsl(var(--heart))/50] transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                {/* Number */}
                <span className="absolute -left-2 -top-2 w-8 h-8 rounded-full bg-[hsl(var(--heart))] text-white flex items-center justify-center font-[var(--font-handwritten)] text-sm shadow-lg">
                  {index + 1}
                </span>
                
                <p className="font-[var(--font-handwritten)] text-foreground text-lg pl-4">
                  {reason}
                </p>
              </div>
            ))}
          </div>

          {/* Footer message */}
          <div className="mt-12 text-center animate-fade-in" style={{ animationDelay: "1.5s" }}>
            <p className="text-muted-foreground font-[var(--font-handwritten)] text-base italic">
              ...and a million more reasons I couldn't fit here ♥
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default ReasonsILoveYou;
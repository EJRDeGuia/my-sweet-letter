import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Sparkles } from "@/components/Sparkles";

const CORRECT_PASSWORD = "120506";

const Login = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      localStorage.setItem("letters-auth", "true");
      setIsTransitioning(true);
      // Wait for animation to complete before navigating
      setTimeout(() => {
        navigate("/archive");
      }, 800);
    } else {
      setError(true);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  return (
    <>
      <Helmet>
        <title>Letters for Chichi ♥</title>
        <meta name="description" content="A private archive of love letters" />
      </Helmet>

      <main className="min-h-screen bg-background flex items-center justify-center px-4 overflow-hidden">
        {/* Soft gradient overlay */}
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse at 30% 20%, hsl(var(--sparkle-1) / 0.25) 0%, transparent 50%),
              radial-gradient(ellipse at 70% 80%, hsl(var(--heart) / 0.2) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 50%, hsl(var(--sparkle-3) / 0.15) 0%, transparent 60%)
            `,
          }}
        />

        {/* Sparkles */}
        <Sparkles />

        {/* Visible heart that expands on login */}
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <svg
            viewBox="0 0 24 24"
            fill="hsl(var(--heart))"
            className={`transition-all ease-out ${
              isTransitioning 
                ? "w-[300vmax] h-[300vmax] duration-700" 
                : "w-24 h-24 duration-300 animate-pulse-soft drop-shadow-[0_0_30px_hsl(var(--heart)/0.5)]"
            }`}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>

        <div className={`relative z-10 w-full max-w-md transition-all duration-500 ${isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>
          {/* Card container */}
          <div className="relative p-8 sm:p-10 rounded-[2rem] bg-card/80 backdrop-blur-sm border-2 border-border shadow-2xl">
            {/* Paper texture */}
            <div className="absolute inset-0 rounded-[2rem] opacity-20 mix-blend-overlay pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOCIgbnVtT2N0YXZlcz0iNCIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuNSIvPjwvc3ZnPg==')]" />

            {/* Decorative corners */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[hsl(var(--heart))/30] rounded-tl-lg" />
            <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[hsl(var(--heart))/30] rounded-tr-lg" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[hsl(var(--heart))/30] rounded-bl-lg" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[hsl(var(--heart))/30] rounded-br-lg" />

            <div className="relative">
              {/* Heart icon with envelope */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  {/* Glow effect */}
                  <div className="absolute inset-0 blur-2xl opacity-40">
                    <svg viewBox="0 0 24 24" fill="hsl(var(--heart))" className="w-24 h-24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </div>
                  {/* Envelope with heart */}
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" className="w-20 h-20 text-[hsl(var(--heart))]" stroke="currentColor" strokeWidth="1.5">
                      <rect x="2" y="4" width="20" height="16" rx="3" fill="hsl(var(--heart) / 0.15)" />
                      <path d="M22 7l-10 7L2 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <svg viewBox="0 0 24 24" fill="hsl(var(--heart))" className="w-8 h-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 animate-pulse-soft">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Title */}
              <h1 className="font-[var(--font-script)] text-4xl sm:text-5xl text-foreground text-center mb-2">
                Letters for Chichi
              </h1>
              <p className="text-muted-foreground text-center text-base mb-8 font-[var(--font-handwritten)]">
                A secret place for my love letters ♥
              </p>

              {/* Login form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className={`transition-transform ${isShaking ? "animate-shake" : ""}`}>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError(false);
                    }}
                    placeholder="• • • • • •"
                    disabled={isTransitioning}
                    className={`w-full px-5 py-4 rounded-2xl bg-background/50 border-2 text-center font-[var(--font-handwritten)] text-xl tracking-widest focus:outline-none focus:ring-2 focus:ring-[hsl(var(--heart))/30] transition-all placeholder:text-muted-foreground/40 ${
                      error
                        ? "border-destructive"
                        : "border-border focus:border-[hsl(var(--heart))]"
                    }`}
                  />
                  <p className="text-muted-foreground/70 text-xs text-center mt-3 font-[var(--font-handwritten)]">
                    Hint: bortday ♥
                  </p>
                  {error && (
                    <p className="text-destructive text-sm text-center mt-2 font-[var(--font-handwritten)]">
                      That's not it, try again baby ♥
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isTransitioning}
                  className="w-full py-4 rounded-2xl bg-[hsl(var(--heart))] text-white font-[var(--font-handwritten)] text-xl hover:brightness-110 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70"
                >
                  Open My Letters
                </button>
              </form>
            </div>
          </div>

          {/* Floating decorative hearts */}
          <div className="absolute -top-4 -right-4 text-[hsl(var(--heart))] opacity-30 animate-float">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <div className="absolute -bottom-6 -left-6 text-[hsl(var(--sparkle-1))] opacity-25 animate-float-slow">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const CORRECT_PASSWORD = "120506";

const Login = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      localStorage.setItem("letters-auth", "true");
      navigate("/archive");
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

      <main className="min-h-screen bg-background flex items-center justify-center px-4">
        {/* Soft gradient overlay */}
        <div
          className="fixed inset-0 opacity-40 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse at 30% 20%, hsl(var(--sparkle-1) / 0.2) 0%, transparent 50%),
              radial-gradient(ellipse at 70% 80%, hsl(var(--heart) / 0.15) 0%, transparent 50%)
            `,
          }}
        />

        <div className="relative z-10 w-full max-w-sm">
          {/* Heart icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 blur-2xl opacity-50">
                <svg viewBox="0 0 24 24" fill="hsl(var(--heart))" className="w-20 h-20">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              <svg viewBox="0 0 24 24" fill="hsl(var(--heart))" className="w-16 h-16 relative z-10 drop-shadow-lg">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h1 className="font-[var(--font-script)] text-3xl sm:text-4xl text-foreground text-center mb-2">
            Letters for Chichi
          </h1>
          <p className="text-muted-foreground text-center text-sm mb-8 font-[var(--font-handwritten)]">
            Enter our special date to continue
          </p>

          {/* Login form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className={`transition-transform ${isShaking ? "animate-shake" : ""}`}>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="Enter password..."
                className={`w-full px-4 py-3 rounded-2xl bg-card border-2 text-center font-[var(--font-handwritten)] text-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--heart))/30] transition-all ${
                  error
                    ? "border-destructive"
                    : "border-border focus:border-[hsl(var(--heart))]"
                }`}
              />
              {error && (
                <p className="text-destructive text-sm text-center mt-2 font-[var(--font-handwritten)]">
                  That's not our date, try again ♥
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-[hsl(var(--heart))] text-white font-[var(--font-handwritten)] text-lg hover:opacity-90 transition-opacity shadow-lg"
            >
              Open My Letters
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default Login;

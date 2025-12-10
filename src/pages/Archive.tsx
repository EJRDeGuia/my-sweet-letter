import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Cake, Heart } from "lucide-react";
import { Sparkles } from "@/components/Sparkles";

// Define your letters here - easy to add more in the future
const LETTERS = [
  {
    id: "birthday",
    title: "Birthday Letter",
    subtitle: "December 5, 2024",
    description: "A letter for your special day",
    icon: Cake,
    color: "hsl(var(--heart))",
    path: "/letter/birthday",
  },
  // Add more letters here in the future:
  // {
  //   id: "anniversary",
  //   title: "Anniversary Letter",
  //   subtitle: "Coming soon...",
  //   description: "Celebrating us",
  //   icon: Heart,
  //   color: "hsl(var(--sparkle-1))",
  //   path: "/letter/anniversary",
  // },
];

const Archive = () => {
  const navigate = useNavigate();
  const [isEntering, setIsEntering] = useState(true);

  useEffect(() => {
    const isAuth = localStorage.getItem("letters-auth");
    if (!isAuth) {
      navigate("/");
    }
    // Trigger shrink animation after mount
    const timer = setTimeout(() => {
      setIsEntering(false);
    }, 100);
    return () => clearTimeout(timer);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("letters-auth");
    navigate("/");
  };

  return (
    <>
      <Helmet>
        <title>My Letters ♥</title>
        <meta name="description" content="A private archive of love letters" />
      </Helmet>

      <main className="min-h-screen bg-background px-4 py-10 sm:py-16 overflow-hidden">
        {/* Soft gradient overlay */}
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse at 20% 30%, hsl(var(--sparkle-1) / 0.2) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 70%, hsl(var(--heart) / 0.15) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 50%, hsl(var(--sparkle-3) / 0.12) 0%, transparent 60%)
            `,
          }}
        />

        {/* Sparkles */}
        <Sparkles />

        {/* Heart shrink transition overlay */}
        <div 
          className={`fixed inset-0 z-50 flex items-center justify-center pointer-events-none transition-all duration-700 ease-out ${
            isEntering ? "opacity-100" : "opacity-0"
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="hsl(var(--heart))"
            className={`transition-all duration-700 ease-out ${
              isEntering ? "w-[300vmax] h-[300vmax]" : "w-24 h-24"
            }`}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>

        <div className={`relative z-10 max-w-xl mx-auto transition-all duration-500 delay-300 ${isEntering ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>
          {/* Header */}
          <div className="text-center mb-12">
            {/* Animated heart */}
            <div className="flex justify-center mb-5">
              <div className="relative">
                <div className="absolute inset-0 blur-2xl opacity-40">
                  <Heart className="w-16 h-16 text-[hsl(var(--heart))] fill-current" />
                </div>
                <Heart className="w-14 h-14 text-[hsl(var(--heart))] fill-current relative z-10 animate-pulse-soft" />
              </div>
            </div>
            <h1 className="font-[var(--font-script)] text-5xl sm:text-6xl text-foreground mb-3">
              My Letters
            </h1>
            <p className="text-muted-foreground font-[var(--font-handwritten)] text-xl">
              For you, with all my love ♥
            </p>
          </div>

          {/* Letter Cards */}
          <div className="grid gap-5">
            {LETTERS.map((letter, index) => {
              const IconComponent = letter.icon;
              return (
                <Link
                  key={letter.id}
                  to={letter.path}
                  className="group block animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative p-6 sm:p-8 rounded-[2rem] bg-card/80 backdrop-blur-sm border-2 border-border hover:border-[hsl(var(--heart))] transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 overflow-hidden">
                    {/* Paper texture */}
                    <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOCIgbnVtT2N0YXZlcz0iNCIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuNSIvPjwvc3ZnPg==')]" />
                    
                    {/* Decorative gradient on hover */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at 30% 50%, ${letter.color}15 0%, transparent 60%)`
                      }}
                    />

                    <div className="relative flex items-center gap-5 sm:gap-6">
                      {/* Icon container */}
                      <div className="relative flex-shrink-0">
                        <div
                          className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                          style={{ 
                            backgroundColor: `${letter.color}15`,
                            boxShadow: `0 8px 24px ${letter.color}20`
                          }}
                        >
                          <IconComponent
                            className="w-9 h-9 sm:w-10 sm:h-10 transition-transform duration-300"
                            style={{ color: letter.color }}
                          />
                        </div>
                        {/* Decorative ring */}
                        <div 
                          className="absolute inset-0 rounded-2xl border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-110"
                          style={{ borderColor: `${letter.color}30` }}
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h2 className="font-[var(--font-script)] text-2xl sm:text-3xl text-foreground group-hover:text-[hsl(var(--heart))] transition-colors">
                          {letter.title}
                        </h2>
                        <p className="text-muted-foreground font-[var(--font-handwritten)] text-base mt-1">
                          {letter.description}
                        </p>
                        <p className="text-muted-foreground/60 font-[var(--font-handwritten)] text-sm mt-0.5">
                          {letter.subtitle}
                        </p>
                      </div>

                      {/* Arrow */}
                      <div className="flex-shrink-0 text-muted-foreground group-hover:text-[hsl(var(--heart))] transition-all duration-300 group-hover:translate-x-2">
                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Empty state hint for future */}
          <div className="mt-8 text-center">
            <p className="text-muted-foreground/50 font-[var(--font-handwritten)] text-sm italic">
              More letters coming soon... ♥
            </p>
          </div>

          {/* Logout button */}
          <div className="mt-12 text-center">
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground font-[var(--font-handwritten)] text-sm transition-all hover:shadow-md"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Lock my letters
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Archive;

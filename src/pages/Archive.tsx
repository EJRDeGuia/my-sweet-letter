import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Cake, Heart, Star, Gift, Sparkles, Sun } from "lucide-react";

// Define your letters here - easy to add more in the future
const LETTERS = [
  {
    id: "birthday",
    title: "Birthday Letter",
    description: "December 5, 2024",
    icon: Cake,
    color: "hsl(var(--heart))",
    path: "/letter/birthday",
  },
  // Add more letters here in the future:
  // {
  //   id: "anniversary",
  //   title: "Anniversary Letter",
  //   description: "Coming soon...",
  //   icon: Heart,
  //   color: "hsl(var(--sparkle-1))",
  //   path: "/letter/anniversary",
  // },
];

const Archive = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = localStorage.getItem("letters-auth");
    if (!isAuth) {
      navigate("/");
    }
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

      <main className="min-h-screen bg-background px-4 py-8 sm:py-12">
        {/* Soft gradient overlay */}
        <div
          className="fixed inset-0 opacity-40 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse at 20% 30%, hsl(var(--sparkle-1) / 0.15) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 70%, hsl(var(--heart) / 0.1) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 50%, hsl(var(--sparkle-3) / 0.1) 0%, transparent 60%)
            `,
          }}
        />

        <div className="relative z-10 max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="flex justify-center mb-4">
              <Heart className="w-10 h-10 text-[hsl(var(--heart))] fill-current" />
            </div>
            <h1 className="font-[var(--font-script)] text-4xl sm:text-5xl text-foreground mb-2">
              My Letters
            </h1>
            <p className="text-muted-foreground font-[var(--font-handwritten)] text-lg">
              For you, with all my love ♥
            </p>
          </div>

          {/* Letter Cards */}
          <div className="grid gap-4 sm:gap-6">
            {LETTERS.map((letter) => {
              const IconComponent = letter.icon;
              return (
                <Link
                  key={letter.id}
                  to={letter.path}
                  className="group block"
                >
                  <div className="relative p-6 rounded-3xl bg-card border-2 border-border hover:border-[hsl(var(--heart))/50] transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    {/* Paper texture */}
                    <div className="absolute inset-0 rounded-3xl opacity-20 mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOCIgbnVtT2N0YXZlcz0iNCIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuNSIvPjwvc3ZnPg==')]" />
                    
                    <div className="relative flex items-center gap-5">
                      {/* Icon */}
                      <div
                        className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundColor: `${letter.color}20` }}
                      >
                        <IconComponent
                          className="w-8 h-8 transition-transform duration-300"
                          style={{ color: letter.color }}
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h2 className="font-[var(--font-script)] text-2xl text-foreground group-hover:text-[hsl(var(--heart))] transition-colors">
                          {letter.title}
                        </h2>
                        <p className="text-muted-foreground font-[var(--font-handwritten)] text-sm mt-1">
                          {letter.description}
                        </p>
                      </div>

                      {/* Arrow */}
                      <div className="flex-shrink-0 text-muted-foreground group-hover:text-[hsl(var(--heart))] transition-all duration-300 group-hover:translate-x-1">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Logout button */}
          <div className="mt-12 text-center">
            <button
              onClick={handleLogout}
              className="text-muted-foreground hover:text-foreground font-[var(--font-handwritten)] text-sm transition-colors"
            >
              Lock my letters
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Archive;

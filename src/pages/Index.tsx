import { Helmet } from "react-helmet-async";
import { FloatingEnvelope } from "@/components/FloatingEnvelope";
import { MusicToggle } from "@/components/MusicToggle";
import { Sparkles } from "@/components/Sparkles";
import { BackgroundCollage } from "@/components/BackgroundCollage";

// ✨ CUSTOMIZE YOUR LETTER HERE ✨
const LETTER_CONFIG = {
  recipientName: "Chichi",
  message: `HAPPY BIRTHDAY, BABY!!!!!!

I know you don’t really like celebrating your birthday, and I feel the same about mine, but today is different. Even if you don’t want a big celebration, I still want to celebrate you. You deserve to feel loved, held, appreciated, and reminded of how special you are, especially to me.

Sometimes we argue, sometimes we misunderstand each other, but through everything, I want you to remember one thing: I will always choose you. Out of all the uncertainties in my life, loving you has never been one of them. From the moment I met you, I just knew you were the girl I wanted to build something real with, something lasting, something forever.

Remember this song? You shared it with me, and it was so good it got stuck in my head for weeks. Then you posted a story using that song, and my picture was there, even if it was just a little bit. And then you put it on your highlights. I know that highlight is for pictures that make you feel confident and pretty, but I couldn’t help but be so damn giddy knowing I was in there too. That moment meant so much to me in a way I can’t fully explain.

“I love you without knowing how, or when, or from where.
I love you straightforwardly, without complexities or pride;
so I love you because I know no other way than this.” 
— Pablo Neruda

I love you like that, quietly, deeply, and truthfully, without conditions, without hesitation. Because you bring peace into my life. Because you see me in ways no one else has ever seen me. Because even during our hard moments, choosing you always feels right. You make my days lighter, my heart calmer, and my world softer.

And baby,
I want to love you with all that I am.

I made this letter for you so that whenever you feel sad, lost, or drained, you can read this and remember one thing: you are never alone. I will always be by your side, backing you up, cheering for you, believing in you, holding you through every moment. You have me, fully.

I met you when I least expected to meet someone. Honestly, I had already given up on love before you. I stopped believing in it. I stopped believing in happy endings, in chances, in “forevers.” But then you came, and suddenly everything felt possible again. You revived my idea of love. You revived me.

I will forever be yours,
and no matter what happens, you will always have your EJ.
Mahal na mahal kita, Chi.

Happy birthday, my little timmy.

I miss you more than you know.`,
  
  audioUrl: "/music/birthday-song.m4a",
};

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Happy Birthday, {LETTER_CONFIG.recipientName} ♥</title>
        <meta
          name="description"
          content="A special birthday letter filled with love"
        />
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

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center justify-center px-4">
          <h1 className="font-[var(--font-script)] text-3xl sm:text-4xl md:text-5xl text-[hsl(var(--heart))] mb-12 text-center animate-float-slow">
            Happy Birthday {LETTER_CONFIG.recipientName} ♥
          </h1>

          <FloatingEnvelope
            message={LETTER_CONFIG.message}
            recipientName={LETTER_CONFIG.recipientName}
          />
        </div>

        {/* Music toggle */}
        <MusicToggle audioUrl={LETTER_CONFIG.audioUrl} />
      </main>
    </>
  );
};

export default Index;

import Link from "next/link";
import { Button } from "@/components/ui/button";

const GAMES = [
  {
    id: "sing-fast",
    name: "🎙️ Sing Fast",
    description: "Sing a random word from popular songs!",
    href: "/sing-fast",
  },
  {
    id: "count-and-sit",
    name: "🪑 Count and Sit",
    description: "Count alone and you're in, count with someone and you're out!",
    href: "/count-and-sit",
  },
  {
    id: "whitney-challenge",
    name: "🥁 Whitney Challenge",
    description: "Play the Whitney Houston Drum challenge",
    href: "/whitney-challenge",
  },
  {
    id: "fill-the-gap",
    name: "🔤 Fill the Gap",
    description: "Guess the word from the first and last letters!",
    href: "/fill-the-gap",
  },
  {
    id: "wrong-answers-only",
    name: "❌ Wrong Answers Only",
    description: "Answer easy questions incorrectly!",
    href: "/wrong-answers-only",
  },
  {
    id: "emogination",
    name: "🎨 Emogination",
    description: "Use your imagination to guess the food/drink using emoji",
    href: "/emogination",
  },
];

export default function Home() {
  return (
    <div>
      {/* Announcement Strip */}
      <div className="bg-yellow-300 px-6 py-4 text-center">
        <p className="font-headline text-xl md:text-2xl text-[#2d3436]">
          More games coming soon!
        </p>
      </div>

      <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-8">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <header className="mb-12 text-center">
            <h1 className="font-headline mb-4 text-6xl md:text-8xl text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,0.3)] animate-pulse-glow">
              PARTY GAMES
            </h1>
            <p className="font-ui text-2xl md:text-3xl text-white/90 font-bold">
              Retro Arcade Game Show
            </p>
          </header>

          {/* Games Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {GAMES.map((game) => (
              <Link
                key={game.id}
                href={game.href}
                className="group block animate-slide-in"
              >
                <div className="pixel-border-thick bg-white p-8 text-center transition-all duration-300 hover:scale-105 hover:bg-yellow-50">
                  <h2 className="font-headline mb-4 text-3xl md:text-4xl text-[#2d3436] md:min-h-28">
                    {game.name}
                  </h2>
                  <p className="font-ui mb-6 text-lg text-gray-600 md:min-h-24">
                    {game.description}
                  </p>
                  <Button
                    variant="retro"
                    size="xl"
                    className="w-full group-hover:animate-pulse-glow"
                  >
                    PLAY NOW
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function WhitneyChallengePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-8 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
          {/* Title */}
          <h1 className="font-headline text-4xl md:text-6xl text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,0.3)] text-center animate-slide-in">
            🥁 WHITNEY CHALLENGE
          </h1>

          {/* Placeholder content */}
          <div className="pixel-border-thick bg-white p-8 md:p-12 mb-8 text-center">
            <p className="font-ui text-lg md:text-xl text-gray-700">
              Play the Whitney Houston Drum challenge
            </p>
          </div>

          {/* Back Button */}
          <Link href="/">
            <Button variant="retro" size="xl" className="font-ui">
              Back to Games
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}


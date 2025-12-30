"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getRandomWords } from "@/lib/fill-the-gap-words";
import { playDropSound, cleanupAudioElements } from "@/lib/sounds";

type GameState = "idle" | "word-display";

/**
 * Format a word to show only first and last character with underscores in between
 * @param word - The word to format
 * @returns Formatted string like "B _ _ T" for "boat"
 */
function formatWordWithGaps(word: string): string {
  if (word.length <= 2) return word;
  const first = word[0].toUpperCase();
  const last = word[word.length - 1].toUpperCase();
  const middle = "_ ".repeat(word.length - 2).trim();
  return `${first} ${middle} ${last}`;
}

export default function FillTheGapPage() {
  const [gameState, setGameState] = useState<GameState>("idle");
  const [word, setWord] = useState<string>("");

  // Cleanup audio elements on component unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      cleanupAudioElements();
    };
  }, []);

  const startGame = () => {
    // Get a single random word
    const newWords = getRandomWords(1);
    setWord(newWords[0]);
    setGameState("word-display");
    // Play drop sound when starting the game
    playDropSound();
  };

  const handleNewRound = () => {
    // Get a new single random word
    const newWords = getRandomWords(1);
    setWord(newWords[0]);
    // Play drop sound when starting a new round
    playDropSound();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-8 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <div className="flex min-h-[60vh] items-center justify-center">
          {gameState === "idle" && (
            <div className="text-center animate-slide-in">
              <h1 className="font-headline mb-12 text-4xl md:text-6xl text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,0.3)]">
                🔤 FILL THE GAP
              </h1>
              <div className="flex flex-col items-center gap-8">
                <Button
                  variant="retro"
                  size="xl"
                  onClick={startGame}
                  className="animate-pulse-glow"
                >
                  START GAME
                </Button>
                <Link href="/">
                  <Button variant="retro" size="xl" className="font-ui">
                    Back
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {gameState === "word-display" && (
            <div className="text-center animate-slide-in w-full px-4">
              <div className="pixel-border-thick bg-yellow-300 p-8 md:p-16 lg:p-20 mb-8 w-full">
                <h2 className="font-headline text-4xl md:text-7xl lg:text-8xl xl:text-[10rem] text-[#2d3436] font-mono tracking-wider">
                  {formatWordWithGaps(word)}
                </h2>
              </div>
              <div className="w-full flex flex-col items-center gap-8">
                <Button
                  variant="retro"
                  size="xl"
                  onClick={handleNewRound}
                  className="bg-[#4ecdc4] hover:bg-[#45b8b0] w-full max-w-md"
                >
                  NEW ROUND
                </Button>
                <Link href="/">
                  <Button variant="retro" size="xl" className="font-ui">
                    Back to Games
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


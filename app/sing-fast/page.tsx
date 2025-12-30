"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getRandomWord } from "@/lib/game-words";
import { playBellSound, playDropSound, preloadAllSounds } from "@/lib/sounds";

type GameState = "idle" | "countdown" | "card-reveal" | "word-display";

export default function SingFastPage() {
  const [gameState, setGameState] = useState<GameState>("idle");
  const [countdown, setCountdown] = useState(3);
  const [word, setWord] = useState<string>("");
  const audioUnlockedRef = useRef(false);

  // Preload sounds when component mounts
  useEffect(() => {
    preloadAllSounds();
  }, []);

  const startGame = () => {
    // CRITICAL for mobile: Play sound directly in response to user interaction
    // This unlocks the audio context on mobile browsers
    playBellSound();
    audioUnlockedRef.current = true;

    // Start countdown immediately
    setGameState("countdown");
    setCountdown(3);
  };

  useEffect(() => {
    // Countdown sequence: 3, 2, 1
    // Only play sounds if audio context has been unlocked (after user interaction)
    if (gameState === "countdown" && audioUnlockedRef.current) {
      if (countdown > 1) {
        playBellSound();
        const timer = setTimeout(() => {
          setCountdown(countdown - 1);
        }, 1000);
        return () => clearTimeout(timer);
      } else if (countdown === 1) {
        // Play final bell sound for "1", then transition to word display
        playBellSound();
        setTimeout(() => {
          playDropSound();
          setWord(getRandomWord());
          setGameState("word-display");
        }, 1000);
      }
    } else if (gameState === "countdown" && !audioUnlockedRef.current) {
      // If countdown started but audio not unlocked, just update countdown
      if (countdown > 1) {
        const timer = setTimeout(() => {
          setCountdown(countdown - 1);
        }, 1000);
        return () => clearTimeout(timer);
      } else if (countdown === 1) {
        setTimeout(() => {
          setWord(getRandomWord());
          setGameState("word-display");
        }, 1000);
      }
    }
  }, [gameState, countdown]);

  const handleNewWord = () => {
    // CRITICAL for mobile: Play sound directly in response to user interaction
    // This ensures audio context remains unlocked
    playBellSound();

    // Skip "Sing Fast" card and go directly to countdown
    setGameState("countdown");
    setCountdown(3);
    setWord("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-8 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        {/* Game Content */}
        <div className="flex min-h-[60vh] items-center justify-center">
          {gameState === "idle" && (
            <div className="text-center animate-slide-in">
              <h1 className="font-headline mb-12 text-4xl md:text-6xl text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,0.3)]">
                🎙️ SING FAST
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

          {gameState === "countdown" && (
            <div className="text-center">
              <div className="animate-countdown-pop">
                <h2 className="font-headline text-[12rem] md:text-[16rem] lg:text-[20rem] text-white drop-shadow-[6px_6px_0px_rgba(0,0,0,0.4)]">
                  {countdown}
                </h2>
              </div>
            </div>
          )}

          {gameState === "word-display" && (
            <div className="text-center animate-slide-in w-full px-4">
              <div className="pixel-border-thick bg-yellow-300 p-8 md:p-16 lg:p-20 mb-8 w-full">
                <h2 className="font-headline text-3xl md:text-7xl lg:text-8xl xl:text-[10rem] text-[#2d3436] animate-pulse-glow whitespace-nowrap">
                  {word.toUpperCase()}
                </h2>
              </div>
              <div className="w-full flex flex-col items-center gap-8">
                <Button
                  variant="retro"
                  size="xl"
                  onClick={handleNewWord}
                  className="bg-[#4ecdc4] hover:bg-[#45b8b0] w-full max-w-md"
                >
                  NEW WORD
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


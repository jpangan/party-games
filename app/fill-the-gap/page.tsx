"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getRandomWords } from "@/lib/fill-the-gap-words";
import { playBellSound, cleanupAudioElements } from "@/lib/sounds";

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
  const [audioUnlocked, setAudioUnlocked] = useState<boolean>(false);
  const bellAudioRef = useRef<HTMLAudioElement>(null);

  // Cleanup audio elements on component unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      cleanupAudioElements();
    };
  }, []);

  // Set up touch/click listeners to unlock audio on any user interaction
  useEffect(() => {
    const unlockOnInteraction = () => {
      if (!audioUnlocked) {
        const audio = bellAudioRef.current;
        if (audio) {
          // Set initial volume
          audio.volume = 0.7;
          const originalVolume = audio.volume;
          audio.volume = 0.01;
          audio.currentTime = 0;
          audio
            .play()
            .then(() => {
              audio.pause();
              audio.currentTime = 0;
              audio.volume = originalVolume;
              setAudioUnlocked(true);
            })
            .catch(() => {
              audio.volume = originalVolume;
            });
        }
      }
    };

    // Listen for various interaction events
    const events = ["touchstart", "touchend", "mousedown", "click"];
    events.forEach((event) => {
      document.addEventListener(event, unlockOnInteraction, { once: true, passive: true });
    });

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, unlockOnInteraction);
      });
    };
  }, [audioUnlocked]);

  // Unlock audio context on first user interaction
  const unlockAudio = () => {
    if (audioUnlocked) return;

    // Try to unlock by playing a sound with volume 0, then restore volume
    const audio = bellAudioRef.current;
    if (audio) {
      // Ensure volume is set
      audio.volume = 0.7;
      const originalVolume = audio.volume;
      audio.volume = 0.01; // Very low but not 0 (some browsers ignore 0)
      audio.currentTime = 0;

      audio
        .play()
        .then(() => {
          audio.pause();
          audio.currentTime = 0;
          audio.volume = originalVolume;
          setAudioUnlocked(true);
        })
        .catch(() => {
          audio.volume = originalVolume;
          // If that fails, just mark as unlocked and try normal play
          setAudioUnlocked(true);
        });
    } else {
      setAudioUnlocked(true);
    }
  };

  const startGame = () => {
    // CRITICAL for mobile: Unlock audio context first, then play sound
    unlockAudio();

    // Get a single random word
    const newWords = getRandomWords(1);
    setWord(newWords[0]);
    setGameState("word-display");
    // Play bell sound when starting the game
    playBellSound();
  };

  const handleNewRound = () => {
    // Ensure audio is unlocked
    if (!audioUnlocked) {
      unlockAudio();
    }

    // CRITICAL for mobile: Play sound directly in response to user interaction
    // This ensures audio context remains unlocked
    playBellSound();

    // Get a new single random word
    const newWords = getRandomWords(1);
    setWord(newWords[0]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-8 flex items-center justify-center relative">
      {/* Hidden audio element for sound effects */}
      <audio
        ref={bellAudioRef}
        id="bell-sound"
        src="/sound-effects/bell-sound.wav"
        preload="auto"
        playsInline
        style={{ display: "none" }}
      />

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
                <h2 className="font-headline text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-[#2d3436] font-mono tracking-wider">
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


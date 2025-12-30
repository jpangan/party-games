"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getRandomEmoginationItem, type EmoginationItem } from "@/lib/emogination-items";
import { playBellSound, cleanupAudioElements } from "@/lib/sounds";

type GameState = "idle" | "card-display";

export default function EmoginationPage() {
  const [gameState, setGameState] = useState<GameState>("idle");
  const [item, setItem] = useState<EmoginationItem | null>(null);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
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

    // Get a random emoji combination
    const newItem = getRandomEmoginationItem();
    setItem(newItem);
    setIsFlipped(false);
    setGameState("card-display");
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

    // Get a new random emoji combination
    const newItem = getRandomEmoginationItem();
    setItem(newItem);
    setIsFlipped(false);
  };

  const handleCardFlip = () => {
    setIsFlipped(!isFlipped);
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
                🎨 EMOGINATION
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

          {gameState === "card-display" && item && (
            <div className="text-center animate-slide-in w-full px-4">
              {/* Flip Card */}
              <div
                className="relative w-full mb-8 cursor-pointer"
                style={{ perspective: "1000px" }}
                onClick={handleCardFlip}
              >
                <div
                  className="relative w-full transition-transform duration-500"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  {/* Front of card - Emojis */}
                  <div
                    className="pixel-border-thick bg-yellow-300 p-8 md:p-16 lg:p-20 w-full"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    <h2 className="font-headline text-6xl md:text-8xl lg:text-9xl xl:text-[12rem] text-[#2d3436]">
                      {item.emojis}
                    </h2>
                  </div>

                  {/* Back of card - Answer */}
                  <div
                    className="pixel-border-thick bg-[#4ecdc4] p-8 md:p-16 lg:p-20 w-full absolute top-0 left-0"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <h2 className="font-headline text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-[#2d3436]">
                      {item.answer}
                    </h2>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
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


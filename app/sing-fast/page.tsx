"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getRandomWord } from "@/lib/game-words";
import { playBellSound, playDropSound, cleanupAudioElements } from "@/lib/sounds";

type GameState = "idle" | "countdown" | "card-reveal" | "word-display";

export default function SingFastPage() {
  const [gameState, setGameState] = useState<GameState>("idle");
  const [countdown, setCountdown] = useState(3);
  const [word, setWord] = useState<string>("");
  // Use state instead of ref so useEffect can react to changes
  const [audioUnlocked, setAudioUnlocked] = useState<boolean>(false);
  const bellAudioRef = useRef<HTMLAudioElement>(null);
  const dropAudioRef = useRef<HTMLAudioElement>(null);

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

    // Play sound directly in response to user interaction
    // This unlocks the audio context on mobile browsers
    playBellSound();

    // Start countdown immediately
    setGameState("countdown");
    setCountdown(3);
  };

  useEffect(() => {
    // Countdown sequence: 3, 2, 1
    // Only play sounds if audio context has been unlocked (after user interaction)
    if (gameState === "countdown" && audioUnlocked) {
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
    } else if (gameState === "countdown" && !audioUnlocked) {
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
  }, [gameState, countdown, audioUnlocked]);

  const handleNewWord = () => {
    // Ensure audio is unlocked
    if (!audioUnlocked) {
      unlockAudio();
    }

    // CRITICAL for mobile: Play sound directly in response to user interaction
    // This ensures audio context remains unlocked
    playBellSound();

    // Skip "Sing Fast" card and go directly to countdown
    setGameState("countdown");
    setCountdown(3);
    setWord("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-8 flex items-center justify-center relative">
      {/* Hidden audio elements for sound effects */}
      <audio
        ref={bellAudioRef}
        id="bell-sound"
        src="/sound-effects/bell-sound.wav"
        preload="auto"
        playsInline
        style={{ display: "none" }}
      />
      <audio
        ref={dropAudioRef}
        id="drop-sound"
        src="/sound-effects/drop-sound.wav"
        preload="auto"
        playsInline
        style={{ display: "none" }}
      />

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


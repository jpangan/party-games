/**
 * Utility functions for playing sound effects
 */

/**
 * Play a sound effect from the sound-effects directory
 * @param soundName - Name of the sound file (without extension)
 */
export function playSound(soundName: "bell-sound" | "drop-sound"): void {
  if (typeof window === "undefined") return;

  const audio = new Audio(`/sound-effects/${soundName}.wav`);
  audio.volume = 0.7;
  audio.play().catch((error) => {
    console.warn("Failed to play sound:", error);
  });
}

/**
 * Play bell sound (for countdown)
 */
export function playBellSound(): void {
  playSound("bell-sound");
}

/**
 * Play drop sound (for card reveal)
 */
export function playDropSound(): void {
  playSound("drop-sound");
}


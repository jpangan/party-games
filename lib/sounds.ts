/**
 * Utility functions for playing sound effects
 * Uses embedded HTML audio elements for better mobile compatibility
 */

/**
 * Get audio element by ID selector
 * @param soundName - Name of the sound file (without extension, used as element ID)
 */
function getAudioElement(soundName: "bell-sound" | "drop-sound"): HTMLAudioElement | null {
  if (typeof window === "undefined") return null;

  const audio = document.getElementById(soundName) as HTMLAudioElement;

  if (!audio) {
    console.warn(`Audio element with id "${soundName}" not found in DOM`);
    return null;
  }

  return audio;
}

/**
 * Play a sound effect using the embedded HTML audio element
 * This function must be called directly in response to user interaction for mobile browsers
 * @param soundName - Name of the sound file (without extension, used as element ID)
 */
export function playSound(soundName: "bell-sound" | "drop-sound"): void {
  if (typeof window === "undefined") return;

  const audio = getAudioElement(soundName);

  if (!audio) return;

  // Set volume
  audio.volume = 0.7;

  // Reset to beginning and play
  audio.currentTime = 0;

  // Play the sound - this must be called directly from user interaction handler
  const playPromise = audio.play();

  if (playPromise !== undefined) {
    playPromise.catch((error) => {
      console.warn(`Failed to play sound ${soundName}:`, error);
      // On mobile, if play fails, it's usually because audio context isn't unlocked
      // The user needs to interact with the page first
    });
  }
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


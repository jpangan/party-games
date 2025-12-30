/**
 * Utility functions for playing sound effects
 * Mobile-compatible implementation following browser autoplay policies
 */

// Cache for preloaded audio objects
const audioCache: Map<string, HTMLAudioElement> = new Map();

/**
 * Preload and cache an audio file
 * @param soundName - Name of the sound file (without extension)
 */
function getAudio(soundName: "bell-sound" | "drop-sound"): HTMLAudioElement {
  if (typeof window === "undefined") {
    return {} as HTMLAudioElement;
  }

  // Return cached audio if available
  if (audioCache.has(soundName)) {
    return audioCache.get(soundName)!;
  }

  // Create and configure new audio element with mobile-friendly attributes
  const audio = new Audio(`/sound-effects/${soundName}.wav`);
  audio.volume = 0.7;
  audio.preload = "auto";

  // Critical for iOS Safari - allows inline playback
  // Set both lowercase and camelCase for maximum compatibility
  audio.setAttribute("playsinline", "true");
  // @ts-expect-error - playsInline is a valid HTML attribute for iOS but not in TypeScript types
  audio.playsInline = true;

  // Load the audio
  audio.load();

  // Cache the audio element
  audioCache.set(soundName, audio);

  return audio;
}

/**
 * Play a sound effect from the sound-effects directory
 * This function must be called directly in response to user interaction for mobile browsers
 * @param soundName - Name of the sound file (without extension)
 */
export function playSound(soundName: "bell-sound" | "drop-sound"): void {
  if (typeof window === "undefined") return;

  const audio = getAudio(soundName);

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
 * Preload all sound effects
 * Call this after user interaction to ensure sounds are ready
 */
export function preloadAllSounds(): void {
  if (typeof window === "undefined") return;

  getAudio("bell-sound");
  getAudio("drop-sound");
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


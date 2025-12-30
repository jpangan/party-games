/**
 * Utility functions for playing sound effects
 * Uses embedded HTML audio elements for better mobile compatibility
 * Clones audio elements for each play to support overlapping playback on mobile
 */

/**
 * Get the source audio element by ID selector (used as template for cloning)
 * @param soundName - Name of the sound file (without extension, used as element ID)
 */
function getSourceAudioElement(soundName: "bell-sound" | "drop-sound"): HTMLAudioElement | null {
  if (typeof window === "undefined") return null;

  const audio = document.getElementById(soundName) as HTMLAudioElement;

  if (!audio) {
    console.warn(`Audio element with id "${soundName}" not found in DOM`);
    return null;
  }

  return audio;
}

/**
 * Play a sound effect by cloning the embedded HTML audio element
 * This function must be called directly in response to user interaction for mobile browsers
 * Cloning is necessary for mobile browsers to support overlapping playback
 * @param soundName - Name of the sound file (without extension, used as element ID)
 */
export function playSound(soundName: "bell-sound" | "drop-sound"): void {
  if (typeof window === "undefined") return;

  const sourceAudio = getSourceAudioElement(soundName);

  if (!sourceAudio) return;

  // Clone the audio element for this playback
  // This is critical for mobile browsers (especially iOS) to allow overlapping sounds
  const audio = sourceAudio.cloneNode(true) as HTMLAudioElement;

  // Configure the cloned audio
  audio.volume = 0.7;
  audio.currentTime = 0;

  // Append to body temporarily (required for some mobile browsers)
  document.body.appendChild(audio);

  // Play the sound - this must be called directly from user interaction handler
  const playPromise = audio.play();

  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        // Clean up the cloned element after it finishes playing
        audio.addEventListener(
          "ended",
          () => {
            audio.remove();
          },
          { once: true }
        );
      })
      .catch((error) => {
        console.warn(`Failed to play sound ${soundName}:`, error);
        // Clean up on error
        audio.remove();

        // On mobile, if play fails, try one more time with a small delay
        // This sometimes helps with audio context unlocking
        setTimeout(() => {
          const retryAudio = sourceAudio.cloneNode(true) as HTMLAudioElement;
          retryAudio.volume = 0.7;
          retryAudio.currentTime = 0;
          document.body.appendChild(retryAudio);
          retryAudio
            .play()
            .then(() => {
              retryAudio.addEventListener(
                "ended",
                () => {
                  retryAudio.remove();
                },
                { once: true }
              );
            })
            .catch((retryError) => {
              console.warn(`Retry failed for sound ${soundName}:`, retryError);
              retryAudio.remove();
            });
        }, 100);
      });
  } else {
    // Fallback: if play() doesn't return a promise, clean up after a delay
    setTimeout(() => {
      audio.remove();
    }, 5000);
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


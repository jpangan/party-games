// Common words found in English song lyrics for the Sing Fast game
export const SONG_WORDS = [
  "love",
  "heart",
  "night",
  "dream",
  "fire",
  "dance",
  "star",
  "light",
  "time",
  "forever",
  "baby",
  "girl",
  "boy",
  "kiss",
  "hold",
  "touch",
  "feel",
  "crazy",
  "wild",
  "free",
  "fly",
  "high",
  "low",
  "down",
  "up",
  "away",
  "home",
  "soul",
  "mind",
  "body",
  "eyes",
  "smile",
  "tears",
  "rain",
  "sun",
  "moon",
  "sky",
  "ocean",
  "wave",
  "wind",
  "storm",
  "thunder",
  "lightning",
  "angel",
  "devil",
  "heaven",
  "hell",
  "paradise",
  "magic",
  "wonder",
];

/**
 * Get a random word from the song words list
 */
export function getRandomWord(): string {
  const randomIndex = Math.floor(Math.random() * SONG_WORDS.length);
  return SONG_WORDS[randomIndex];
}


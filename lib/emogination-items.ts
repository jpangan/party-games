// Emoji combinations that sound like food/drink names for Emogination game
export interface EmoginationItem {
  emojis: string;
  answer: string;
}

export const EMOGINATION_ITEMS: EmoginationItem[] = [
  { "emojis": "🍕🧀", "answer": "cheese pizza" },
  { "emojis": "🍕🍄", "answer": "mushroom pizza" },
  { "emojis": "🍕🍍", "answer": "pineapple pizza" },
  { "emojis": "🍔🧀", "answer": "cheeseburger" },
  { "emojis": "🍔🥓", "answer": "bacon burger" },
  { "emojis": "🍔🍟", "answer": "burger and fries" },
  { "emojis": "🌭🍟", "answer": "hot dog and fries" },
  { "emojis": "🌮🥩", "answer": "beef tacos" },
  { "emojis": "🌮🐟", "answer": "fish tacos" },
  { "emojis": "🌯🍗", "answer": "chicken burrito" },

  { "emojis": "🥪🧀", "answer": "grilled cheese sandwich" },
  { "emojis": "🥪🥓", "answer": "BLT sandwich" },
  { "emojis": "🥪🍗", "answer": "chicken sandwich" },
  { "emojis": "🥪🐟", "answer": "tuna sandwich" },
  { "emojis": "🍞🧈", "answer": "bread and butter" },
  { "emojis": "🥖🧄", "answer": "garlic bread" },
  { "emojis": "🥐☕", "answer": "croissant and coffee" },
  { "emojis": "🥯🧀", "answer": "bagel and cream cheese" },
  { "emojis": "🧇🍓", "answer": "waffles and strawberries" },
  { "emojis": "🥞🍯", "answer": "pancakes with syrup" },

  { "emojis": "🍳🥓", "answer": "bacon and eggs" },
  { "emojis": "🍳🧀", "answer": "cheese omelette" },
  { "emojis": "🥚🍚", "answer": "egg fried rice" },
  { "emojis": "🍗🍚", "answer": "chicken rice" },
  { "emojis": "🥩🥔", "answer": "steak and potatoes" },
  { "emojis": "🐟🍟", "answer": "fish and chips" },
  { "emojis": "🍤🍚", "answer": "shrimp rice bowl" },
  { "emojis": "🍗🍟", "answer": "fried chicken and fries" },
  { "emojis": "🍖🔥", "answer": "barbecue ribs" },
  { "emojis": "🥓🍔", "answer": "bacon burger" },
  { "emojis": "🍝🍅", "answer": "spaghetti marinara" },
  { "emojis": "🍝🧀", "answer": "mac and cheese" },
  { "emojis": "🍝🍤", "answer": "shrimp pasta" },
  { "emojis": "🍝🍄", "answer": "mushroom pasta" },
  { "emojis": "🍜🥢", "answer": "noodles / ramen" },
  { "emojis": "🍜🥚", "answer": "ramen with egg" },
  { "emojis": "🍜🐔", "answer": "chicken noodles" },
  { "emojis": "🍜🥩", "answer": "beef noodles" },
  { "emojis": "🥟🥢", "answer": "dumplings" },
  { "emojis": "🥟🍲", "answer": "wonton soup" },
  { "emojis": "🧅💍", "answer": "onion ring(s)" },
  { "emojis": "🍲🥬", "answer": "vegetable soup" },
  { "emojis": "🍲🍅", "answer": "tomato soup" },
  { "emojis": "🍛🍗", "answer": "chicken curry" },
  { "emojis": "🍛🥩", "answer": "beef curry" },
  { "emojis": "🥘🍤", "answer": "seafood paella" },
  { "emojis": "🥘🍗", "answer": "chicken paella" },
  { "emojis": "🍢🐔", "answer": "chicken skewers" },
  { "emojis": "🍢🍖", "answer": "kebabs" },
  { "emojis": "🥙🍖", "answer": "kebab wrap" },
  { "emojis": "🫓🥙", "answer": "shawarma wrap" },
  { "emojis": "🫧💧", "answer": "sparkling water" },

  { "emojis": "🥗🥑", "answer": "avocado salad" },
  { "emojis": "🥗🍗", "answer": "chicken salad" },
  { "emojis": "🥗🍅", "answer": "tomato salad" },
  { "emojis": "🥬🥕", "answer": "mixed veggies" },
  { "emojis": "🌽🧈", "answer": "buttered corn" },
  { "emojis": "🍎🥧", "answer": "apple pie" },
  { "emojis": "🍌🍞", "answer": "banana bread" },
  { "emojis": "🍓🍰", "answer": "strawberry cake" },
  { "emojis": "🍋🍰", "answer": "lemon cake" },
  { "emojis": "🥧🍒", "answer": "cherry pie" },

  { "emojis": "🍫🍪", "answer": "chocolate cookie" },
  { "emojis": "🍪🥛", "answer": "cookies and milk" },
  { "emojis": "🍫🍓", "answer": "chocolate strawberries" },
  { "emojis": "🍩🍫", "answer": "chocolate donut" },
  { "emojis": "🍩🍓", "answer": "strawberry donut" },
  { "emojis": "🍦🍫", "answer": "chocolate ice cream" },
  { "emojis": "🍦🍓", "answer": "strawberry ice cream" },
  { "emojis": "🍨🍒", "answer": "ice cream sundae" },
  { "emojis": "🍧🍓", "answer": "strawberry shaved ice" },
  { "emojis": "🧁🍫", "answer": "chocolate cupcake" },

  { "emojis": "🧁🍓", "answer": "strawberry cupcake" },
  { "emojis": "🍰☕", "answer": "cake and coffee" },
  { "emojis": "☕🍩", "answer": "coffee and donut" },
  { "emojis": "🍵🍡", "answer": "matcha and mochi" },
  { "emojis": "🧋🧊", "answer": "iced milk tea" },
  { "emojis": "🍓🥤", "answer": "strawberry smoothie" },
  { "emojis": "🍌🥤", "answer": "banana smoothie" },
  { "emojis": "🥭🥤", "answer": "mango smoothie" },
  { "emojis": "🍊🧃", "answer": "orange juice" },
  { "emojis": "🍎🧃", "answer": "apple juice" }
]
;

/**
 * Get a random emoji combination from the list
 * @returns A random EmoginationItem
 */
export function getRandomEmoginationItem(): EmoginationItem {
  const randomIndex = Math.floor(Math.random() * EMOGINATION_ITEMS.length);
  return EMOGINATION_ITEMS[randomIndex];
}


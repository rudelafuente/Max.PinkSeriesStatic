// Pink Series CVC Word Dataset
// Phoneme mapping note: "c" in words like "cat" maps to "k" (available audio file)

const WORDS = [
  // -at family
  { word: "at",  family: "at", phonemes: ["a", "t"],       emoji: "" },
  { word: "cat", family: "at", phonemes: ["k", "a", "t"],  emoji: "🐱" },
  { word: "mat", family: "at", phonemes: ["m", "a", "t"],  emoji: "🟫" },
  { word: "sat", family: "at", phonemes: ["s", "a", "t"],  emoji: "💺" },
  { word: "hat", family: "at", phonemes: ["h", "a", "t"],  emoji: "🎩" },
  { word: "rat", family: "at", phonemes: ["r", "a", "t"],  emoji: "🐀" },

  // -an family
  { word: "an",  family: "an", phonemes: ["a", "n"],       emoji: "" },
  { word: "man", family: "an", phonemes: ["m", "a", "n"],  emoji: "👨" },
  { word: "pan", family: "an", phonemes: ["p", "a", "n"],  emoji: "🍳" },
  { word: "can", family: "an", phonemes: ["k", "a", "n"],  emoji: "🥫" },
  { word: "fan", family: "an", phonemes: ["f", "a", "n"],  emoji: "🌀" },

  // -in family
  { word: "in",  family: "in", phonemes: ["i", "n"],       emoji: "" },
  { word: "pin", family: "in", phonemes: ["p", "i", "n"],  emoji: "📌" },
  { word: "tin", family: "in", phonemes: ["t", "i", "n"],  emoji: "🥫" },
  { word: "bin", family: "in", phonemes: ["b", "i", "n"],  emoji: "🗑️" },
  { word: "fin", family: "in", phonemes: ["f", "i", "n"],  emoji: "🦈" },

  // -og family
  { word: "dog", family: "og", phonemes: ["d", "o", "g"],  emoji: "🐕" },
  { word: "log", family: "og", phonemes: ["l", "o", "g"],  emoji: "🪵" },
  { word: "fog", family: "og", phonemes: ["f", "o", "g"],  emoji: "🌫️" },

  // -un family
  { word: "sun", family: "un", phonemes: ["s", "u", "n"],  emoji: "☀️" },
  { word: "run", family: "un", phonemes: ["r", "u", "n"],  emoji: "🏃" },
  { word: "fun", family: "un", phonemes: ["f", "u", "n"],  emoji: "🎉" },

  // -en family
  { word: "pen", family: "en", phonemes: ["p", "e", "n"],  emoji: "🖊️" },
  { word: "ten", family: "en", phonemes: ["t", "e", "n"],  emoji: "🔟" },
  { word: "hen", family: "en", phonemes: ["h", "e", "n"],  emoji: "🐔" },

  // -ug family
  { word: "mug", family: "ug", phonemes: ["m", "u", "g"],  emoji: "☕" },
  { word: "bug", family: "ug", phonemes: ["b", "u", "g"],  emoji: "🐛" },
  { word: "rug", family: "ug", phonemes: ["r", "u", "g"],  emoji: "🟫" },

  // -op family
  { word: "top", family: "op", phonemes: ["t", "o", "p"],  emoji: "🪀" },
  { word: "mop", family: "op", phonemes: ["m", "o", "p"],  emoji: "🧹" },
  { word: "pop", family: "op", phonemes: ["p", "o", "p"],  emoji: "🎈" }
];

const FAMILIES = [...new Set(WORDS.map(w => w.family))];

function getAudioPathForPhoneme(phoneme) {
  return "audio/phonemes/" + phoneme + ".mp3";
}

function getWordsByFamily(family) {
  return WORDS.filter(w => w.family === family);
}

function getRandomWord(excludeWord) {
  const pool = excludeWord ? WORDS.filter(w => w.word !== excludeWord) : WORDS;
  return pool[Math.floor(Math.random() * pool.length)];
}

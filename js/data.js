// Pink Series CVC Word Dataset
// Phoneme mapping note: "c" in words like "cat" maps to "k" (available audio file)

const WORDS = [
  // -at family
  { word: "at",  family: "at", phonemes: ["a", "t"] },
  { word: "cat", family: "at", phonemes: ["k", "a", "t"] },
  { word: "mat", family: "at", phonemes: ["m", "a", "t"] },
  { word: "sat", family: "at", phonemes: ["s", "a", "t"] },
  { word: "hat", family: "at", phonemes: ["h", "a", "t"] },
  { word: "rat", family: "at", phonemes: ["r", "a", "t"] },

  // -an family
  { word: "an",  family: "an", phonemes: ["a", "n"] },
  { word: "man", family: "an", phonemes: ["m", "a", "n"] },
  { word: "pan", family: "an", phonemes: ["p", "a", "n"] },
  { word: "can", family: "an", phonemes: ["k", "a", "n"] },
  { word: "fan", family: "an", phonemes: ["f", "a", "n"] },

  // -in family
  { word: "in",  family: "in", phonemes: ["i", "n"] },
  { word: "pin", family: "in", phonemes: ["p", "i", "n"] },
  { word: "tin", family: "in", phonemes: ["t", "i", "n"] },
  { word: "bin", family: "in", phonemes: ["b", "i", "n"] },
  { word: "fin", family: "in", phonemes: ["f", "i", "n"] },

  // -og family
  { word: "dog", family: "og", phonemes: ["d", "o", "g"] },
  { word: "log", family: "og", phonemes: ["l", "o", "g"] },
  { word: "fog", family: "og", phonemes: ["f", "o", "g"] },

  // -un family
  { word: "sun", family: "un", phonemes: ["s", "u", "n"] },
  { word: "run", family: "un", phonemes: ["r", "u", "n"] },
  { word: "fun", family: "un", phonemes: ["f", "u", "n"] },

  // -en family
  { word: "pen", family: "en", phonemes: ["p", "e", "n"] },
  { word: "ten", family: "en", phonemes: ["t", "e", "n"] },
  { word: "hen", family: "en", phonemes: ["h", "e", "n"] },

  // -ug family
  { word: "mug", family: "ug", phonemes: ["m", "u", "g"] },
  { word: "bug", family: "ug", phonemes: ["b", "u", "g"] },
  { word: "rug", family: "ug", phonemes: ["r", "u", "g"] },

  // -op family
  { word: "top", family: "op", phonemes: ["t", "o", "p"] },
  { word: "mop", family: "op", phonemes: ["m", "o", "p"] },
  { word: "pop", family: "op", phonemes: ["p", "o", "p"] }
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

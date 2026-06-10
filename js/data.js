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
  { word: "pop", family: "op", phonemes: ["p", "o", "p"],  emoji: "🎈" },

  // -ag family
  { word: "bag", family: "ag", phonemes: ["b", "a", "g"],  emoji: "👜" },
  { word: "tag", family: "ag", phonemes: ["t", "a", "g"],  emoji: "🏷️" },
  { word: "rag", family: "ag", phonemes: ["r", "a", "g"],  emoji: "🧹" },
  { word: "nag", family: "ag", phonemes: ["n", "a", "g"],  emoji: "🐴" },
  { word: "wag", family: "ag", phonemes: ["w", "a", "g"],  emoji: "🐶" },

  // -ap family
  { word: "cap", family: "ap", phonemes: ["k", "a", "p"],  emoji: "🧢" },
  { word: "map", family: "ap", phonemes: ["m", "a", "p"],  emoji: "🗺️" },
  { word: "nap", family: "ap", phonemes: ["n", "a", "p"],  emoji: "😴" },
  { word: "tap", family: "ap", phonemes: ["t", "a", "p"],  emoji: "🚿" },
  { word: "gap", family: "ap", phonemes: ["g", "a", "p"],  emoji: "" },

  // -ed family
  { word: "bed", family: "ed", phonemes: ["b", "e", "d"],  emoji: "🛏️" },
  { word: "red", family: "ed", phonemes: ["r", "e", "d"],  emoji: "🔴" },
  { word: "fed", family: "ed", phonemes: ["f", "e", "d"],  emoji: "🍼" },
  { word: "led", family: "ed", phonemes: ["l", "e", "d"],  emoji: "💡" },
  { word: "wed", family: "ed", phonemes: ["w", "e", "d"],  emoji: "💍" },

  // -et family
  { word: "jet", family: "et", phonemes: ["j", "e", "t"],  emoji: "✈️" },
  { word: "net", family: "et", phonemes: ["n", "e", "t"],  emoji: "🥅" },
  { word: "pet", family: "et", phonemes: ["p", "e", "t"],  emoji: "🐾" },
  { word: "set", family: "et", phonemes: ["s", "e", "t"],  emoji: "" },
  { word: "wet", family: "et", phonemes: ["w", "e", "t"],  emoji: "💧" },

  // -ig family
  { word: "big", family: "ig", phonemes: ["b", "i", "g"],  emoji: "🐘" },
  { word: "dig", family: "ig", phonemes: ["d", "i", "g"],  emoji: "⛏️" },
  { word: "fig", family: "ig", phonemes: ["f", "i", "g"],  emoji: "🍑" },
  { word: "jig", family: "ig", phonemes: ["j", "i", "g"],  emoji: "💃" },
  { word: "pig", family: "ig", phonemes: ["p", "i", "g"],  emoji: "🐷" },
  { word: "wig", family: "ig", phonemes: ["w", "i", "g"],  emoji: "👱" },

  // -ip family
  { word: "dip", family: "ip", phonemes: ["d", "i", "p"],  emoji: "🫙" },
  { word: "hip", family: "ip", phonemes: ["h", "i", "p"],  emoji: "" },
  { word: "lip", family: "ip", phonemes: ["l", "i", "p"],  emoji: "💋" },
  { word: "rip", family: "ip", phonemes: ["r", "i", "p"],  emoji: "" },
  { word: "sip", family: "ip", phonemes: ["s", "i", "p"],  emoji: "🥤" },
  { word: "tip", family: "ip", phonemes: ["t", "i", "p"],  emoji: "" },
  { word: "zip", family: "ip", phonemes: ["z", "i", "p"],  emoji: "🤐" },

  // -it family
  { word: "bit", family: "it", phonemes: ["b", "i", "t"],  emoji: "" },
  { word: "fit", family: "it", phonemes: ["f", "i", "t"],  emoji: "💪" },
  { word: "hit", family: "it", phonemes: ["h", "i", "t"],  emoji: "🏏" },
  { word: "kit", family: "it", phonemes: ["k", "i", "t"],  emoji: "🧰" },
  { word: "sit", family: "it", phonemes: ["s", "i", "t"],  emoji: "🪑" },
  { word: "wit", family: "it", phonemes: ["w", "i", "t"],  emoji: "" },

  // -ot family
  { word: "cot", family: "ot", phonemes: ["k", "o", "t"],  emoji: "🛏️" },
  { word: "dot", family: "ot", phonemes: ["d", "o", "t"],  emoji: "🔵" },
  { word: "got", family: "ot", phonemes: ["g", "o", "t"],  emoji: "" },
  { word: "hot", family: "ot", phonemes: ["h", "o", "t"],  emoji: "🔥" },
  { word: "lot", family: "ot", phonemes: ["l", "o", "t"],  emoji: "" },
  { word: "pot", family: "ot", phonemes: ["p", "o", "t"],  emoji: "🪴" },

  // -ub family
  { word: "cub", family: "ub", phonemes: ["k", "u", "b"],  emoji: "🐻" },
  { word: "hub", family: "ub", phonemes: ["h", "u", "b"],  emoji: "" },
  { word: "rub", family: "ub", phonemes: ["r", "u", "b"],  emoji: "" },
  { word: "sub", family: "ub", phonemes: ["s", "u", "b"],  emoji: "🥖" },
  { word: "tub", family: "ub", phonemes: ["t", "u", "b"],  emoji: "🛁" },

  // -ut family
  { word: "but", family: "ut", phonemes: ["b", "u", "t"],  emoji: "" },
  { word: "cut", family: "ut", phonemes: ["k", "u", "t"],  emoji: "✂️" },
  { word: "gut", family: "ut", phonemes: ["g", "u", "t"],  emoji: "" },
  { word: "hut", family: "ut", phonemes: ["h", "u", "t"],  emoji: "🛖" },
  { word: "nut", family: "ut", phonemes: ["n", "u", "t"],  emoji: "🥜" }
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

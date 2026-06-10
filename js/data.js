// Pink Series CVC Word Dataset
// Phoneme mapping note: "c" in words like "cat" maps to "k" (available audio file)

const WORDS = [
  // High-frequency support words for sentence reading
  { word: "a",   series: "pink", family: "support", support: true, phonemes: ["schwa"],             emoji: "" },
  { word: "the", series: "pink", family: "support", support: true, phonemes: ["th_voiced","schwa"], emoji: "" },
  { word: "and", series: "pink", family: "support", support: true, phonemes: ["a","n","d"],         emoji: "" },
  { word: "is",  series: "pink", family: "support", support: true, phonemes: ["i","z"],             emoji: "" },
  { word: "on",  series: "pink", family: "support", support: true, phonemes: ["o","n"],             emoji: "" },
  { word: "has", series: "pink", family: "support", support: true, phonemes: ["h","a","z"],         emoji: "" },
  { word: "i",   series: "pink", family: "support", support: true, phonemes: ["igh"],               emoji: "" },

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
  { word: "nut", family: "ut", phonemes: ["n", "u", "t"],  emoji: "🥜" },

  // -am family
  { word: "ham", family: "am", phonemes: ["h", "a", "m"],  emoji: "🥩" },
  { word: "jam", family: "am", phonemes: ["j", "a", "m"],  emoji: "🍯" },
  { word: "ram", family: "am", phonemes: ["r", "a", "m"],  emoji: "🐏" },
  { word: "yam", family: "am", phonemes: ["y", "a", "m"],  emoji: "🍠" },
  { word: "dam", family: "am", phonemes: ["d", "a", "m"],  emoji: "" },

  // -ad family
  { word: "bad", family: "ad", phonemes: ["b", "a", "d"],  emoji: "👎" },
  { word: "dad", family: "ad", phonemes: ["d", "a", "d"],  emoji: "👨" },
  { word: "had", family: "ad", phonemes: ["h", "a", "d"],  emoji: "" },
  { word: "mad", family: "ad", phonemes: ["m", "a", "d"],  emoji: "😠" },
  { word: "sad", family: "ad", phonemes: ["s", "a", "d"],  emoji: "😢" },

  // -ob family
  { word: "job", family: "ob", phonemes: ["j", "o", "b"],  emoji: "💼" },
  { word: "cob", family: "ob", phonemes: ["k", "o", "b"],  emoji: "🌽" },
  { word: "rob", family: "ob", phonemes: ["r", "o", "b"],  emoji: "" },
  { word: "sob", family: "ob", phonemes: ["s", "o", "b"],  emoji: "😭" },
  { word: "mob", family: "ob", phonemes: ["m", "o", "b"],  emoji: "" },

  // -um family
  { word: "gum", family: "um", phonemes: ["g", "u", "m"],  emoji: "🫧" },
  { word: "hum", family: "um", phonemes: ["h", "u", "m"],  emoji: "🎵" },
  { word: "mum", family: "um", phonemes: ["m", "u", "m"],  emoji: "👩" },
  { word: "sum", family: "um", phonemes: ["s", "u", "m"],  emoji: "➕" },
  { word: "yum", family: "um", phonemes: ["y", "u", "m"],  emoji: "😋" },

  // ── Blue Series — consonant blends ──────────────────────────────────────

  // fl
  { word: "flag", series: "blue", family: "fl", phonemes: ["f","l","a","g"], emoji: "🚩" },
  { word: "flat", series: "blue", family: "fl", phonemes: ["f","l","a","t"], emoji: "" },
  { word: "flip", series: "blue", family: "fl", phonemes: ["f","l","i","p"], emoji: "" },

  // fr
  { word: "frog", series: "blue", family: "fr", phonemes: ["f","r","o","g"], emoji: "🐸" },
  { word: "fret", series: "blue", family: "fr", phonemes: ["f","r","e","t"], emoji: "" },

  // bl
  { word: "blob", series: "blue", family: "bl", phonemes: ["b","l","o","b"], emoji: "" },
  { word: "blot", series: "blue", family: "bl", phonemes: ["b","l","o","t"], emoji: "" },
  { word: "bled", series: "blue", family: "bl", phonemes: ["b","l","e","d"], emoji: "" },

  // cl
  { word: "clap", series: "blue", family: "cl", phonemes: ["k","l","a","p"], emoji: "👏" },
  { word: "clip", series: "blue", family: "cl", phonemes: ["k","l","i","p"], emoji: "📎" },
  { word: "clop", series: "blue", family: "cl", phonemes: ["k","l","o","p"], emoji: "🐴" },

  // cr
  { word: "crab", series: "blue", family: "cr", phonemes: ["k","r","a","b"], emoji: "🦀" },
  { word: "crop", series: "blue", family: "cr", phonemes: ["k","r","o","p"], emoji: "🌾" },
  { word: "cram", series: "blue", family: "cr", phonemes: ["k","r","a","m"], emoji: "" },

  // dr
  { word: "drip", series: "blue", family: "dr", phonemes: ["d","r","i","p"], emoji: "💧" },
  { word: "drop", series: "blue", family: "dr", phonemes: ["d","r","o","p"], emoji: "💧" },
  { word: "drum", series: "blue", family: "dr", phonemes: ["d","r","u","m"], emoji: "🥁" },

  // gr
  { word: "grab", series: "blue", family: "gr", phonemes: ["g","r","a","b"], emoji: "" },
  { word: "grin", series: "blue", family: "gr", phonemes: ["g","r","i","n"], emoji: "😁" },
  { word: "grip", series: "blue", family: "gr", phonemes: ["g","r","i","p"], emoji: "" },

  // pl
  { word: "plan", series: "blue", family: "pl", phonemes: ["p","l","a","n"], emoji: "📋" },
  { word: "plop", series: "blue", family: "pl", phonemes: ["p","l","o","p"], emoji: "" },
  { word: "plug", series: "blue", family: "pl", phonemes: ["p","l","u","g"], emoji: "🔌" },

  // sl
  { word: "slap", series: "blue", family: "sl", phonemes: ["s","l","a","p"], emoji: "" },
  { word: "slim", series: "blue", family: "sl", phonemes: ["s","l","i","m"], emoji: "" },
  { word: "slip", series: "blue", family: "sl", phonemes: ["s","l","i","p"], emoji: "🍌" },

  // sn
  { word: "snap", series: "blue", family: "sn", phonemes: ["s","n","a","p"], emoji: "" },
  { word: "snip", series: "blue", family: "sn", phonemes: ["s","n","i","p"], emoji: "✂️" },

  // sp
  { word: "spin", series: "blue", family: "sp", phonemes: ["s","p","i","n"], emoji: "🌀" },
  { word: "spot", series: "blue", family: "sp", phonemes: ["s","p","o","t"], emoji: "🔵" },
  { word: "span", series: "blue", family: "sp", phonemes: ["s","p","a","n"], emoji: "" },

  // st
  { word: "step", series: "blue", family: "st", phonemes: ["s","t","e","p"], emoji: "👣" },
  { word: "stop", series: "blue", family: "st", phonemes: ["s","t","o","p"], emoji: "🛑" },
  { word: "stem", series: "blue", family: "st", phonemes: ["s","t","e","m"], emoji: "🌱" },

  // sw
  { word: "swim", series: "blue", family: "sw", phonemes: ["s","w","i","m"], emoji: "🏊" },
  { word: "swam", series: "blue", family: "sw", phonemes: ["s","w","a","m"], emoji: "🏊" },

  // tr
  { word: "trap", series: "blue", family: "tr", phonemes: ["t","r","a","p"], emoji: "" },
  { word: "trim", series: "blue", family: "tr", phonemes: ["t","r","i","m"], emoji: "✂️" },
  { word: "trip", series: "blue", family: "tr", phonemes: ["t","r","i","p"], emoji: "🧳" },
  { word: "trot", series: "blue", family: "tr", phonemes: ["t","r","o","t"], emoji: "🐴" },

  // sk
  { word: "skip", series: "blue", family: "sk", phonemes: ["s","k","i","p"], emoji: "🤸" },
  { word: "skid", series: "blue", family: "sk", phonemes: ["s","k","i","d"], emoji: "" },

  // ── Green Series — digraphs ──────────────────────────────────────────────

  // sh
  { word: "ship", series: "green", family: "sh", phonemes: ["sh","i","p"],   emoji: "🚢" },
  { word: "shop", series: "green", family: "sh", phonemes: ["sh","o","p"],   emoji: "🛒" },
  { word: "shed", series: "green", family: "sh", phonemes: ["sh","e","d"],   emoji: "🏚️" },
  { word: "shin", series: "green", family: "sh", phonemes: ["sh","i","n"],   emoji: "🦵" },
  { word: "shut", series: "green", family: "sh", phonemes: ["sh","u","t"],   emoji: "🚪" },
  { word: "shot", series: "green", family: "sh", phonemes: ["sh","o","t"],   emoji: "" },

  // ch
  { word: "chin", series: "green", family: "ch", phonemes: ["ch","i","n"],   emoji: "" },
  { word: "chip", series: "green", family: "ch", phonemes: ["ch","i","p"],   emoji: "🍟" },
  { word: "chop", series: "green", family: "ch", phonemes: ["ch","o","p"],   emoji: "🔪" },
  { word: "chat", series: "green", family: "ch", phonemes: ["ch","a","t"],   emoji: "💬" },

  // th (unvoiced — uses th.mp3)
  { word: "thin", series: "green", family: "th", phonemes: ["th","i","n"],   emoji: "" },
  { word: "math", series: "green", family: "th", phonemes: ["m","a","th"],   emoji: "🔢" },
  { word: "path", series: "green", family: "th", phonemes: ["p","a","th"],   emoji: "🛤️" },
  { word: "bath", series: "green", family: "th", phonemes: ["b","a","th"],   emoji: "🛁" },
  { word: "with", series: "green", family: "th", phonemes: ["w","i","th"],   emoji: "" },

  // ng
  { word: "ring", series: "green", family: "ng", phonemes: ["r","i","ng"],   emoji: "💍" },
  { word: "sing", series: "green", family: "ng", phonemes: ["s","i","ng"],   emoji: "🎤" },
  { word: "king", series: "green", family: "ng", phonemes: ["k","i","ng"],   emoji: "👑" },
  { word: "wing", series: "green", family: "ng", phonemes: ["w","i","ng"],   emoji: "🪽" },
  { word: "song", series: "green", family: "ng", phonemes: ["s","o","ng"],   emoji: "🎵" },
  { word: "long", series: "green", family: "ng", phonemes: ["l","o","ng"],   emoji: "" },
  { word: "lung", series: "green", family: "ng", phonemes: ["l","u","ng"],   emoji: "🫁" },
  { word: "hung", series: "green", family: "ng", phonemes: ["h","u","ng"],   emoji: "" },
  { word: "sung", series: "green", family: "ng", phonemes: ["s","u","ng"],   emoji: "🎶" }
];

const FAMILIES = [...new Set(WORDS.map(w => w.family))];

const PINK_SENTENCES = [
  { text: "The cat sat on the mat.", words: ["the", "cat", "sat", "on", "the", "mat"] },
  { text: "A dog is in the fog.", words: ["a", "dog", "is", "in", "the", "fog"] },
  { text: "The hen is in the pen.", words: ["the", "hen", "is", "in", "the", "pen"] },
  { text: "Mum and Dad had jam.", words: ["mum", "and", "dad", "had", "jam"] },
  { text: "A man has a red hat.", words: ["a", "man", "has", "a", "red", "hat"] },
  { text: "The bug is on the rug.", words: ["the", "bug", "is", "on", "the", "rug"] },
  { text: "The dog got wet.", words: ["the", "dog", "got", "wet"] },
  { text: "A big pig can run.", words: ["a", "big", "pig", "can", "run"] },
  { text: "The sun is hot.", words: ["the", "sun", "is", "hot"] },
  { text: "A cap is in the bin.", words: ["a", "cap", "is", "in", "the", "bin"] },
  { text: "The ram is on the mat.", words: ["the", "ram", "is", "on", "the", "mat"] },
  { text: "I can run and sit.", words: ["i", "can", "run", "and", "sit"] },
  { text: "The tin is in the bag.", words: ["the", "tin", "is", "in", "the", "bag"] },
  { text: "A pet can sit.", words: ["a", "pet", "can", "sit"] },
  { text: "The cub is in the tub.", words: ["the", "cub", "is", "in", "the", "tub"] },
  { text: "The pan is hot.", words: ["the", "pan", "is", "hot"] },
  { text: "Dad has a big map.", words: ["dad", "has", "a", "big", "map"] },
  { text: "The cat and dog can nap.", words: ["the", "cat", "and", "dog", "can", "nap"] }
];

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

// ─────────────────────────────────────────────────────────────────────────────
// stories.js — Year 1 reading stories for Pink Series app
// Text: original simplified writing for early readers (3-8 words per sentence)
// To replace with exact public-domain text later, search for the comment:
//   // REPLACE: <source>
// and substitute the corresponding Project Gutenberg passage.
// ─────────────────────────────────────────────────────────────────────────────

var stories = [

  // ── 1. The Lion and the Mouse ──────────────────────────────────────────────
  {
    id: "lion-and-mouse",
    title: "The Lion and the Mouse",
    level: "Year 1 assisted",
    duration: "~3 min",
    emoji: "🦁",
    sourceTextUrl: "https://www.gutenberg.org/files/19994/19994-h/19994-h.htm",
    sourceAudioUrl: "https://librivox.org/the-aesop-for-children-by-aesop/",
    audioFile: "assets/audio/lion-and-mouse.mp3",
    // REPLACE: Aesop for Children — "The Lion and the Mouse" fable
    pages: [
      { text: "A big lion was sleeping.", words: ["big", "lion", "sleeping"] },
      { text: "A little mouse ran near him.", words: ["little", "mouse", "ran"] },
      { text: "The mouse woke the lion up.", words: ["mouse", "woke", "lion"] },
      { text: "The lion caught the mouse.", words: ["lion", "caught", "mouse"] },
      { text: "Please let me go! said the mouse.", words: ["please", "let", "go"] },
      { text: "I will help you one day.", words: ["help", "one", "day"] },
      { text: "The lion laughed. He let the mouse go.", words: ["laughed", "let"] },
      { text: "Later, hunters caught the lion in a net.", words: ["hunters", "net"] },
      { text: "The little mouse heard him roar.", words: ["heard", "roar"] },
      { text: "The mouse bit through the net.", words: ["bit", "through", "net"] },
      { text: "The lion was free!", words: ["lion", "free"] },
      { text: "Thank you, little friend! said the lion.", words: ["thank", "friend"] }
    ],
    practiceWords: ["lion", "mouse", "net", "free", "help"],
    phonicsFocus: ["ou", "ee", "igh"],
    comprehensionQuestion: "Who helped the lion get free?",
    moral: "Even small friends can help."
  },

  // ── 2. The Fox and the Grapes ──────────────────────────────────────────────
  {
    id: "fox-and-grapes",
    title: "The Fox and the Grapes",
    level: "Year 1 assisted",
    duration: "~2 min",
    emoji: "🦊",
    sourceTextUrl: "https://www.gutenberg.org/files/19994/19994-h/19994-h.htm",
    sourceAudioUrl: "https://librivox.org/the-aesop-for-children-by-aesop/",
    audioFile: "assets/audio/fox-and-grapes.mp3",
    // REPLACE: Aesop for Children — "The Fox and the Grapes" fable
    pages: [
      { text: "A fox walked through the forest.", words: ["fox", "walked", "forest"] },
      { text: "He saw some grapes on a vine.", words: ["saw", "grapes", "vine"] },
      { text: "The grapes looked big and sweet.", words: ["big", "sweet"] },
      { text: "I want those grapes! said the fox.", words: ["want", "grapes"] },
      { text: "He jumped up. He could not reach.", words: ["jumped", "reach"] },
      { text: "He tried again and again.", words: ["tried", "again"] },
      { text: "At last the fox gave up.", words: ["last", "gave"] },
      { text: "Those grapes are sour! he said.", words: ["sour"] },
      { text: "He walked away.", words: ["walked", "away"] }
    ],
    practiceWords: ["fox", "grapes", "jump", "sour", "reach"],
    phonicsFocus: ["oa", "ee", "ou"],
    comprehensionQuestion: "Why did the fox walk away?",
    moral: "Don't pretend you don't want what you can't have."
  },

  // ── 3. The Dog and His Shadow ──────────────────────────────────────────────
  {
    id: "dog-and-shadow",
    title: "The Dog and His Shadow",
    level: "Year 1 assisted",
    duration: "~2 min",
    emoji: "🐕",
    sourceTextUrl: "https://www.gutenberg.org/files/19994/19994-h/19994-h.htm",
    sourceAudioUrl: "https://librivox.org/the-aesop-for-children-by-aesop/",
    audioFile: "assets/audio/dog-and-shadow.mp3",
    // REPLACE: Aesop for Children — "The Dog and His Shadow" fable
    pages: [
      { text: "A dog found a big bone.", words: ["dog", "found", "bone"] },
      { text: "He was very happy.", words: ["very", "happy"] },
      { text: "He walked home over a bridge.", words: ["walked", "bridge"] },
      { text: "He looked down at the water.", words: ["looked", "water"] },
      { text: "He saw another dog below!", words: ["saw", "another"] },
      { text: "That dog had a big bone too.", words: ["bone", "too"] },
      { text: "I want that bone! he thought.", words: ["want", "thought"] },
      { text: "He snapped at the other dog.", words: ["snapped", "other"] },
      { text: "Splash! His bone fell in the water.", words: ["splash", "fell"] },
      { text: "It was just his own shadow.", words: ["shadow", "own"] },
      { text: "Now the dog had no bone.", words: ["now", "bone"] }
    ],
    practiceWords: ["dog", "bone", "bridge", "shadow", "water"],
    phonicsFocus: ["ow", "oa", "ai"],
    comprehensionQuestion: "What did the dog see in the water?",
    moral: "Be happy with what you have."
  },

  // ── 4. The Hare and the Tortoise ───────────────────────────────────────────
  {
    id: "hare-and-tortoise",
    title: "The Hare and the Tortoise",
    level: "Year 1 assisted",
    duration: "~3 min",
    emoji: "🐢",
    sourceTextUrl: "https://www.gutenberg.org/files/19994/19994-h/19994-h.htm",
    sourceAudioUrl: "https://librivox.org/the-aesop-for-children-by-aesop/",
    audioFile: "assets/audio/hare-and-tortoise.mp3",
    // REPLACE: Aesop for Children — "The Hare and the Tortoise" fable
    pages: [
      { text: "A hare and a tortoise met.", words: ["hare", "tortoise", "met"] },
      { text: "I am the fastest! said the hare.", words: ["fastest", "hare"] },
      { text: "Let us race! said the tortoise.", words: ["race", "tortoise"] },
      { text: "The race began.", words: ["race", "began"] },
      { text: "The hare ran very fast.", words: ["hare", "fast"] },
      { text: "I have time for a rest, he said.", words: ["time", "rest"] },
      { text: "The hare fell asleep.", words: ["hare", "asleep"] },
      { text: "The tortoise walked on slowly.", words: ["tortoise", "slowly"] },
      { text: "He did not stop.", words: ["stop"] },
      { text: "The tortoise crossed the finish line!", words: ["finish", "line"] },
      { text: "The hare woke up too late.", words: ["woke", "late"] },
      { text: "The tortoise had won the race!", words: ["won", "race"] }
    ],
    practiceWords: ["hare", "tortoise", "race", "fast", "slow"],
    phonicsFocus: ["ai", "ee", "or"],
    comprehensionQuestion: "Who won the race?",
    moral: "Slow and steady wins the race."
  },

  // ── 5. The Shepherd Boy and the Wolf ───────────────────────────────────────
  {
    id: "shepherd-boy",
    title: "The Shepherd Boy and the Wolf",
    level: "Year 1 assisted",
    duration: "~3 min",
    emoji: "🐺",
    sourceTextUrl: "https://www.gutenberg.org/files/19994/19994-h/19994-h.htm",
    sourceAudioUrl: "https://librivox.org/the-aesop-for-children-by-aesop/",
    audioFile: "assets/audio/shepherd-boy.mp3",
    // REPLACE: Aesop for Children — "The Shepherd Boy and the Wolf" fable
    pages: [
      { text: "A boy looked after sheep on a hill.", words: ["boy", "sheep", "hill"] },
      { text: "It was quiet. He was bored.", words: ["quiet", "bored"] },
      { text: "Wolf! Wolf! he cried.", words: ["wolf", "cried"] },
      { text: "The people ran up to help.", words: ["people", "help"] },
      { text: "There was no wolf.", words: ["no", "wolf"] },
      { text: "The boy laughed at them.", words: ["laughed"] },
      { text: "The next day, he did it again.", words: ["next", "again"] },
      { text: "Wolf! Wolf! he cried.", words: ["wolf", "cried"] },
      { text: "Again no one found a wolf.", words: ["found", "wolf"] },
      { text: "Then one day a real wolf came!", words: ["real", "wolf"] },
      { text: "Wolf! Wolf! cried the boy.", words: ["wolf", "cried"] },
      { text: "No one came. No one believed him.", words: ["believed"] }
    ],
    practiceWords: ["wolf", "sheep", "cry", "help", "truth"],
    phonicsFocus: ["oo", "ee", "igh"],
    comprehensionQuestion: "Why did no one come when the real wolf came?",
    moral: "Always tell the truth."
  },

  // ── 6. The Three Little Pigs ───────────────────────────────────────────────
  {
    id: "three-little-pigs",
    title: "The Three Little Pigs",
    level: "Year 1 read aloud",
    duration: "~4 min",
    emoji: "🐷",
    sourceTextUrl: "https://www.gutenberg.org/files/15661/15661-h/15661-h.htm",
    sourceAudioUrl: "https://librivox.org/three-little-pigs-by-l-leslie-brooke/",
    audioFile: "assets/audio/three-little-pigs.mp3",
    // REPLACE: Golden Goose Book — "The Three Little Pigs"
    pages: [
      { text: "Three little pigs left home.", words: ["three", "pigs", "home"] },
      { text: "The first pig made a house of straw.", words: ["first", "straw"] },
      { text: "The second pig made a house of sticks.", words: ["second", "sticks"] },
      { text: "The third pig made a house of bricks.", words: ["third", "bricks"] },
      { text: "A big bad wolf came along.", words: ["big", "bad", "wolf"] },
      { text: "I'll huff and I'll puff!", words: ["huff", "puff"] },
      { text: "He blew the straw house down.", words: ["blew", "straw"] },
      { text: "He blew the stick house down.", words: ["blew", "sticks"] },
      { text: "The two pigs ran to the brick house.", words: ["ran", "brick"] },
      { text: "The wolf huffed and puffed.", words: ["huffed", "puffed"] },
      { text: "The brick house did not fall.", words: ["brick", "fall"] },
      { text: "The three pigs were safe inside!", words: ["safe", "inside"] }
    ],
    practiceWords: ["pig", "wolf", "straw", "bricks", "blow"],
    phonicsFocus: ["igh", "oo", "ow"],
    comprehensionQuestion: "Which house did not fall down?",
    moral: "Work hard and do things properly."
  },

  // ── 7. Goldilocks and the Three Bears ─────────────────────────────────────
  {
    id: "three-bears",
    title: "Goldilocks and the Three Bears",
    level: "Year 1 read aloud",
    duration: "~4 min",
    emoji: "🐻",
    sourceTextUrl: "https://www.gutenberg.org/files/15661/15661-h/15661-h.htm",
    sourceAudioUrl: "https://librivox.org/the-golden-goose-book-by-l-leslie-brooke/",
    audioFile: "assets/audio/three-bears.mp3",
    // REPLACE: Golden Goose Book — "The Three Bears"
    pages: [
      { text: "Three bears lived in the woods.", words: ["three", "bears", "woods"] },
      { text: "One morning they went for a walk.", words: ["morning", "walk"] },
      { text: "A girl called Goldilocks came by.", words: ["girl", "Goldilocks"] },
      { text: "She went inside the bears' house.", words: ["inside", "house"] },
      { text: "She tried all three bowls of porridge.", words: ["tried", "porridge"] },
      { text: "Baby Bear's porridge was just right!", words: ["baby", "just", "right"] },
      { text: "She sat in the chairs. Baby Bear's broke!", words: ["chairs", "broke"] },
      { text: "She went upstairs and found the beds.", words: ["upstairs", "beds"] },
      { text: "She fell asleep in Baby Bear's bed.", words: ["asleep", "bed"] },
      { text: "The three bears came home.", words: ["bears", "home"] },
      { text: "Someone has been in my bed! said Baby Bear.", words: ["someone", "bed"] },
      { text: "Goldilocks woke up and ran away fast!", words: ["woke", "ran"] }
    ],
    practiceWords: ["bear", "porridge", "chair", "bed", "woods"],
    phonicsFocus: ["ai", "ee", "oo"],
    comprehensionQuestion: "What did Goldilocks eat?",
    moral: "Don't take things that aren't yours."
  },

  // ── 8. Little Red Riding Hood ──────────────────────────────────────────────
  {
    id: "little-red-riding-hood",
    title: "Little Red Riding Hood",
    level: "Year 1 read aloud",
    duration: "~4 min",
    emoji: "🧺",
    sourceTextUrl: "https://www.gutenberg.org/files/11592/11592-h/11592-h.htm",
    sourceAudioUrl: "https://librivox.org/childrens-hour-with-red-riding-hood-and-other-stories-by-watty-piper/",
    audioFile: "assets/audio/little-red-riding-hood.mp3",
    // REPLACE: Children's Hour with Red Riding Hood — simplified text
    pages: [
      { text: "A little girl wore a red hood.", words: ["girl", "red", "hood"] },
      { text: "Her grandma was not feeling well.", words: ["grandma", "well"] },
      { text: "She walked through the dark forest.", words: ["walked", "forest"] },
      { text: "She had a basket of food.", words: ["basket", "food"] },
      { text: "A wolf saw her on the path.", words: ["wolf", "saw", "path"] },
      { text: "Where are you going? he asked.", words: ["going", "asked"] },
      { text: "To my grandma's house, she said.", words: ["grandma", "house"] },
      { text: "The wolf ran to Grandma's house first.", words: ["ran", "first"] },
      { text: "Little Red Riding Hood knocked on the door.", words: ["knocked", "door"] },
      { text: "What big eyes you have, Grandma!", words: ["big", "eyes"] },
      { text: "What big teeth you have, Grandma!", words: ["big", "teeth"] },
      { text: "A hunter heard her and came to help.", words: ["hunter", "help"] }
    ],
    practiceWords: ["red", "hood", "wolf", "grandma", "forest"],
    phonicsFocus: ["oo", "ai", "or"],
    comprehensionQuestion: "Who came to help Little Red Riding Hood?",
    moral: "Stay on the path and be careful with strangers."
  },

  // ── 9. The Gingerbread Man ─────────────────────────────────────────────────
  {
    id: "gingerbread-man",
    title: "The Gingerbread Man",
    level: "Year 1 read aloud",
    duration: "~3 min",
    emoji: "🫚",
    sourceTextUrl: "https://www.gutenberg.org/files/16693/16693-h/16693-h.htm",
    sourceAudioUrl: "https://librivox.org/librivox-short-story-collection-vol-020/",
    audioFile: "assets/audio/gingerbread-man.mp3",
    // REPLACE: The Gingerbread Man — public domain text
    pages: [
      { text: "An old woman baked a gingerbread man.", words: ["old", "baked", "gingerbread"] },
      { text: "He jumped out of the oven!", words: ["jumped", "oven"] },
      { text: "Run, run! You can't catch me!", words: ["run", "catch"] },
      { text: "He ran past the old man.", words: ["ran", "past"] },
      { text: "Stop! called the old man.", words: ["stop", "called"] },
      { text: "He ran past the cow.", words: ["ran", "cow"] },
      { text: "He ran past the horse.", words: ["ran", "horse"] },
      { text: "He ran past the children.", words: ["ran", "children"] },
      { text: "He came to a wide river.", words: ["came", "river"] },
      { text: "Jump on my back, said a fox.", words: ["jump", "fox"] },
      { text: "The fox swam into the river.", words: ["fox", "swam"] },
      { text: "Snap! The fox ate him all up.", words: ["snap", "ate"] }
    ],
    practiceWords: ["gingerbread", "run", "catch", "fox", "river"],
    phonicsFocus: ["ai", "ee", "er"],
    comprehensionQuestion: "Who ate the gingerbread man?",
    moral: "Don't be too boastful — there is always someone cleverer."
  },

  // ── 10. The Ugly Duckling ──────────────────────────────────────────────────
  {
    id: "ugly-duckling",
    title: "The Ugly Duckling",
    level: "Year 1 assisted",
    duration: "~4 min",
    emoji: "🦢",
    sourceTextUrl: "https://www.gutenberg.org/files/27200/27200-h/27200-h.htm",
    sourceAudioUrl: "https://librivox.org/hans-christian-andersen-fairy-tale-collection-by-hans-christian-andersen/",
    audioFile: "assets/audio/ugly-duckling.mp3",
    // REPLACE: Hans Christian Andersen — "The Ugly Duckling"
    pages: [
      { text: "A mother duck sat on her eggs.", words: ["mother", "duck", "eggs"] },
      { text: "One egg was very big and grey.", words: ["big", "grey", "egg"] },
      { text: "Out came a big grey duckling.", words: ["big", "grey", "duckling"] },
      { text: "He looked different from the others.", words: ["looked", "different"] },
      { text: "The other animals were not kind to him.", words: ["animals", "kind"] },
      { text: "He ran away into the cold.", words: ["ran", "cold"] },
      { text: "Winter came. He was sad and alone.", words: ["winter", "sad", "alone"] },
      { text: "At last, spring came.", words: ["spring", "came"] },
      { text: "He saw beautiful white birds on a pond.", words: ["beautiful", "birds"] },
      { text: "He looked at himself in the water.", words: ["looked", "water"] },
      { text: "He was a beautiful white swan!", words: ["beautiful", "swan"] },
      { text: "The other swans welcomed him warmly.", words: ["swans", "welcomed"] }
    ],
    practiceWords: ["duck", "egg", "ugly", "swan", "beautiful"],
    phonicsFocus: ["ee", "igh", "oo"],
    comprehensionQuestion: "What did the ugly duckling become?",
    moral: "Everyone has something special inside."
  }

];

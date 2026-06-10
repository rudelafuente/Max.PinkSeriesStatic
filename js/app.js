// Pink Series — main app

var App = (function() {

  // ── Utilities ──────────────────────────────────────────────────────────────

  function shuffleArray(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  function getChoices(correct, allWords, n) {
    var pool = allWords.filter(function(w) { return w.word !== correct.word; });
    var distractors = shuffleArray(pool).slice(0, n - 1);
    return shuffleArray([correct].concat(distractors));
  }

  function getActiveWords() {
    var active = getSettings().activeSeries || "pink";
    return WORDS.filter(function(w) {
      return (w.series || "pink") === active && !w.support;
    });
  }

  function randomActiveWord(excludeWord) {
    var pool = getActiveWords();
    if (excludeWord) pool = pool.filter(function(w) { return w.word !== excludeWord; });
    if (!pool.length) pool = getActiveWords();
    return pool[Math.floor(Math.random() * pool.length)];
  }

  function getActiveFamilies() {
    var seen = {};
    var result = [];
    getActiveWords().forEach(function(w) {
      if (!seen[w.family]) { seen[w.family] = true; result.push(w.family); }
    });
    return result;
  }

  var SERIES_META = {
    pink:  { label: "Pink",  icon: "🌸", color: "series-pink" },
    blue:  { label: "Blue",  icon: "🔵", color: "series-blue" },
    green: { label: "Green", icon: "🟢", color: "series-green" }
  };
  var SERIES_ART = {
    pink: "assets/series/pink-series-cartoon-bw.png",
    blue: "assets/series/blue-series-cartoon-bw.png",
    green: "assets/series/green-series-cartoon-bw.png"
  };
  var PINK_SPRITE_SHEET = "assets/words/pink-series-sprite-bw.png";
  var PINK_SPRITE_COLS = 10;
  var PINK_SPRITE_ROWS = 9;
  var PINK_SPRITE_WORDS = [
    "cat","mat","sat","hat","rat","man","pan","can","fan","pin",
    "tin","bin","fin","dog","log","fog","sun","run","fun","pen",
    "ten","hen","mug","bug","rug","top","mop","pop","bag","tag",
    "rag","nag","wag","cap","map","nap","tap","bed","red","fed",
    "led","wed","jet","net","pet","wet","big","dig","fig","jig",
    "pig","wig","dip","lip","sip","zip","fit","hit","kit","sit",
    "cot","dot","hot","pot","cub","sub","tub","cut","hut","nut",
    "ham","jam","ram","yam","bad","dad","mad","sad","job","cob",
    "sob","gum","hum","mum","sum","yum"
  ];
  var PINK_SPRITE_INDEX = {};
  PINK_SPRITE_WORDS.forEach(function(word, index) {
    PINK_SPRITE_INDEX[word] = index;
  });

  function wordSeries(word) { return word.series || "pink"; }

  function findWordEntry(wordText) {
    var target = String(wordText || "").toLowerCase();
    for (var i = 0; i < WORDS.length; i++) {
      if (WORDS[i].word === target) return WORDS[i];
    }
    return null;
  }

  function getWordVisual(wordRef) {
    var entry = typeof wordRef === "string" ? findWordEntry(wordRef) : wordRef;
    var wordText = entry && entry.word ? entry.word : wordRef;
    var word = String(wordText || "").toLowerCase();
    if (Object.prototype.hasOwnProperty.call(PINK_SPRITE_INDEX, word)) {
      return {
        type: "sprite",
        sheet: PINK_SPRITE_SHEET,
        cols: PINK_SPRITE_COLS,
        rows: PINK_SPRITE_ROWS,
        index: PINK_SPRITE_INDEX[word]
      };
    }
    if (entry && entry.image) return { type: "image", src: entry.image };
    if (entry && entry.emoji) return { type: "emoji", text: entry.emoji };
    return null;
  }

  function getStoryVisual(story) {
    if (story && story.image) return { type: "image", src: story.image };
    if (story && story.emoji) return { type: "emoji", text: story.emoji };
    return null;
  }

  function getSpriteStyle(sprite) {
    var col = sprite.index % sprite.cols;
    var row = Math.floor(sprite.index / sprite.cols);
    var x = sprite.cols > 1 ? (col / (sprite.cols - 1)) * 100 : 0;
    var y = sprite.rows > 1 ? (row / (sprite.rows - 1)) * 100 : 0;
    return [
      "background-image:url('" + sprite.sheet + "')",
      "background-size:" + (sprite.cols * 100) + "% " + (sprite.rows * 100) + "%",
      "background-position:" + x + "% " + y + "%",
      "background-repeat:no-repeat"
    ].join(";");
  }

  function createVisualNode(visual, className, altText) {
    if (!visual) return null;
    if (visual.type === "image" && visual.src) {
      return el("img", {
        class: className + " visual-image",
        src: visual.src,
        alt: altText || ""
      });
    }
    if (visual.type === "sprite") {
      return el("span", {
        class: className + " visual-sprite",
        style: getSpriteStyle(visual),
        role: "img",
        "aria-label": altText || ""
      });
    }
    if (visual.type === "emoji" && visual.text) {
      return el("span", { class: className, text: visual.text });
    }
    return null;
  }

  function $(selector) { return document.querySelector(selector); }

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function(k) {
        if (k === "class") node.className = attrs[k];
        else if (k === "style") node.style.cssText = attrs[k];
        else if (k === "html") node.innerHTML = attrs[k];
        else if (k === "text") node.textContent = attrs[k];
        else node.setAttribute(k, attrs[k]);
      });
    }
    if (children) {
      children.forEach(function(c) {
        if (typeof c === "string") node.appendChild(document.createTextNode(c));
        else if (c) node.appendChild(c);
      });
    }
    return node;
  }

  function createWordReveal(wordText, textClass, revealClass) {
    var wordEntry = findWordEntry(wordText);
    var wrap = el("div", { class: "word-reveal-wrap" });
    var trigger = el("button", {
      class: textClass + (wordEntry && wordEntry.emoji ? " word-reveal-trigger" : ""),
      type: "button",
      text: wordText
    });

    wrap.appendChild(trigger);

    var revealVisual = createVisualNode(
      getWordVisual(wordEntry || wordText),
      revealClass,
      wordText + " illustration"
    );

    if (revealVisual) {
      var hint = el("div", { class: "word-reveal-hint", text: "Tap to see drawing" });
      var reveal = el("div", { class: "word-reveal-art-wrap" });
      reveal.appendChild(revealVisual);
      trigger.setAttribute("aria-expanded", "false");
      reveal.hidden = true;

      trigger.addEventListener("click", function() {
        var isHidden = reveal.hidden;
        reveal.hidden = !isHidden;
        trigger.setAttribute("aria-expanded", isHidden ? "true" : "false");
        hint.textContent = isHidden ? "Tap again to hide" : "Tap to see drawing";
      });

      wrap.appendChild(hint);
      wrap.appendChild(reveal);
    }

    return wrap;
  }

  // ── Toast ──────────────────────────────────────────────────────────────────

  var toastTimer = null;

  function showToast(msg, positive) {
    var toast = $("#toast");
    if (!toast) return;
    if (toastTimer) clearTimeout(toastTimer);
    toast.textContent = msg;
    toast.className = "toast " + (positive ? "toast-good" : "toast-soft") + " toast-show";
    toastTimer = setTimeout(function() {
      toast.className = "toast";
    }, 2200);
  }

  // ── Header back button ─────────────────────────────────────────────────────

  function setBackButton(show, label) {
    var btn = $("#back-btn");
    if (!btn) return;
    if (show) {
      btn.textContent = label || "← Home";
      btn.style.display = "inline-block";
    } else {
      btn.style.display = "none";
    }
  }

  function setHeaderTitle(title) {
    var h = $("#header-title");
    if (h) h.textContent = title;
  }

  // ── Router ─────────────────────────────────────────────────────────────────

  function navigate(view, params) {
    var app = $("#app");
    if (!app) return;
    app.innerHTML = "";

    var views = {
      home:      renderHome,
      blend:     renderBlend,
      listen:    renderListen,
      sentences: renderSentences,
      families:  renderFamilies,
      calendar:  renderCalendar,
      settings:  renderSettings,
      stories:   renderStories,
      story:     renderStory
    };

    if (views[view]) {
      views[view](params || {});
    }
  }

  // ── Home ───────────────────────────────────────────────────────────────────

  function renderHome() {
    setBackButton(false);
    setHeaderTitle("Pink Series");

    var today = getTodayProgress();
    var settings = getSettings();
    var correct = today.correctWords.length;
    var target = settings.dailyTarget;
    var completed = today.completed;

    var statusText = completed
      ? "Today: completed ✓"
      : "Today: " + correct + " / " + target + " words";

    var app = $("#app");

    var statusBar = el("div", { class: "status-bar " + (completed ? "status-done" : "") },
      [el("span", { text: statusText })]);

    var grid = el("div", { class: "home-grid" });

    var buttons = [
      { label: "Blend the Word",     icon: "🔤", view: "blend" },
      { label: "Listen & Choose",    icon: "👂", view: "listen" },
      { label: "Read Sentences",     icon: "📝", view: "sentences" },
      { label: "Word Families",      icon: "📚", view: "families" },
      { label: "Stories",            icon: "📖", view: "stories" },
      { label: "Practice Calendar",  icon: "📅", view: "calendar" },
      { label: "Parent Settings",    icon: "⚙️",  view: "settings" }
    ];

    buttons.forEach(function(b) {
      var card = el("button", { class: "home-card" });
      card.innerHTML = "<span class='home-icon'>" + b.icon + "</span><span class='home-label'>" + b.label + "</span>";
      card.addEventListener("click", function() { navigate(b.view); });
      grid.appendChild(card);
    });

    // Series badges
    var settings = getSettings();
    var active = settings.activeSeries || "pink";
    var badgeRow = el("div", { class: "series-badges" });
    ["pink", "blue", "green"].forEach(function(key) {
      var meta = SERIES_META[key];
      var isActive = key === active;
      var badge = el("span", {
        class: "series-badge " + meta.color + (isActive ? " series-active" : " series-other"),
        html: meta.icon + " " + meta.label
      });
      badgeRow.appendChild(badge);
    });

    var activeMeta = SERIES_META[active] || SERIES_META.pink;
    var seriesPreview = el("section", { class: "series-preview-card " + activeMeta.color });
    seriesPreview.appendChild(el("img", {
      class: "series-preview-image",
      src: SERIES_ART[active],
      alt: activeMeta.label + " Series artwork"
    }));
    seriesPreview.appendChild(el("div", { class: "series-preview-title", text: activeMeta.label + " Series" }));
    seriesPreview.appendChild(el("div", {
      class: "series-preview-copy",
      text: "Artwork and word bank for the active phonics series."
    }));

    app.appendChild(statusBar);
    app.appendChild(badgeRow);
    app.appendChild(seriesPreview);
    app.appendChild(grid);
  }

  // ── Blend the Word ─────────────────────────────────────────────────────────

  function renderBlend(params) {
    setBackButton(true, "← Home");
    setHeaderTitle("Blend the Word");

    var settings = getSettings();
    var activeWords = getActiveWords();
    var pool = params.family
      ? activeWords.filter(function(w) { return w.family === params.family; })
      : activeWords;
    if (!pool.length) pool = activeWords;
    var currentWord = pool[Math.floor(Math.random() * pool.length)];
    var answered = false;

    function render() {
      var app = $("#app");
      app.innerHTML = "";
      answered = false;

      var wordDisplay = createWordReveal(currentWord.word, "word-display", "word-emoji");

      // Phoneme buttons
      var phonemeRow = el("div", { class: "phoneme-row" });
      currentWord.phonemes.forEach(function(ph) {
        var btn = el("button", { class: "phoneme-btn", text: "/" + ph + "/" });
        btn.addEventListener("click", function() { playPhoneme(ph); });
        phonemeRow.appendChild(btn);
      });

      // Play all button
      var playBtn = el("button", { class: "btn btn-primary", text: "▶  Play sounds" });
      playBtn.addEventListener("click", function() {
        var delay = settings.phonemeDelay;
        playWordPhonemes(currentWord, delay);
      });

      // Feedback row
      var feedbackRow = el("div", { class: "feedback-row" });

      var gotItBtn = el("button", { class: "btn btn-success", text: "I got it right ✓" });
      gotItBtn.addEventListener("click", function() {
        if (answered) return;
        answered = true;
        var day = recordAttempt(currentWord.word, true);
        if (day.completed && day.correctWords.length === getSettings().dailyTarget) {
          showToast("Completed for today!", true);
        } else {
          showToast("Good blending!", true);
        }
        setTimeout(function() {
          currentWord = randomActiveWord(currentWord.word);
          render();
        }, 800);
      });

      var moreBtn = el("button", { class: "btn btn-soft", text: "One more try" });
      moreBtn.addEventListener("click", function() {
        if (answered) return;
        answered = true;
        recordAttempt(currentWord.word, false);
        showToast("Listen again", false);
        var delay = settings.phonemeDelay;
        playWordPhonemes(currentWord, delay).then(function() {
          answered = false;
        });
      });

      feedbackRow.appendChild(gotItBtn);
      feedbackRow.appendChild(moreBtn);

      // Next word
      var nextBtn = el("button", { class: "btn btn-neutral", text: "Next word →" });
      nextBtn.addEventListener("click", function() {
        currentWord = randomActiveWord(currentWord.word);
        render();
      });

      // Today's progress
      var day = getTodayProgress();
      var prog = el("div", { class: "progress-note",
        text: "Today: " + day.correctWords.length + " / " + getSettings().dailyTarget + " words correct" });

      app.appendChild(wordDisplay);
      app.appendChild(phonemeRow);
      app.appendChild(playBtn);
      app.appendChild(feedbackRow);
      app.appendChild(nextBtn);
      app.appendChild(prog);
    }

    render();
  }

  // ── Listen & Choose ────────────────────────────────────────────────────────

  function renderListen(params) {
    setBackButton(true, "← Home");
    setHeaderTitle("Listen & Choose");

    var settings = getSettings();
    var answered = false;
    var currentWord = null;
    var choices = [];

    function nextRound() {
      answered = false;
      currentWord = randomActiveWord(currentWord ? currentWord.word : null);
      choices = getChoices(currentWord, getActiveWords(), settings.numChoices);
      render();
    }

    function render() {
      var app = $("#app");
      app.innerHTML = "";

      // Instruction
      var instr = el("p", { class: "listen-instruction", text: "Listen to the sounds, then choose the word." });

      // Play button
      var playBtn = el("button", { class: "btn btn-primary btn-play-big", text: "▶  Play sounds" });
      playBtn.addEventListener("click", function() {
        playWordPhonemes(currentWord, settings.phonemeDelay);
      });

      // Optional word hint
      if (settings.showWordInListen) {
        var hint = createWordReveal(currentWord.word, "word-hint", "word-emoji");
        app.appendChild(instr);
        app.appendChild(playBtn);
        app.appendChild(hint);
      } else {
        app.appendChild(instr);
        app.appendChild(playBtn);
      }

      // Choices grid
      var grid = el("div", { class: "choices-grid" });
      choices.forEach(function(choice) {
        var card = el("button", { class: "choice-card" });
        var choiceVisual = createVisualNode(getWordVisual(choice), "choice-emoji", choice.word + " illustration");
        if (choiceVisual) card.appendChild(choiceVisual);
        var wordSpan = el("span", { class: "choice-word", text: choice.word });
        var phonSpan = el("span", { class: "choice-phonemes",
          text: choice.phonemes.map(function(p) { return "/" + p + "/"; }).join(" ") });
        card.appendChild(wordSpan);
        card.appendChild(phonSpan);

        card.addEventListener("click", function() {
          if (answered) return;
          answered = true;

          var isCorrect = choice.word === currentWord.word;
          card.classList.add(isCorrect ? "choice-correct" : "choice-wrong");

          if (isCorrect) {
            var day = recordAttempt(currentWord.word, true);
            if (day.completed && day.correctWords.length === getSettings().dailyTarget) {
              showToast("Completed for today!", true);
            } else {
              showToast("Great listening!", true);
            }
          } else {
            recordAttempt(currentWord.word, false);
            // Highlight the correct one
            var allCards = grid.querySelectorAll(".choice-card");
            allCards.forEach(function(c) {
              if (c !== card) c.classList.add("choice-reveal");
            });
            showToast("Try again", false);
          }

          // Show next button
          var nextBtn = el("button", { class: "btn btn-primary", text: "Next word →" });
          nextBtn.addEventListener("click", function() { nextRound(); });

          var listenAgainBtn = el("button", { class: "btn btn-soft", text: "Listen again" });
          listenAgainBtn.addEventListener("click", function() {
            playWordPhonemes(currentWord, settings.phonemeDelay);
          });

          var actRow = el("div", { class: "listen-actions" });
          actRow.appendChild(listenAgainBtn);
          actRow.appendChild(nextBtn);
          app.appendChild(actRow);
        });

        grid.appendChild(card);
      });

      app.appendChild(grid);

      // Progress note
      var day = getTodayProgress();
      var prog = el("div", { class: "progress-note",
        text: "Today: " + day.correctWords.length + " / " + getSettings().dailyTarget + " words correct" });
      app.appendChild(prog);
    }

    nextRound();

    // Auto-play on first load after a short delay (requires user gesture via click on Play)
    // We do NOT autoplay — user must press Play
  }

  // ── Word Families ──────────────────────────────────────────────────────────

  function renderSentences() {
    setBackButton(true, "â† Home");
    setHeaderTitle("Read Sentences");

    var app = $("#app");
    var settings = getSettings();
    var sentenceIndex = Math.floor(Math.random() * PINK_SENTENCES.length);
    var isPlayingSentence = false;

    function getSentenceWords(sentence) {
      return sentence.words
        .map(findWordEntry)
        .filter(function(item) { return !!item; });
    }

    function render() {
      var sentence = PINK_SENTENCES[sentenceIndex];
      var wordItems = getSentenceWords(sentence);
      app.innerHTML = "";

      var intro = el("p", {
        class: "section-intro",
        text: "Read the sentence. Tap a word to hear it, then read the whole sentence again."
      });
      var note = el("div", {
        class: "sentence-note",
        text: "Short Year 1 sentences using decodable Pink Series words plus common support words such as the, a, and, is and on."
      });
      var sentenceCard = el("div", { class: "sentence-card" });
      sentenceCard.appendChild(el("div", { class: "sentence-text", text: sentence.text }));

      var wordRow = el("div", { class: "sentence-word-row" });
      var wordButtons = [];
      sentence.words.forEach(function(word) {
        var item = findWordEntry(word);
        var btn = el("button", {
          class: "sentence-word-btn",
          type: "button",
          text: word
        });
        if (!item) btn.disabled = true;
        btn.addEventListener("click", function() {
          if (!item || isPlayingSentence) return;
          btn.classList.add("sentence-word-active");
          playWordPhonemes(item, settings.phonemeDelay).then(function() {
            btn.classList.remove("sentence-word-active");
          });
        });
        wordButtons.push(btn);
        wordRow.appendChild(btn);
      });

      var playSentenceBtn = el("button", { class: "btn btn-primary", text: "â–¶  Play sentence sounds" });
      var nextBtn = el("button", { class: "btn btn-soft", text: "New sentence" });

      playSentenceBtn.addEventListener("click", function() {
        if (isPlayingSentence || !wordItems.length) return;
        isPlayingSentence = true;
        playSentenceBtn.disabled = true;
        nextBtn.disabled = true;
        wordButtons.forEach(function(btn) { btn.disabled = true; });

        (async function() {
          for (var i = 0; i < wordItems.length; i++) {
            var activeBtn = wordButtons[i];
            if (activeBtn) activeBtn.classList.add("sentence-word-active");
            await playWordPhonemes(wordItems[i], settings.phonemeDelay);
            if (activeBtn) activeBtn.classList.remove("sentence-word-active");
            if (i < wordItems.length - 1) await wait(450);
          }
        })().finally(function() {
          isPlayingSentence = false;
          playSentenceBtn.disabled = false;
          nextBtn.disabled = false;
          wordButtons.forEach(function(btn, index) {
            btn.disabled = !findWordEntry(sentence.words[index]) ? true : false;
          });
        });
      });

      nextBtn.addEventListener("click", function() {
        sentenceIndex = (sentenceIndex + 1 + Math.floor(Math.random() * (PINK_SENTENCES.length - 1))) % PINK_SENTENCES.length;
        render();
      });

      var actionRow = el("div", { class: "sentence-actions" });
      actionRow.appendChild(playSentenceBtn);
      actionRow.appendChild(nextBtn);

      var phonicsRow = el("div", { class: "sentence-phonics" });
      wordItems.forEach(function(item) {
        phonicsRow.appendChild(el("span", {
          class: "sentence-phonics-pill",
          text: item.support
            ? item.word + ": support word"
            : item.word + ": " + item.phonemes.map(function(p) { return "/" + p + "/"; }).join(" ")
        }));
      });

      app.appendChild(intro);
      app.appendChild(note);
      app.appendChild(sentenceCard);
      app.appendChild(wordRow);
      app.appendChild(actionRow);
      app.appendChild(phonicsRow);
    }

    render();
  }

  function renderFamilies(params) {
    setBackButton(true, "← Home");
    setHeaderTitle("Word Families");

    var settings = getSettings();

    if (params && params.family) {
      renderFamilyWords(params.family);
      return;
    }

    var app = $("#app");
    app.innerHTML = "";

    var intro = el("p", { class: "section-intro", text: "Choose a word family to practice." });
    app.appendChild(intro);

    var grid = el("div", { class: "family-grid" });

    getActiveFamilies().forEach(function(family) {
      var words = getActiveWords().filter(function(w) { return w.family === family; });
      var series = wordSeries(words[0]);
      var meta = SERIES_META[series] || SERIES_META.pink;
      var card = el("button", { class: "family-card" });
      var dot = el("span", { class: "family-series-dot " + meta.color, text: meta.icon });
      var label = el("span", { class: "family-label", text: "-" + family });
      var count = el("span", { class: "family-count", text: words.length + " words" });
      card.appendChild(dot);
      card.appendChild(label);
      card.appendChild(count);
      card.addEventListener("click", function() {
        navigate("families", { family: family });
      });
      grid.appendChild(card);
    });

    app.appendChild(grid);
  }

  function renderFamilyWords(family) {
    setHeaderTitle("Family: -" + family);

    var settings = getSettings();
    var words = getWordsByFamily(family);
    var currentIndex = 0;
    var answered = false;

    function renderWord() {
      var app = $("#app");
      app.innerHTML = "";
      answered = false;

      var wordItem = words[currentIndex];

      // Back to families
      var backFam = el("button", { class: "btn btn-neutral btn-small", text: "← All families" });
      backFam.addEventListener("click", function() { navigate("families"); });
      app.appendChild(backFam);

      var wordDisplay = createWordReveal(wordItem.word, "word-display", "word-emoji");

      var phonemeRow = el("div", { class: "phoneme-row" });
      wordItem.phonemes.forEach(function(ph) {
        var btn = el("button", { class: "phoneme-btn", text: "/" + ph + "/" });
        btn.addEventListener("click", function() { playPhoneme(ph); });
        phonemeRow.appendChild(btn);
      });

      var playBtn = el("button", { class: "btn btn-primary", text: "▶  Play sounds" });
      playBtn.addEventListener("click", function() {
        playWordPhonemes(wordItem, settings.phonemeDelay);
      });

      var feedbackRow = el("div", { class: "feedback-row" });

      var gotItBtn = el("button", { class: "btn btn-success", text: "I got it right ✓" });
      gotItBtn.addEventListener("click", function() {
        if (answered) return;
        answered = true;
        recordAttempt(wordItem.word, true);
        showToast("Good blending!", true);
        setTimeout(function() {
          currentIndex = (currentIndex + 1) % words.length;
          renderWord();
        }, 700);
      });

      var nextBtn = el("button", { class: "btn btn-neutral", text: "Next →" });
      nextBtn.addEventListener("click", function() {
        currentIndex = (currentIndex + 1) % words.length;
        renderWord();
      });

      feedbackRow.appendChild(gotItBtn);
      feedbackRow.appendChild(nextBtn);

      var counter = el("div", { class: "family-counter",
        text: (currentIndex + 1) + " / " + words.length });

      app.appendChild(wordDisplay);
      app.appendChild(phonemeRow);
      app.appendChild(playBtn);
      app.appendChild(feedbackRow);
      app.appendChild(counter);
    }

    renderWord();
  }

  // ── Practice Calendar ──────────────────────────────────────────────────────

  function renderCalendar() {
    setBackButton(true, "← Home");
    setHeaderTitle("Practice Calendar");

    var now = new Date();
    var currentYear = now.getFullYear();
    var currentMonth = now.getMonth() + 1; // 1-indexed

    function render() {
      var app = $("#app");
      app.innerHTML = "";

      var todayKey = getTodayKey();
      var settings = getSettings();
      var monthData = getMonthProgress(currentYear, currentMonth);
      var storyMonthData = getMonthStoryProgress(currentYear, currentMonth);

      var monthNames = ["January","February","March","April","May","June",
                        "July","August","September","October","November","December"];

      // Month nav
      var nav = el("div", { class: "cal-nav" });
      var prevBtn = el("button", { class: "btn btn-neutral btn-small", text: "←" });
      prevBtn.addEventListener("click", function() {
        currentMonth--;
        if (currentMonth < 1) { currentMonth = 12; currentYear--; }
        render();
      });
      var nextBtn = el("button", { class: "btn btn-neutral btn-small", text: "→" });
      nextBtn.addEventListener("click", function() {
        currentMonth++;
        if (currentMonth > 12) { currentMonth = 1; currentYear++; }
        render();
      });
      var monthLabel = el("span", { class: "cal-month-label",
        text: monthNames[currentMonth - 1] + " " + currentYear });
      nav.appendChild(prevBtn);
      nav.appendChild(monthLabel);
      nav.appendChild(nextBtn);
      app.appendChild(nav);

      // Day headers
      var grid = el("div", { class: "calendar" });
      ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].forEach(function(d) {
        grid.appendChild(el("div", { class: "cal-header", text: d }));
      });

      // First day offset
      var firstDay = new Date(currentYear, currentMonth - 1, 1).getDay();
      var daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

      for (var i = 0; i < firstDay; i++) {
        grid.appendChild(el("div", { class: "cal-empty" }));
      }

      for (var day = 1; day <= daysInMonth; day++) {
        var dateKey = currentYear + "-"
          + String(currentMonth).padStart(2, "0") + "-"
          + String(day).padStart(2, "0");

        var dayData = monthData[dateKey];
        var isToday = dateKey === todayKey;
        var completed = dayData && dayData.correctWords.length >= settings.dailyTarget;
        var partial = dayData && dayData.attempts > 0 && !completed;

        var classes = "cal-day";
        if (isToday) classes += " cal-today";
        if (completed) classes += " cal-completed";
        else if (partial) classes += " cal-partial";

        var cell = el("div", { class: classes });
        var dayNum = el("span", { class: "cal-day-num", text: String(day) });
        cell.appendChild(dayNum);

        if (completed) {
          cell.appendChild(el("span", { class: "cal-check", text: "✓" }));
        } else if (partial) {
          cell.appendChild(el("span", { class: "cal-dot", text: "·" }));
        }

        if (storyMonthData[dateKey] && storyMonthData[dateKey].attempts > 0) {
          cell.appendChild(el("span", { class: "cal-story", text: "📖" }));
        }

        grid.appendChild(cell);
      }

      app.appendChild(grid);

      // Today's stats
      var todayData = getTodayProgress();
      var correct = todayData.correctWords.length;
      var target = settings.dailyTarget;
      var attempts = todayData.attempts;
      var status = todayData.completed ? "Completed ✓" : "Not completed yet";

      var statsBox = el("div", { class: "cal-stats " + (todayData.completed ? "stats-done" : "") });
      statsBox.innerHTML =
        "<strong>Today</strong><br>" +
        "Correct words: " + correct + " / " + target + "<br>" +
        "Attempts: " + attempts + "<br>" +
        "Status: " + status;
      app.appendChild(statsBox);
    }

    render();
  }

  // ── Stories list ──────────────────────────────────────────────────────────

  function renderStories() {
    setBackButton(true, "← Home");
    setHeaderTitle("Stories");

    var app = $("#app");
    app.innerHTML = "";

    var todayStory = getTodayStoryProgress();

    var intro = el("p", { class: "section-intro", text: "Choose a story to read and practise." });
    app.appendChild(intro);

    var grid = el("div", { class: "story-grid" });

    stories.forEach(function(story) {
      var card = el("button", { class: "story-card" });

      var storyCardVisual = createVisualNode(getStoryVisual(story), "story-card-emoji", story.title + " cover");
      if (storyCardVisual) card.appendChild(storyCardVisual);
      card.appendChild(el("span", { class: "story-card-title", text: story.title }));
      card.appendChild(el("span", { class: "story-card-meta", text: story.level + " · " + story.duration }));

      if (todayStory.storyId === story.id && todayStory.attempts > 0) {
        var badge = todayStory.completed
          ? el("span", { class: "story-done-badge", text: "Done today ✓" })
          : el("span", { class: "story-done-badge", text: todayStory.correctWords.length + "/3 today" });
        card.appendChild(badge);
      }

      card.addEventListener("click", function() {
        navigate("story", { id: story.id, mode: "read", page: 0 });
      });

      grid.appendChild(card);
    });

    app.appendChild(grid);
  }

  // ── Story reader ───────────────────────────────────────────────────────────

  function renderStory(params) {
    var storyId = params.id;
    var mode = params.mode || "read";
    var pageIdx = params.page || 0;

    var story = null;
    for (var i = 0; i < stories.length; i++) {
      if (stories[i].id === storyId) { story = stories[i]; break; }
    }
    if (!story) { navigate("stories"); return; }

    setBackButton(true, "← Stories");
    var backBtn = $("#back-btn");
    if (backBtn) {
      backBtn.onclick = null;
      backBtn.addEventListener("click", function() { navigate("stories"); });
    }
    setHeaderTitle(story.title);

    var app = $("#app");
    app.innerHTML = "";

    // Title + emoji
    var titleDisplay = el("div", { class: "story-title-display" });
    var storyTitleVisual = createVisualNode(getStoryVisual(story), "story-title-visual", story.title + " cover");
    if (storyTitleVisual) titleDisplay.appendChild(storyTitleVisual);
    titleDisplay.appendChild(el("span", { class: "story-title-text", text: story.title }));
    app.appendChild(titleDisplay);

    // Mode tabs
    var tabs = el("div", { class: "mode-tabs" });
    ["read","listen","practice"].forEach(function(m) {
      var label = m === "read" ? "📖 Read" : m === "listen" ? "🔊 Listen" : "✏️ Practise";
      var tab = el("button", {
        class: "mode-tab" + (mode === m ? " mode-tab-active" : "")
      });
      tab.textContent = label;
      tab.addEventListener("click", function() {
        navigate("story", { id: storyId, mode: m, page: 0 });
      });
      tabs.appendChild(tab);
    });
    app.appendChild(tabs);

    // ── Read mode ────────────────────────────────────────────────────────────
    if (mode === "read") {
      var page = story.pages[pageIdx];

      var pageBox = el("div", { class: "story-page", text: page.text });
      app.appendChild(pageBox);

      var nav = el("div", { class: "story-nav" });
      var prevBtn = el("button", { class: "btn btn-neutral", text: "← Prev" });
      prevBtn.disabled = pageIdx === 0;
      prevBtn.addEventListener("click", function() {
        navigate("story", { id: storyId, mode: "read", page: pageIdx - 1 });
      });

      var counter = el("span", { class: "story-page-counter",
        text: (pageIdx + 1) + " / " + story.pages.length });

      var nextBtn = el("button", { class: "btn btn-neutral", text: "Next →" });
      if (pageIdx >= story.pages.length - 1) {
        nextBtn.textContent = "Done ✓";
        nextBtn.addEventListener("click", function() {
          navigate("story", { id: storyId, mode: "practice", page: 0 });
        });
      } else {
        nextBtn.addEventListener("click", function() {
          navigate("story", { id: storyId, mode: "read", page: pageIdx + 1 });
        });
      }

      nav.appendChild(prevBtn);
      nav.appendChild(counter);
      nav.appendChild(nextBtn);
      app.appendChild(nav);

      // Key words on current page
      if (page.words && page.words.length) {
        var wordRow = el("div", { class: "story-page-words" });
        page.words.forEach(function(w) {
          wordRow.appendChild(createWordReveal(w, "story-word-pill", "story-word-art"));
        });
        app.appendChild(wordRow);
      }

      // Moral on last page
      if (pageIdx === story.pages.length - 1 && story.moral) {
        app.appendChild(el("div", { class: "story-moral", text: "“" + story.moral + "”" }));
      }
    }

    // ── Listen mode ──────────────────────────────────────────────────────────
    if (mode === "listen") {
      var page = story.pages[pageIdx];

      var pageBox = el("div", { class: "story-page", text: page.text });
      app.appendChild(pageBox);

      var playBtn = el("button", { class: "btn btn-primary story-listen-btn", text: "🔊  Play audio" });
      playBtn.addEventListener("click", function() {
        playAudio(story.audioFile);
      });
      app.appendChild(playBtn);

      var nav = el("div", { class: "story-nav" });
      var prevBtn = el("button", { class: "btn btn-neutral", text: "← Prev" });
      prevBtn.disabled = pageIdx === 0;
      prevBtn.addEventListener("click", function() {
        navigate("story", { id: storyId, mode: "listen", page: pageIdx - 1 });
      });

      var counter = el("span", { class: "story-page-counter",
        text: (pageIdx + 1) + " / " + story.pages.length });

      var nextBtn = el("button", { class: "btn btn-neutral", text: "Next →" });
      if (pageIdx >= story.pages.length - 1) {
        nextBtn.textContent = "Practise →";
        nextBtn.addEventListener("click", function() {
          navigate("story", { id: storyId, mode: "practice", page: 0 });
        });
      } else {
        nextBtn.addEventListener("click", function() {
          navigate("story", { id: storyId, mode: "listen", page: pageIdx + 1 });
        });
      }

      nav.appendChild(prevBtn);
      nav.appendChild(counter);
      nav.appendChild(nextBtn);
      app.appendChild(nav);
    }

    // ── Practice mode ────────────────────────────────────────────────────────
    if (mode === "practice") {
      var words = story.practiceWords;
      var wordIdx = params.page || 0;

      // Finished all words — show summary
      if (wordIdx >= words.length) {
        var todayStory = getTodayStoryProgress();
        var isDone = todayStory.completed;

        var summary = el("div", {
          class: "practice-summary " + (isDone ? "summary-done" : "")
        });
        summary.innerHTML = isDone
          ? "<strong>Well done! ✓</strong><br>Today’s story practice complete!"
          : "<strong>Keep going!</strong><br>" + todayStory.correctWords.length + " / 3 words correct today.";
        app.appendChild(summary);

        if (story.comprehensionQuestion) {
          var qBox = el("div", { class: "story-question" });
          qBox.innerHTML = "<strong>Think about it:</strong> " + story.comprehensionQuestion;
          app.appendChild(qBox);
        }

        if (story.moral) {
          app.appendChild(el("div", { class: "story-moral",
            text: "“" + story.moral + "”" }));
        }

        var againBtn = el("button", { class: "btn btn-primary", text: "Practise again" });
        againBtn.addEventListener("click", function() {
          navigate("story", { id: storyId, mode: "practice", page: 0 });
        });
        var backBtn2 = el("button", { class: "btn btn-neutral", text: "← All stories" });
        backBtn2.addEventListener("click", function() { navigate("stories"); });
        var row = el("div", { class: "feedback-row" });
        row.appendChild(againBtn);
        row.appendChild(backBtn2);
        app.appendChild(row);
        return;
      }

      var currentWord = words[wordIdx];

      app.appendChild(createWordReveal(currentWord, "practice-word-card", "practice-word-art"));
      app.appendChild(el("div", { class: "practice-counter",
        text: "Word " + (wordIdx + 1) + " of " + words.length }));

      var btnRow = el("div", { class: "feedback-row" });

      var correctBtn = el("button", { class: "btn btn-success", text: "✓  I know it!" });
      correctBtn.addEventListener("click", function() {
        recordStoryAttempt(story.id, story.title, currentWord, true);
        var day = getTodayStoryProgress();
        if (day.completed && day.correctWords.length === 3) {
          showToast("Story practice done! ✓", true);
        } else {
          showToast("Well done!", true);
        }
        navigate("story", { id: storyId, mode: "practice", page: wordIdx + 1 });
      });

      var tryBtn = el("button", { class: "btn btn-soft", text: "↩  Try again" });
      tryBtn.addEventListener("click", function() {
        recordStoryAttempt(story.id, story.title, currentWord, false);
        showToast("Keep practising!", false);
        navigate("story", { id: storyId, mode: "practice", page: wordIdx + 1 });
      });

      btnRow.appendChild(correctBtn);
      btnRow.appendChild(tryBtn);
      app.appendChild(btnRow);

      var day = getTodayStoryProgress();
      app.appendChild(el("div", { class: "progress-note",
        text: "Today: " + day.correctWords.length + " / 3 story words" }));
    }
  }

  // ── Parent Settings ────────────────────────────────────────────────────────

  function renderSettings() {
    setBackButton(true, "← Home");
    setHeaderTitle("Parent Settings");

    var settings = getSettings();
    var app = $("#app");
    app.innerHTML = "";

    var form = el("div", { class: "settings-form" });

    // Default family
    var famLabel = el("label", { class: "setting-label", text: "Default word family" });
    var famSelect = el("select", { class: "setting-input", id: "s-family" });
    var noFam = el("option", { value: "", text: "All families" });
    famSelect.appendChild(noFam);
    FAMILIES.forEach(function(f) {
      var opt = el("option", { value: f, text: "-" + f });
      if (settings.defaultFamily === f) opt.setAttribute("selected", "selected");
      famSelect.appendChild(opt);
    });

    // Num choices
    var choicesLabel = el("label", { class: "setting-label", text: "Choices in Listen & Choose" });
    var choicesRow = el("div", { class: "radio-row" });
    [2, 3].forEach(function(n) {
      var radioWrap = el("label", { class: "radio-label" });
      var radio = el("input", { type: "radio", name: "numChoices", value: String(n) });
      if (settings.numChoices === n) radio.setAttribute("checked", "checked");
      radioWrap.appendChild(radio);
      radioWrap.appendChild(document.createTextNode(" " + n));
      choicesRow.appendChild(radioWrap);
    });

    // Phoneme delay
    var delayLabel = el("label", { class: "setting-label",
      text: "Delay between phonemes (ms): " + settings.phonemeDelay });
    var delayRange = el("input", {
      type: "range", id: "s-delay",
      min: "100", max: "800", step: "50",
      value: String(settings.phonemeDelay),
      class: "setting-range"
    });
    delayRange.addEventListener("input", function() {
      delayLabel.textContent = "Delay between phonemes (ms): " + delayRange.value;
    });

    // Show word in Listen & Choose
    var showWordWrap = el("label", { class: "setting-checkbox-label" });
    var showWordCheck = el("input", { type: "checkbox", id: "s-showword" });
    if (settings.showWordInListen) showWordCheck.setAttribute("checked", "checked");
    showWordWrap.appendChild(showWordCheck);
    showWordWrap.appendChild(document.createTextNode(" Show written word in Listen & Choose"));

    // Daily target
    var targetLabel = el("label", { class: "setting-label", text: "Daily target (correct words)" });
    var targetInput = el("input", {
      type: "number", id: "s-target",
      min: "1", max: "10",
      value: String(settings.dailyTarget),
      class: "setting-input setting-number"
    });

    // Series selection
    var seriesTitle = el("div", { class: "setting-section-title", text: "Active series" });
    var activeSeries = settings.activeSeries || "pink";

    var seriesGrid = el("div", { class: "series-radio-grid" });
    var seriesDefs = [
      { key: "pink",  icon: "🌸", label: "Pink",  desc: "CVC words — short vowels" },
      { key: "blue",  icon: "🔵", label: "Blue",  desc: "Consonant blends — flag, frog, drum…" },
      { key: "green", icon: "🟢", label: "Green", desc: "Digraphs — sh, ch, th, ng…" }
    ];
    seriesDefs.forEach(function(s) {
      var radioCard = el("label", {
        class: "series-radio-card " + SERIES_META[s.key].color +
               (activeSeries === s.key ? " series-radio-active" : "")
      });
      var radio = el("input", { type: "radio", name: "activeSeries", value: s.key });
      if (activeSeries === s.key) radio.setAttribute("checked", "checked");
      radio.addEventListener("change", function() {
        seriesGrid.querySelectorAll(".series-radio-card").forEach(function(c) {
          c.classList.remove("series-radio-active");
        });
        radioCard.classList.add("series-radio-active");
      });
      var icon = el("span", { class: "series-radio-icon", text: s.icon });
      var art = el("img", {
        class: "series-radio-art",
        src: SERIES_ART[s.key],
        alt: s.label + " Series artwork"
      });
      var name = el("span", { class: "series-radio-name", text: s.label + " Series" });
      var desc = el("span", { class: "series-radio-desc", text: s.desc });
      radioCard.appendChild(radio);
      radioCard.appendChild(icon);
      radioCard.appendChild(art);
      radioCard.appendChild(name);
      radioCard.appendChild(desc);
      seriesGrid.appendChild(radioCard);
    });
    var blueWrap = null, greenWrap = null; // kept to avoid reference errors below

    // Save button
    var saveBtn = el("button", { class: "btn btn-primary", text: "Save settings" });
    saveBtn.addEventListener("click", function() {
      var newSettings = {
        defaultFamily: famSelect.value,
        numChoices: parseInt($("input[name=numChoices]:checked") ?
          $("input[name=numChoices]:checked").value : "3"),
        phonemeDelay: parseInt(delayRange.value),
        showWordInListen: showWordCheck.checked,
        dailyTarget: Math.max(1, parseInt(targetInput.value) || 3),
        activeSeries: ($("input[name=activeSeries]:checked") || { value: "pink" }).value
      };
      saveSettings(newSettings);
      showToast("Settings saved", true);
    });

    // Clear progress
    var clearBtn = el("button", { class: "btn btn-danger", text: "Clear all progress" });
    clearBtn.addEventListener("click", function() {
      if (confirm("Clear all practice history? This cannot be undone.")) {
        clearAllProgress();
        showToast("Progress cleared", false);
      }
    });

    [famLabel, famSelect,
     choicesLabel, choicesRow,
     delayLabel, delayRange,
     showWordWrap,
     targetLabel, targetInput,
     seriesTitle, seriesGrid,
     saveBtn, clearBtn
    ].forEach(function(node) { form.appendChild(node); });

    app.appendChild(form);
  }

  // ── Init ───────────────────────────────────────────────────────────────────

  function init() {
    var backBtn = $("#back-btn");
    if (backBtn) {
      backBtn.addEventListener("click", function() { navigate("home"); });
    }
    navigate("home");
  }

  return { init: init, navigate: navigate };

})();

document.addEventListener("DOMContentLoaded", function() { App.init(); });

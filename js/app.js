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
      return (w.series || "pink") === active;
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

  function wordSeries(word) { return word.series || "pink"; }

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
      families:  renderFamilies,
      calendar:  renderCalendar,
      settings:  renderSettings
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
      { label: "Word Families",      icon: "📚", view: "families" },
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

    app.appendChild(statusBar);
    app.appendChild(badgeRow);
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

      // Emoji + word display
      if (currentWord.emoji) {
        app.appendChild(el("div", { class: "word-emoji", text: currentWord.emoji }));
      }
      var wordDisplay = el("div", { class: "word-display", text: currentWord.word });

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
        var hint = el("div", { class: "word-hint", text: currentWord.word });
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
        if (choice.emoji) {
          card.appendChild(el("span", { class: "choice-emoji", text: choice.emoji }));
        }
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

      if (wordItem.emoji) {
        app.appendChild(el("div", { class: "word-emoji", text: wordItem.emoji }));
      }
      var wordDisplay = el("div", { class: "word-display", text: wordItem.word });

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
      var name = el("span", { class: "series-radio-name", text: s.label + " Series" });
      var desc = el("span", { class: "series-radio-desc", text: s.desc });
      radioCard.appendChild(radio);
      radioCard.appendChild(icon);
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

// Progress tracking — localStorage, per-day, unique-word counting

var PROGRESS_KEY = "pinkSeriesProgress";
var SETTINGS_KEY = "pinkSeriesSettings";

var DEFAULT_SETTINGS = {
  defaultFamily: "",
  numChoices: 3,
  phonemeDelay: 350,
  showWordInListen: false,
  dailyTarget: 3,
  activeSeries: "pink"
};

// ── Settings ────────────────────────────────────────────────────────────────

function getSettings() {
  try {
    var raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return Object.assign({}, DEFAULT_SETTINGS);
    return Object.assign({}, DEFAULT_SETTINGS, JSON.parse(raw));
  } catch (e) {
    return Object.assign({}, DEFAULT_SETTINGS);
  }
}

function saveSettings(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

// ── Progress ─────────────────────────────────────────────────────────────────

function getTodayKey() {
  var d = new Date();
  var yyyy = d.getFullYear();
  var mm = String(d.getMonth() + 1).padStart(2, "0");
  var dd = String(d.getDate()).padStart(2, "0");
  return yyyy + "-" + mm + "-" + dd;
}

function getProgress() {
  try {
    var raw = localStorage.getItem(PROGRESS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveProgress(progress) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

function getEmptyDay() {
  return {
    correctWords: [],
    attempts: 0,
    practisedWords: [],
    completed: false
  };
}

function getTodayProgress() {
  var progress = getProgress();
  var key = getTodayKey();
  return progress[key] ? progress[key] : getEmptyDay();
}

function recordAttempt(word, isCorrect) {
  var progress = getProgress();
  var key = getTodayKey();
  var settings = getSettings();

  if (!progress[key]) {
    progress[key] = getEmptyDay();
  }

  var day = progress[key];
  day.attempts += 1;

  // Track unique practised words
  if (day.practisedWords.indexOf(word) === -1) {
    day.practisedWords.push(word);
  }

  if (isCorrect) {
    // Only count each word once toward correctWords
    if (day.correctWords.indexOf(word) === -1) {
      day.correctWords.push(word);
    }
  }

  day.completed = day.correctWords.length >= settings.dailyTarget;
  saveProgress(progress);
  return day;
}

function isDayCompleted(dateKey) {
  var progress = getProgress();
  var settings = getSettings();
  var day = progress[dateKey];
  if (!day) return false;
  return day.correctWords.length >= settings.dailyTarget;
}

function dayHasActivity(dateKey) {
  var progress = getProgress();
  var day = progress[dateKey];
  if (!day) return false;
  return day.attempts > 0;
}

function getMonthProgress(year, month) {
  // Returns object keyed by date strings for the given year/month (1-indexed month)
  var progress = getProgress();
  var prefix = year + "-" + String(month).padStart(2, "0") + "-";
  var result = {};
  Object.keys(progress).forEach(function(key) {
    if (key.indexOf(prefix) === 0) {
      result[key] = progress[key];
    }
  });
  return result;
}

function clearAllProgress() {
  localStorage.removeItem(PROGRESS_KEY);
  localStorage.removeItem(STORY_PROGRESS_KEY);
}

// ── Story Progress ────────────────────────────────────────────────────────────

var STORY_PROGRESS_KEY = "pinkSeriesStoryProgress";
var STORY_DAILY_TARGET = 3;

function getStoryProgress() {
  try {
    var raw = localStorage.getItem(STORY_PROGRESS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveStoryProgress(progress) {
  localStorage.setItem(STORY_PROGRESS_KEY, JSON.stringify(progress));
}

function getEmptyStoryDay() {
  return { storyId: null, storyTitle: "", correctWords: [], attempts: 0, completed: false };
}

function getTodayStoryProgress() {
  var progress = getStoryProgress();
  var key = getTodayKey();
  return progress[key] ? progress[key] : getEmptyStoryDay();
}

function recordStoryAttempt(storyId, storyTitle, word, isCorrect) {
  var progress = getStoryProgress();
  var key = getTodayKey();
  if (!progress[key]) progress[key] = getEmptyStoryDay();
  var day = progress[key];
  day.storyId = storyId;
  day.storyTitle = storyTitle;
  day.attempts += 1;
  if (isCorrect && day.correctWords.indexOf(word) === -1) {
    day.correctWords.push(word);
  }
  day.completed = day.correctWords.length >= STORY_DAILY_TARGET;
  saveStoryProgress(progress);
  return day;
}

function getMonthStoryProgress(year, month) {
  var progress = getStoryProgress();
  var prefix = year + "-" + String(month).padStart(2, "0") + "-";
  var result = {};
  Object.keys(progress).forEach(function(key) {
    if (key.indexOf(prefix) === 0) result[key] = progress[key];
  });
  return result;
}

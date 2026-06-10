// Audio playback module — never throws, always resolves

function wait(ms) {
  return new Promise(function(resolve) { setTimeout(resolve, ms); });
}

function playAudio(path) {
  return new Promise(function(resolve) {
    if (!path) { resolve(); return; }

    var audio = new Audio(path);

    audio.onended = resolve;

    audio.onerror = function() {
      console.warn("Missing or invalid audio:", path);
      resolve();
    };

    audio.play().catch(function(error) {
      console.warn("Audio playback failed:", path, error);
      resolve();
    });
  });
}

async function playAudioSequence(paths, delayMs) {
  var delay = (delayMs !== undefined) ? delayMs : 350;
  for (var i = 0; i < paths.length; i++) {
    await playAudio(paths[i]);
    if (i < paths.length - 1) {
      await wait(delay);
    }
  }
}

async function playWordPhonemes(wordItem, delayMs) {
  var delay = (delayMs !== undefined) ? delayMs : 350;
  var paths = wordItem.phonemes.map(getAudioPathForPhoneme);
  await playAudioSequence(paths, delay);
}

async function playWordItemSequence(wordItems, delayMs, gapMs) {
  var delay = (delayMs !== undefined) ? delayMs : 350;
  var gap = (gapMs !== undefined) ? gapMs : 450;
  for (var i = 0; i < wordItems.length; i++) {
    await playWordPhonemes(wordItems[i], delay);
    if (i < wordItems.length - 1) {
      await wait(gap);
    }
  }
}

async function playPhoneme(phoneme) {
  await playAudio(getAudioPathForPhoneme(phoneme));
}

function normalize(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/feat\.|ft\./g, "")
    .trim();
}

function compare(guess, target) {
  const yearDiff = Number(guess.year) - Number(target.year);
  const durationDiff = guess.duration - target.duration;

  return {
    track:
      normalize(guess.track) === normalize(target.track) ? "correct" : "wrong",
    artist:
      normalize(guess.artist) === normalize(target.artist)
        ? "correct"
        : "wrong",
    album:
      normalize(guess.album) === normalize(target.album) ? "correct" : "wrong",
    year: {
      diff: yearDiff,
      status:
        yearDiff === 0
          ? "correct"
          : Math.abs(yearDiff) <= 5
            ? "close"
            : yearDiff > 0
              ? "lower"
              : "higher",
    },
    duration: {
      diff: durationDiff,
      status:
        durationDiff == 0
          ? "correct"
          : Math.abs(durationDiff) <= 30
            ? "close"
            : durationDiff > 0
              ? "lower"
              : "higher",
    },
  };
}

module.exports = { compare };

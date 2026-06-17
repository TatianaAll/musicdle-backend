const { getTrack } = require('../services/cache/trackCache.js');
const { getDailyTarget } = require('../repositories/gameRepository.js');
const { compare } = require('../services/compareService.js');
const { getGenreOfATrack, getRandomTrack } = require('../services/spotify.js');

async function postGuess(req, res) {
  const { guessId } = req.body;

  if (!guessId) return res.status(400).json({ error: "Guess track ID is required" });

  const guess = getTrack(guessId);
  if (!guess) return res.status(404).json({ error: "Track not found in cache" });

  const target = await getDailyTarget();
  if (!target) return res.status(404).json({ error: "Daily target not found" });

  const result = compare(guess, target);
  res.json(result);
}

async function testRandom(req, res) {
  const resultRandom = await getRandomTrack();
  console.log(resultRandom);
  const randomArtistName = resultRandom.artists[0].name;
  let artistGenres = [];
  console.log(getGenreOfATrack(randomArtistName));

  res.json(resultRandom); 
}

module.exports = {
  postGuess,
  testRandom
};
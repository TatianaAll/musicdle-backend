import { getTrack } from "../services/cache/trackCache.js";
import { getDailyTarget } from "../repositories/gameRepository.js";
import { compare } from "../services/compareService.js";
import { getRandomTrack } from "../services/spotify.js";

//modif ca pour archi mutli games
export async function postGuess(req, res) {
  const { guessId } = req.body;

  if (!guessId) return res.status(400).json({ error: "Guess track ID is required" });

  const guess = getTrack(guessId);
  if (!guess) return res.status(404).json({ error: "Track not found in cache" });

  const target = await getDailyTarget();
  if (!target) return res.status(404).json({ error: "Daily target not found" });

  const result = compare(guess, target);
  res.json(result);
}

export async function testRandom(req, res) {
  const resultRandom = await getRandomTrack();

  console.log(resultRandom);
  res.json(resultRandom);
}
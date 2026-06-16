import { Router } from "express";
import { postGuess, testRandom } from "../controllers/gameControllers.js";
import { getDailyGenre } from "../repositories/gameRepository.js";

const router = Router();

router.post("/:gameId/guess", postGuess);
router.get("/:gameId/guess/genre", getDailyGenre)


export default router;
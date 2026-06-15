import { Router } from "express";
import { postGuess, testRandom } from "../controllers/gameControllers.js";

const router = Router();

router.post("/:gameId/guess", postGuess);
// test de la fonction pour avoir une track random
router.get('/test', testRandom);


export default router;

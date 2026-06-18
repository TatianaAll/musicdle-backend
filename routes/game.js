const { Router } = require("express");
const { postGuess, testRandom, getDailyGenre } = require("../controllers/gameControllers");

const router = Router();

router.post("/:gameId/guess", postGuess);
// test de la fonction pour avoir une track random
router.get('/test', testRandom);
router.get("/:gameId/guess/genre", getDailyGenre)


module.exports = router;
const { Router } = require("express");
const { postGuess, testRandom } = require("../controllers/gameControllers");

const router = Router();

router.post("/:gameId/guess", postGuess);
router.get("/:gameId/guess/genre", getDailyGenre)


module.exports = router;

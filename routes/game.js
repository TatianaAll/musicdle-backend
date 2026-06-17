const { Router } = require("express");
const { postGuess, testRandom } = require("../controllers/gameControllers");

const router = Router();

router.post("/:gameId/guess", postGuess);
// test de la fonction pour avoir une track random
router.get('/test', testRandom);


module.exports = router;

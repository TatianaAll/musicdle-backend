import { Router } from "express";
import { postGuess } from "../controllers/gameControllers.js";

const router = Router();

router.post("/:gameId/guess", postGuess);

export default router;
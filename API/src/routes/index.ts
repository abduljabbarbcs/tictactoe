import express from "express";
import { Router } from "express";
import {
  getGames,
  getGame,
  startGame,
  move,
  deleteGame
} from "../controllers/tic-tac-toe";

const router: Router = express.Router();

router.get("/api/v1/games", getGames);
router.post("/api/v1/startgame", startGame);
router.put("/api/v1/move", move);
router.delete("/api/v1/delete", deleteGame);
router.get("/api/v1/game/:id", getGame);

export default router;

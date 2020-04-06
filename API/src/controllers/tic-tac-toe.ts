import uuid from "uuid-random";
import { find, findIndex, propEq, filter } from "ramda";
import { Request, Response } from "express";
import { games } from "../models/games";
import {
  findNewSubmission,
  move as submitMove,
  replaceChar,
  serverMove
} from "../helpers";

export const getGames = async (req: Request, res: Response) => {
  res.json({ games });
};

export const startGame = async (req: Request, res: Response) => {
  const { game } = req.body;
  game.id = uuid();
  games.push(game);
  res.json({ game });
};

export const move = async (req: Request, res: Response) => {
  const { game } = req.body;

  const selectedGame: any = find(propEq("id", game.uuid))(games);
  if (selectedGame && selectedGame.status === "RUNNING") {
    const newMove = findNewSubmission(game.board, selectedGame.board);
    game.status = submitMove(selectedGame.board, newMove);
    let updatedGameMove = Object.assign({}, game);
    if (game.status === "RUNNING") {
      const newMove = serverMove(game.board);
      updatedGameMove.status = submitMove(game.board, newMove);
      updatedGameMove["board"] = replaceChar(
        updatedGameMove["board"],
        newMove.value,
        newMove.actual
      );
    }
    selectedGame.status = updatedGameMove.status;
    selectedGame.board = updatedGameMove.board;
    res.send(updatedGameMove);
  } else {
    res.send("id is incorrect or game is finished");
  }
};

export const deleteGame = async (req: Request, res: Response) => {
  const { uuid } = req.body;
  games.splice(findIndex(propEq("id", uuid))(games), 1);
  res.send({ games });
};
export const getGame = async (req: Request, res: Response) => {
  const uuid = req.params.id;
  const game = filter(propEq("id", uuid))(games);
  res.send({ game });
};

import express, { Request, Response } from "express";
// const express = require('express')
import cors from "cors";
import Game from "./game"; // Assuming your file is named "game.ts"
import { PieceLetter } from "./types/types";

const app = express();
app.use(cors());
app.use(express.json());

let game: Game | null = null;
const beginningState: Array<PieceLetter> = ['x','x','b','x','x','b','x','x', 'x','x','x','x','x','x','x','x','','','','','','','','', '','','','','','','','',    '','','','','','','','', '','','','','','','','',  'X','X','X','X','X','X','X','X', 'X','X','B','X','X','B','X', 'X',] 
app.post("/create_game", async (req: any, res: any) => {
  game = new Game(beginningState, 600);

  const simplifiedBoard = game.getBoard(); // Assuming you have a getBoard method in your Game class

  res.json({
    message: 'Success',
    game,
    board: simplifiedBoard,
    initialized: game?.gameStarted, // Include the initialization status
  });
});

app.post("/begin_game", async (req: Request, res: Response) => {
  if (game) {
    game.beginGame();
  } else {
    throw new Error(" GAME WAS NOT INITIATED");
  }
});

app.post('/new_move', (req: any, res: any) => {
  const { from, to } = req.body;
  let moveSuccessful = false;
  if (from === undefined || to === undefined || game === null) {
    console.log(from, to);
    return res.status(400).json({ error: 'There was a problem with the new move', values: { from, to, game } });
  }

  console.log('Received move to index:', from);
  if (game.checkMoveValid(from, to)) {
    game.processValidMovement(from, to);
    moveSuccessful = true;
  }

  // Extract necessary information from the game object to avoid circular reference
  const simplifiedBoard = game.getBoard(); // Assuming you have a getBoard method in your Game class

  res.json({
    message: moveSuccessful,
    from,
    board: simplifiedBoard,
  });
});

app.get("/game_state", async (req: any, res: any) => {
  if (game) {
    res.json({
      message: game,
      board: game.getBoard(),
    });
  } else {
    res.status(404).json({
      error: 'Game not found',
    });
  }
});

app.listen(3001, () => {
  // console.log("\x1Bc"); // ANSI escape code for clearing CMD in Windows

  // console.log("\x1B[2J\x1B[0f"); // ANSI escape code for clearing terminal in Unix-based systems
  console.log("Server is running on port 3001");
});
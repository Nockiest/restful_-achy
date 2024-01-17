import express, { Request, Response } from "express";
 
import cors from "cors";
import Game from "./game"; // Assuming your file is named "game.ts"
import { PieceLetter } from "./types/types";

const app = express();
app.use(cors());
app.use(express.json());

let game: Game | null = null;
const beginningState: Array<PieceLetter> = ['r','n','b','q','k','b','n','r', 'p','p','p','p','p','p','p','p','','','','Q','','','','q', '','','','','','','','',    '','','r','','','','','', '','R','','','','','','',  'P','P','P','P','P','P','P','P', 'R','N','B','Q','K','B','N', 'R',] 

app.post("/create_game", async (req: any, res: any) => {
  game = null
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
    // console.log(from, to);
    return res.status(400).json({ error: 'There was a problem with the new move', values: { from, to, game } });
  }

  // console.log('Received move to index:', from);
  if (game.checkMoveValid(from, to)) {
    console.log('move valud')
    game.processValidMovement(from, to);
    moveSuccessful = true;
  }

  // Extract necessary information from the game object to avoid circular reference
  const simplifiedBoard = game.getBoard(); // Assuming you have a getBoard method in your Game class
  console.log('x',moveSuccessful)
  res.json({
    message: moveSuccessful,
    from,
    board: simplifiedBoard,
  });
});
const seen: Array< boolean> = [];// I have added this wierd code because of a json error
app.get('/game_state', async (req: Request, res: Response) => {
  try {
    if (game) {
      const cleanGame = JSON.stringify(game, (key, value) => {
        if (typeof value === 'object' && value !== null) {
          if (seen.includes(value)) {
            return '[Circular]';
          }
          seen.push(value);
        }
        return value;
      });
      res.json({
        message: cleanGame,
        board: game.getBoard(),
      });
    } else {
      res.status(404).json({
        error: 'Game not found',
      });
    }
  } catch (error) {
    // Send the error to the frontend
    res.status(500).json(  error   );
  }
});


app.listen(3001, () => {
  // console.log("\x1Bc"); // ANSI escape code for clearing CMD in Windows

  // console.log("\x1B[2J\x1B[0f"); // ANSI escape code for clearing terminal in Unix-based systems
  console.log("Server is running on port 3001");
});

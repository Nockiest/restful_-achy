import express, { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import cors from "cors";
import Game from "./game"; // Assuming your file is named "game.ts"
import { PieceLetter } from "./types/types";

export const app = express();
app.use(cors());
app.use(express.json());

let games: Game[ ] = [ ];
const beginningState: Array<PieceLetter> = ['r','','','','k','','','r', 'p','','','','p','','','','','','','Q','','','','q', '','','','','','','','',    '','','r','','','','','', '','R','','','','','','',  'P','P','P','P','P','P','P','P', 'R','','','Q','K','','', 'R',]

function findGame(games: Game[], gameId: string): Game | null {


  if (games === undefined || games == null) {
    return null;
  }
  return games.find((onegame) => onegame?.gameId === gameId) || null;
}

app.get('/game_ids', (req: Request, res: Response) => {

  const gameIds = games.map((game) => game.gameId);
  res.json(gameIds);
});

app.post("/create_game", async (req: any, res: any) => {
  console.log('recieved')
  const {whiteId,blackId} = req.body
  const newGameId = uuidv4()
  let newGame = new Game(beginningState, 600, newGameId, whiteId )
  games.push( newGame )
  const simplifiedBoard = newGame.getSimplifiedBoard(); // Assuming you have a getBoard method in your Game class
  console.log(
     'Success',
      simplifiedBoard,
    newGame?.gameStarted, // Include the initialization status
  )
  res.json({
    message: 'Success',
    newGame,
    board: simplifiedBoard,
    initialized: newGame?.gameStarted, // Include the initialization status
  });
});

app.post("/begin_game", async (req: Request, res: Response) => {

  const { gameId ,playerID} = req.body;
  console.log( games, gameId ,findGame(games , gameId ))
  console.log(  gameId)
  const game = findGame(games , gameId )
// if (playerId !== this.players[0].getId()){
    //   console.error('WRONG ID ', playerId, this.players[0].getId())
    // }

  if (game && game.authorizePlayer(playerID)) {
    game.beginGame(playerID);
  } else {
    console.error(`GAME DOESNT EXIST ${gameId}`);
  }
});

app.post('/new_move', (req: any, res: any) => {
  const { from, to, gameId } = req.body;
  let moveSuccessful = false;
  const game = findGame(games , gameId )
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
  const simplifiedBoard = game.getSimplifiedBoard(); // Assuming you have a getBoard method in your Game class
  console.log('x',moveSuccessful)
  res.json({
    message: moveSuccessful,
    from,
    board: simplifiedBoard,
  });
});
const seen: Array< boolean> = [];// I have added this wierd code because of a json error
app.get('/game_state', async (req: Request, res: Response) => {
  const {gameId } = req.query;
  const game = findGame(games ,  gameId as string )
  console.log('game found', req.body, gameId, game )
  try {
    if (game) {
      console.log(game.getSimplifiedBoard(), )
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
        board: game.getSimplifiedBoard(),
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

app.post('/join_game',  async (req: Request, res: Response) => {
  const {gameId, playerID } = req.body;
  const game = findGame(games , gameId )
  console.log(game, gameId, 'sought game', req.body)
  games. forEach(element => {
    console.log(element.gameId, gameId)
  });
  try {
    if (game) {

      res.json({
        message: game,
        board: game.getSimplifiedBoard(),
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
})

app.listen(3001, () => {
  // console.log("\x1Bc"); // ANSI escape code for clearing CMD in Windows

  // console.log("\x1B[2J\x1B[0f"); // ANSI escape code for clearing terminal in Unix-based systems
  console.log("Server is running on port 3001");
});

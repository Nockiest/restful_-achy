"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const uuid_1 = require("uuid");
const cors_1 = __importDefault(require("cors"));
const game_1 = __importDefault(require("./game")); // Assuming your file is named "game.ts"
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
const connectedClients = [];
let games = [];
const beginningState = ['r', '', '', '', 'k', '', '', 'r', 'p', '', '', '', 'p', '', '', '', '', '', '', 'Q', '', '', '', 'q', '', '', '', '', '', '', '', '', '', '', 'r', '', '', '', '', '', '', 'R', '', '', '', '', '', '', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'R', '', '', 'Q', 'K', '', '', 'R',];
function findGame(games, gameId) {
    if (games === undefined || games == null) {
        return null;
    }
    return games.find((onegame) => (onegame === null || onegame === void 0 ? void 0 : onegame.gameId) === gameId) || null;
}
exports.app.get('/game_ids', (req, res) => {
    const gameIds = games.map((game) => game.gameId);
    res.json(gameIds);
});
exports.app.post("/create_game", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('recieved');
    const { whiteId, blackId } = req.body;
    const newGameId = (0, uuid_1.v4)();
    let newGame = new game_1.default(beginningState, 600, newGameId, whiteId);
    games.push(newGame);
    const simplifiedBoard = newGame.getSimplifiedBoard(); // Assuming you have a getBoard method in your Game class
    console.log('Success', simplifiedBoard, newGame === null || newGame === void 0 ? void 0 : newGame.gameStarted);
    res.json({
        message: 'Success',
        newGame,
        board: simplifiedBoard,
        initialized: newGame === null || newGame === void 0 ? void 0 : newGame.gameStarted, // Include the initialization status
    });
}));
exports.app.post("/begin_game", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { gameId, playerID } = req.body;
        const game = findGame(games, gameId);
        console.log(games, gameId, game);
        // if (!game){
        //   res.status(401).json(  error   );
        // }
        console.log(gameId, playerID, game === null || game === void 0 ? void 0 : game.authorizePlayer(playerID));
        // if (playerId !== this.players[0].getId()){
        //   console.error('WRONG ID ', playerId, this.players[0].getId())
        // }
        if (game && game.authorizePlayer(playerID)) {
            game.beginGame(playerID);
        }
        else {
            console.error(`GAME DOESNT EXIST ${gameId}`);
        }
    }
    catch (error) {
        // Send the error to the frontend
        res.status(500).json(error);
    }
}));
exports.app.post('/new_move', (req, res) => {
    const { from, to, gameId } = req.body;
    let moveSuccessful = false;
    const game = findGame(games, gameId);
    if (from === undefined || to === undefined || game === null) {
        // console.log(from, to);
        return res.status(400).json({ error: 'There was a problem with the new move', values: { from, to, game } });
    }
    // console.log('Received move to index:', from);
    if (game.checkMoveValid(from, to)) {
        console.log('move valud');
        game.processValidMovement(from, to);
        moveSuccessful = true;
    }
    // Extract necessary information from the game object to avoid circular reference
    const simplifiedBoard = game.getSimplifiedBoard(); // Assuming you have a getBoard method in your Game class
    console.log('x', moveSuccessful);
    res.json({
        message: moveSuccessful,
        from,
        board: simplifiedBoard,
    });
});
const seen = []; // I have added this wierd code because of a json error
exports.app.get('/game_state', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { gameId } = req.query;
    const game = findGame(games, gameId);
    // console.log('game found', req.body, gameId, game )
    try {
        if (game) {
            // console.log(game.getSimplifiedBoard(), )
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
                time: game.getTime()
            });
        }
        else {
            res.status(404).json({
                error: 'Game not found',
            });
        }
    }
    catch (error) {
        // Send the error to the frontend
        res.status(500).json(error);
    }
}));
exports.app.post('/join_game', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { gameId, playerID } = req.body;
    const game = findGame(games, gameId);
    // console.log(game, gameId, 'sought game', req.body)
    // games. forEach(element => {
    //   console.log(element.gameId, gameId)
    // });
    try {
        if (game) {
            res.json({
                message: game,
                board: game.getSimplifiedBoard(),
            });
        }
        else {
            res.status(404).json({
                error: 'Game not found',
            });
        }
    }
    catch (error) {
        // Send the error to the frontend
        res.status(500).json(error);
    }
}));
exports.app.listen(3001, () => {
    // console.log("\x1Bc"); // ANSI escape code for clearing CMD in Windows
    // console.log("\x1B[2J\x1B[0f"); // ANSI escape code for clearing terminal in Unix-based systems
    console.log("Server is running on port 3001");
});

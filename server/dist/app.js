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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const game_1 = __importDefault(require("./game")); // Assuming your file is named "game.ts"
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
let game = null;
const beginningState = ['x', 'n', 'b', 'x', 'x', 'b', 'n', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', '', '', '', 'b', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'N', 'B', 'X', 'X', 'B', 'N', 'X',];
app.post("/create_game", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    game = null;
    game = new game_1.default(beginningState, 600);
    // console.log(game)
    const simplifiedBoard = game.getBoard(); // Assuming you have a getBoard method in your Game class
    res.json({
        message: 'Success',
        game,
        board: simplifiedBoard,
        initialized: game === null || game === void 0 ? void 0 : game.gameStarted, // Include the initialization status
    });
}));
app.post("/begin_game", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (game) {
        game.beginGame();
    }
    else {
        throw new Error(" GAME WAS NOT INITIATED");
    }
}));
app.post('/new_move', (req, res) => {
    const { from, to } = req.body;
    let moveSuccessful = false;
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
    const simplifiedBoard = game.getBoard(); // Assuming you have a getBoard method in your Game class
    console.log('x', moveSuccessful);
    res.json({
        message: moveSuccessful,
        from,
        board: simplifiedBoard,
    });
});
const seen = []; // I have added this wierd code because of a json error
app.get("/game_state", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    }
    else {
        res.status(404).json({
            error: 'Game not found',
        });
    }
}));
app.listen(3001, () => {
    // console.log("\x1Bc"); // ANSI escape code for clearing CMD in Windows
    // console.log("\x1B[2J\x1B[0f"); // ANSI escape code for clearing terminal in Unix-based systems
    console.log("Server is running on port 3001");
});

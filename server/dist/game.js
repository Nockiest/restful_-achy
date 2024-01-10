"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const grid_1 = __importDefault(require("./grid/grid"));
const player_1 = __importDefault(require("./player"));
const utils_1 = require("./utils");
class Game {
    constructor(gameState, gameTime) {
        this.curPlayerIndex = 0;
        this.checkedPlayer = "none";
        this.timeInterval = null;
        this.gameStarted = false;
        this.grid = new grid_1.default(8, 8, gameState);
        this.gameTime = gameTime;
        this.players = this.generatePlayers();
    }
    generatePlayers() {
        const whitePlayer = new player_1.default(this.gameTime, "white");
        const blackPlayer = new player_1.default(this.gameTime, "black");
        return [whitePlayer, blackPlayer];
    }
    get curPlayer() {
        return this.players[this.curPlayerIndex];
    }
    switchPlayer() {
        this.curPlayerIndex = 1 - this.curPlayerIndex; // Toggle between 0 and 1
    }
    startCountingTime() {
        this.timeInterval = setInterval(() => {
            this.countTime();
        }, 1000);
    }
    stopCountingTime() {
        if (this.timeInterval !== null) {
            clearInterval(this.timeInterval);
        }
    }
    countTime() {
        this.curPlayer.updateTime();
    }
    getBoard() {
        const board = [];
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                if (!utils_1.checkInGameBounds) {
                    board.push(null);
                    continue;
                }
                const cell = this.grid.getCellAtIndex(row * 8 + col);
                const piece = cell === null || cell === void 0 ? void 0 : cell.piece;
                board.push(piece);
            }
        }
        return board;
    }
    beginGame() {
        console.log("BEGINNING GAME ");
        console.log("test");
        if (!this.gameStarted) {
            console.log("Game has begun!");
            this.startCountingTime();
            this.gameStarted = true;
        }
        else {
            console.log("The game has already started!");
        }
    }
    checkMoveValid(from, to) {
        console.log(from, to);
        const fromCell = this.grid.getCellAtIndex(from);
        if ((fromCell === null || fromCell === void 0 ? void 0 : fromCell.piece) === null || (fromCell === null || fromCell === void 0 ? void 0 : fromCell.piece) === undefined) {
            console.log("FROM PIECE NULL");
            return false;
        }
        console.log(this.grid, "THIS GRID");
        const toCell = this.grid.getCellAtIndex(to);
        console.log("Making move ", fromCell, 'to', toCell, this.grid);
        console.log("CAN MOVE? ", fromCell.piece.canMove(to, this.grid));
        // code for checking if movement is valid
        return fromCell.piece.canMove(to, this.grid); //fromCell.piece.canMove(to, this.grid); // return if move is valid
    }
    processValidMovement(from, to) {
        // other code for movement
        this.grid.makeMove(from, to);
        this.switchPlayer(); // Switch to the next player after a valid move
    }
}
exports.default = Game;

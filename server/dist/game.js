"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const grid_1 = __importDefault(require("./grid/grid"));
const player_1 = __importDefault(require("./player"));
const utils_1 = require("./utils");
class Game {
    constructor(gameState, gameTime, gameId, whiteId) {
        this.curPlayerIndex = 0;
        this.checkedPlayer = "none";
        this.timeInterval = null;
        this.gameStarted = false;
        this.grid = new grid_1.default(8, 8, gameState);
        this.gameTime = gameTime;
        this.players = this.generatePlayers(whiteId, null);
        this.gameId = gameId;
    }
    generatePlayers(whiteId, blackId) {
        const whitePlayer = new player_1.default(this.gameTime, "white", whiteId);
        const blackPlayer = new player_1.default(this.gameTime, "black", blackId);
        return [whitePlayer, blackPlayer];
    }
    get curPlayer() {
        return this.players[this.curPlayerIndex];
    }
    joinBlackPlayer(blackId) {
        var _a;
        (_a = this.players[1]) === null || _a === void 0 ? void 0 : _a.setId(blackId);
    }
    getTime() {
        var _a, _b;
        return [(_a = this.players[0]) === null || _a === void 0 ? void 0 : _a.getTime(), (_b = this.players[1]) === null || _b === void 0 ? void 0 : _b.getTime()];
    }
    switchPlayer() {
        this.curPlayerIndex = 1 - this.curPlayerIndex; // Toggle between 0 and 1
    }
    startCountingTime() {
        if (this.timeInterval !== null) {
            clearInterval(this.timeInterval);
        }
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
    getSimplifiedBoard() {
        const board = [];
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                if (!utils_1.checkInGameBounds) {
                    board.push(null);
                    continue;
                }
                const cell = this.grid.getCellAtIndex(row * 8 + col);
                const piece = cell === null || cell === void 0 ? void 0 : cell.piece;
                board.push(piece === null || piece === void 0 ? void 0 : piece.abbreviation);
            }
        }
        return board;
    }
    authorizePlayer(playerId) {
        var _a, _b, _c;
        if (playerId !== ((_a = this.players[0]) === null || _a === void 0 ? void 0 : _a.getId()) && playerId !== ((_b = this.players[1]) === null || _b === void 0 ? void 0 : _b.getId())) {
            console.error('WRONG ID ', playerId, (_c = this.players[0]) === null || _c === void 0 ? void 0 : _c.getId());
            return false;
        }
        return true;
    }
    beginGame(playerId) {
        console.log("BEGINNING GAME ");
        this.startCountingTime();
        this.gameStarted = true;
        if (!this.gameStarted) {
            console.log("Game has begun!");
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

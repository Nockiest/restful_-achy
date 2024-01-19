"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cell_1 = __importDefault(require("./cell"));
const utils_1 = require("../utils");
const defaultPiece_1 = __importDefault(require("../pieces/defaultPiece"));
const bishop_1 = __importDefault(require("../pieces/bishop"));
const knight_1 = __importDefault(require("../pieces/knight"));
const rook_1 = __importDefault(require("../pieces/rook"));
const queen_1 = __importDefault(require("../pieces/queen"));
const king_1 = __importDefault(require("../pieces/king"));
const pawn_1 = __importDefault(require("../pieces/pawn"));
class Grid {
    constructor(height, width, gameState) {
        this.height = height;
        this.width = width;
        this.cells = this.createCellsAndPieces(gameState);
    }
    getPieceFromIdentifier(identifier) {
        // switch statement for getting the correct piece type
        if (identifier.toLowerCase() === "b") {
            return bishop_1.default;
        }
        else if (identifier.toLowerCase() === "k") {
            return king_1.default;
        }
        else if (identifier.toLowerCase() === "q") {
            return queen_1.default;
        }
        else if (identifier.toLowerCase() === "r") {
            return rook_1.default;
        }
        else if (identifier.toLowerCase() === "p") {
            return pawn_1.default;
        }
        else if (identifier.toLowerCase() === "n") {
            return knight_1.default;
        }
        else if (identifier.toLowerCase() === "x") {
            return defaultPiece_1.default;
        }
        else {
            return null;
        }
    }
    createCellsAndPieces(gameState) {
        const cells = [];
        for (let i = 0; i < this.height * this.width; i++) {
            if (i >= 64) {
                console.error('this index is to big', i);
                break;
            }
            const pieceType = this.getPieceFromIdentifier(gameState[i]);
            let newCell;
            if (pieceType) {
                const color = gameState[i].toLowerCase() === gameState[i] ? 'black' : 'white';
                const newPiece = new pieceType(color, i);
                newCell = new cell_1.default(i, gameState[i], newPiece);
            }
            else {
                newCell = new cell_1.default(i, gameState[i], null);
            }
            cells.push(newCell);
        }
        return cells;
    }
    instantiatePieces(valuearr) {
        // Loop through the cells and set their values based on the array
        this.cells.forEach((cell, index) => {
            const pieceLetter = valuearr[index];
            if (pieceLetter === null || index >= 64) {
                return; // Skip to the next iteration
            }
            // Check if pieceLetter is uppercase (white) or lowercase (black)
            const color = pieceLetter === pieceLetter.toUpperCase() ? 'white' : 'black';
            // Change the value of the cell
            cell.changeValue(pieceLetter);
            // Create a new Piece with the determined color
            cell.piece = new defaultPiece_1.default(color, index);
        });
    }
    getCellAtIndex(index) {
        if ((0, utils_1.checkInGameBounds)(index)) {
            return this.cells[index];
        }
    }
    getPieceAtIndex(index) {
        if ((0, utils_1.checkInGameBounds)(index)) {
            return this.cells[index].piece;
        }
    }
    makeMove(from, to) {
        // Ensure that from and to are valid indices
        if ((0, utils_1.checkInGameBounds)(from) && (0, utils_1.checkInGameBounds)(to)) {
            // Get the values at from and to indices
            const valueFrom = this.cells[from].letterValue;
            const pieceFrom = this.cells[from].piece;
            this.cells[to].letterValue = valueFrom;
            this.cells[from].letterValue = '';
            this.cells[to].piece = pieceFrom;
            this.cells[from].piece = null;
            if (pieceFrom) {
                pieceFrom.changeIndex(to, this);
            }
            // this.logPieces();
        }
    }
    logGrid() {
        // Log the grid for debugging purposes
        console.log(this.cells.map((cell) => cell.letterValue));
    }
    logPieces() {
        // Log the grid for debugging purposes
        console.log(this.cells.map((cell) => cell.piece));
    }
}
exports.default = Grid;

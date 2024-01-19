"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const defaultPiece_1 = __importDefault(require("../pieces/defaultPiece"));
const diagonal_move_1 = __importDefault(require("./diagonal_move"));
const pawnDiagonalMoveComponent = ({ startPosition, pieceColor, grid, range, directions, moved }) => {
    const real_move_range = 1;
    // Annotate the type of pawnDirections
    const pawnDirections = pieceColor === 'white' ? ['up-left', 'up-right'] : ['down-left', 'down-right'];
    let possibleMoves = (0, diagonal_move_1.default)({
        startPosition,
        pieceColor,
        grid,
        range: real_move_range,
        directions: pawnDirections,
        moved
    });
    const filteredMoves = possibleMoves.filter((move) => {
        const cellValue = grid.getPieceAtIndex(move);
        // Filter out values that are either null, undefined, or empty strings
        return cellValue !== null && cellValue !== undefined && !(cellValue instanceof defaultPiece_1.default);
    });
    return filteredMoves;
};
exports.default = pawnDiagonalMoveComponent;

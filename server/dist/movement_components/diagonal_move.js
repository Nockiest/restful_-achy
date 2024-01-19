"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const diagonalMovesComponent = ({ startPosition, pieceColor, grid, range = 8, directions = ['up-left', 'up-right', 'down-left', 'down-right'], }) => {
    if (!range) {
        console.error('You forgot to add range');
        return [];
    }
    const row = Math.floor(startPosition / 8);
    const col = startPosition % 8;
    const possibleMoves = [];
    // Define specific direction offsets
    const directionOffsets = {
        'up-left': [-1, -1],
        'up-right': [-1, 1],
        'down-left': [1, -1],
        'down-right': [1, 1],
    };
    directions.forEach((direction) => {
        var _a, _b;
        // Check if the direction is valid
        if (directionOffsets[direction]) {
            const [rowOffset, colOffset] = directionOffsets[direction];
            for (let i = 1; i <= range; i++) {
                const newRow = row + i * rowOffset;
                const newCol = col + i * colOffset;
                if (newRow < 0 || newRow >= 8 || newCol < 0 || newCol >= 8) {
                    break;
                }
                const index = newRow * 8 + newCol;
                if (grid.cells[index].piece !== null &&
                    grid.cells[index].piece !== undefined) {
                    const pieceLetter = (_b = (_a = grid === null || grid === void 0 ? void 0 : grid.cells[index]) === null || _a === void 0 ? void 0 : _a.piece) === null || _b === void 0 ? void 0 : _b.abbreviation;
                    if (!pieceLetter) {
                        console.error("PIECE DOESN'T EXIST", grid.cells[index]);
                        break;
                    }
                    const attackedPieceColor = pieceLetter.toLowerCase() === pieceLetter ? 'black' : 'white';
                    if (attackedPieceColor !== pieceColor) {
                        possibleMoves.push(index);
                        break;
                    }
                    else {
                        break;
                    }
                }
                else {
                    possibleMoves.push(index);
                }
            }
        }
        else {
            console.error(`Invalid direction: ${direction} ${directions} ${Object.keys(directionOffsets)}`);
        }
    });
    return possibleMoves;
};
exports.default = diagonalMovesComponent;

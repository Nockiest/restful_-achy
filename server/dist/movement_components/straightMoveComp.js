"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const straightMovesComponent = ({ startPosition, pieceColor, grid, range, directions = ["up", "down", "left", "right"], }) => {
    const row = Math.floor(startPosition / 8);
    const col = startPosition % 8;
    const possibleMoves = [];
    // Define specific direction offsets
    const directionOffsets = {
        up: { row: -1, col: 0 },
        down: { row: 1, col: 0 },
        left: { row: 0, col: -1 },
        right: { row: 0, col: 1 },
    };
    // Use a default value (e.g., 100000) if range is null
    const validRange = range !== null && range !== void 0 ? range : 100000;
    directions.forEach((direction) => {
        var _a, _b;
        // Check if the direction is valid
        if (directionOffsets[direction]) {
            const { row: rowOffset, col: colOffset } = directionOffsets[direction];
            for (let i = 1; i <= validRange; i++) {
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
                    const attackedPieceColor = pieceLetter.toLowerCase() === pieceLetter ? "black" : "white";
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
            console.error(`Invalid direction: ${direction}`);
        }
    });
    console.log(startPosition, possibleMoves);
    return possibleMoves;
};
exports.default = straightMovesComponent;

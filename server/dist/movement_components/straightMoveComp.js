"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const straightMovesComponent = (startPosition, pieceColor, grid, range = 8, directions = ['up', 'down', 'left', 'right']) => {
    const row = Math.floor(startPosition / 8);
    const col = startPosition % 8;
    const possibleMoves = [];
    const directionOffsets = {
        up: { row: -1, col: 0 },
        down: { row: 1, col: 0 },
        left: { row: 0, col: -1 },
        right: { row: 0, col: 1 },
    };
    directions.forEach((direction) => {
        var _a, _b;
        const { row: rowOffset, col: colOffset } = directionOffsets[direction];
        for (let i = 1; i <= range; i++) {
            const newRow = row + i * rowOffset;
            const newCol = col + i * colOffset;
            if (newRow < 0 || newRow >= 8 || newCol < 0 || newCol >= 8) {
                break;
            }
            const index = newRow * 8 + newCol;
            //   const cellValue = grid.cells[index].letterValue;
            // Check if grid.cells[index].piece is not null or undefined
            if (grid.cells[index].piece !== null && grid.cells[index].piece !== undefined) {
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
    });
    console.log(startPosition, possibleMoves);
    return possibleMoves;
};
exports.default = straightMovesComponent;

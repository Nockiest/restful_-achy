"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Piece {
    constructor(color, index, directions = ["up", "down", "left", "right", 'up-left', 'up-right', 'down-left', 'down-right']) {
        this.color = color;
        this.index = index;
        this.moved = false;
        this.range = null;
        this.abbreviation = color === 'white' ? 'X' : 'x';
        this.movementFunctions = [];
        this.directions = directions;
    }
    changeIndex(targetPosition, grid) {
        this.index = targetPosition;
        this.moved = true;
    }
    getIndex() {
        return this.index;
    }
    changeAbbreviationBasedOnColor() {
        // This function will change the abbreviation to uppercase when the piece is white
        if (this.color === "white") {
            this.abbreviation = this.abbreviation.toUpperCase();
        }
    }
    canMove(targetPosition, grid) {
        for (const movementFunction of this.movementFunctions) {
            if (movementFunction({ startPosition: this.index, pieceColor: this.color, grid: grid, range: this.range, directions: this.directions, moved: this.moved }).indexOf(targetPosition) !== -1) {
                return true;
            }
        }
        return false;
    }
}
exports.default = Piece;
// class OneMoveForwardComponent {
//   canMove(currentPosition: BoardIndex, targetPosition: BoardIndex) {
//     const { row, column } = indexToCoords(currentPosition, 8);
//     const { row: targetRow, column: targetColumn } = indexToCoords(targetPosition, 8);
//     return (
//       Math.abs(targetRow - row) === 1 &&
//       targetColumn === column
//     );
//   }
// }
// class DiagonalMovementComponent {
//   canMove(currentPosition: BoardIndex, targetPosition: BoardIndex) {
//     const { row, column } = indexToCoords(currentPosition, 8);
//     const { row: targetRow, column: targetColumn } = indexToCoords(targetPosition, 8);
//     return (
//       Math.abs(targetRow - row) === 1 &&
//       Math.abs(targetColumn - column) === 1
//     );
//   }
// }
// class LShapeMoveComponent {
//   canMove(currentPosition: BoardIndex, targetPosition: BoardIndex) {
//     const { row, column } = indexToCoords(currentPosition, 8);
//     const { row: targetRow, column: targetColumn } = indexToCoords(targetPosition, 8);
//     return (
//       (Math.abs(targetRow - row) === 2 &&
//         Math.abs(targetColumn - column) === 1) ||
//       (Math.abs(targetRow - row) === 1 &&
//         Math.abs(targetColumn - column) === 2)
//     );
//   }
// }

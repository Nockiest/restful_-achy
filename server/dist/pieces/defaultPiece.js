"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
class Piece {
    constructor(color, index) {
        this.color = color;
        this.index = index;
        this.moved = false;
        this.abbreviation = color === 'white' ? 'X' : 'x';
        this.movementFunctions = [];
    }
    changeAbbreviationBasedOnColor() {
        // This function will change the abbreviation to uppercase when the piece is white
        if (this.color === "white") {
            this.abbreviation = this.abbreviation.toUpperCase();
        }
    }
    canMove(targetPosition, grid) {
        for (const movementFunction of this.movementFunctions) {
            if (movementFunction(this.index, this.color, grid, 8).indexOf(targetPosition) !== -1) {
                console.log('xxxxxx', movementFunction(targetPosition, this.color, grid, 8).indexOf(targetPosition), ' ', movementFunction(targetPosition, this.color, grid, 8));
                return true;
            }
        }
        return false;
    }
}
exports.default = Piece;
class OneMoveForwardComponent {
    canMove(currentPosition, targetPosition) {
        const { row, column } = (0, utils_1.indexToCoords)(currentPosition, 8);
        const { row: targetRow, column: targetColumn } = (0, utils_1.indexToCoords)(targetPosition, 8);
        return (Math.abs(targetRow - row) === 1 &&
            targetColumn === column);
    }
}
class DiagonalMovementComponent {
    canMove(currentPosition, targetPosition) {
        const { row, column } = (0, utils_1.indexToCoords)(currentPosition, 8);
        const { row: targetRow, column: targetColumn } = (0, utils_1.indexToCoords)(targetPosition, 8);
        return (Math.abs(targetRow - row) === 1 &&
            Math.abs(targetColumn - column) === 1);
    }
}
class LShapeMoveComponent {
    canMove(currentPosition, targetPosition) {
        const { row, column } = (0, utils_1.indexToCoords)(currentPosition, 8);
        const { row: targetRow, column: targetColumn } = (0, utils_1.indexToCoords)(targetPosition, 8);
        return ((Math.abs(targetRow - row) === 2 &&
            Math.abs(targetColumn - column) === 1) ||
            (Math.abs(targetRow - row) === 1 &&
                Math.abs(targetColumn - column) === 2));
    }
}

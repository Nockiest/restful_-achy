import Grid from "../grid/grid";
import { diagonalDirections, straightDirections } from "../types/movementTypes";
import { PlayerColor, BoardIndex, MovementComponent } from "../types/types";
import { indexToCoords } from "../utils";

export default class Piece {
  color: PlayerColor;
  index: BoardIndex;
  moved: boolean;
  abbreviation: string;
  movementFunctions: Array<MovementComponent>;
  range : number|null;
  directions:Array<straightDirections | diagonalDirections>;
  constructor(color: PlayerColor, index: BoardIndex, directions:Array<straightDirections | diagonalDirections> =["up", "down", "left", "right", 'up-left', 'up-right', 'down-left', 'down-right']   ) {
    this.color = color;
    this.index = index;
    this.moved = false;
    this.range = null
    this.abbreviation =  color === 'white' ? 'X' : 'x';
    this.movementFunctions = [];
    this.directions = directions
  }

  changeAbbreviationBasedOnColor() {
    // This function will change the abbreviation to uppercase when the piece is white
    if (this.color === "white") {
      this.abbreviation = this.abbreviation.toUpperCase();
    }
  }
  canMove(targetPosition: BoardIndex, grid: Grid) {
    for (const movementFunction of this.movementFunctions) {
      if (movementFunction({startPosition:this.index, pieceColor:this.color, grid:grid, range:this.range, directions:this.directions}).indexOf(targetPosition) !== -1) {
        
        return true;
      }
    }
    return false;
  }
}

class OneMoveForwardComponent {
  canMove(currentPosition: BoardIndex, targetPosition: BoardIndex) {
    const { row, column } = indexToCoords(currentPosition, 8);
    const { row: targetRow, column: targetColumn } = indexToCoords(targetPosition, 8);
    return (
      Math.abs(targetRow - row) === 1 &&
      targetColumn === column
    );
  }
}

class DiagonalMovementComponent {
  canMove(currentPosition: BoardIndex, targetPosition: BoardIndex) {
    const { row, column } = indexToCoords(currentPosition, 8);
    const { row: targetRow, column: targetColumn } = indexToCoords(targetPosition, 8);
    return (
      Math.abs(targetRow - row) === 1 &&
      Math.abs(targetColumn - column) === 1
    );
  }
}

class LShapeMoveComponent {
  canMove(currentPosition: BoardIndex, targetPosition: BoardIndex) {
    const { row, column } = indexToCoords(currentPosition, 8);
    const { row: targetRow, column: targetColumn } = indexToCoords(targetPosition, 8);

    return (
      (Math.abs(targetRow - row) === 2 &&
        Math.abs(targetColumn - column) === 1) ||
      (Math.abs(targetRow - row) === 1 &&
        Math.abs(targetColumn - column) === 2)
    );
  }
}

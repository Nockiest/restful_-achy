import { PlayerColor, BoardIndex } from "../types/types";

export default class Piece {
  color: PlayerColor;
  index: BoardIndex;
  moved: boolean;
  abbreviation: string;
  movementFunctions: ((currentPosition: Position, targetPosition: Position) => boolean)[];

  constructor(color: PlayerColor, index: BoardIndex) {
    this.color = color;
    this.index = index;
    this.moved = false;
    this.abbreviation = "X";
    this.movementFunctions = [];
  }

  changeAbbreviationBasedOnColor() {
    // This function will change the abbreviation to uppercase when the piece is white
    if (this.color === "white") {
      this.abbreviation = this.abbreviation.toUpperCase();
    }
  }

  addMovementComponent(component: (currentPosition: Position, targetPosition: Position) => boolean) {
    this.movementFunctions.push(component);
  }

  canMove(targetPosition: Position, board: any) {
    for (const movementFunction of this.movementFunctions) {
      if (movementFunction({ row: this.index / 8, column: this.index % 8 }, targetPosition)) {
        return true;
      }
    }
    return false;
  }
}

interface Position {
  row: number;
  column: number;
}

class OneMoveForwardComponent {
  canMove(currentPosition: Position, targetPosition: Position) {
    return (
      Math.abs(targetPosition.row - currentPosition.row) === 1 &&
      targetPosition.column === currentPosition.column
    );
  }
}

class DiagonalMovementComponent {
  canMove(currentPosition: Position, targetPosition: Position) {
    return (
      Math.abs(targetPosition.row - currentPosition.row) === 1 &&
      Math.abs(targetPosition.column - currentPosition.column) === 1
    );
  }
}

class LShapeMoveComponent {
  canMove(currentPosition: Position, targetPosition: Position) {
    return (
      (Math.abs(targetPosition.row - currentPosition.row) === 2 &&
        Math.abs(targetPosition.column - currentPosition.column) === 1) ||
      (Math.abs(targetPosition.row - currentPosition.row) === 1 &&
        Math.abs(targetPosition.column - currentPosition.column) === 2)
    );
  }
}

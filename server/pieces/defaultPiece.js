export default class Piece {
    constructor(color, index) {
      this.color = color;
      this.index = index
      this.moved = false
      this.abreviation = "X"
      this.movementFunctions = [];
    }
  
    addMovementComponent(component) {
      this.movementFunctions.push(component);
    }
  
    canMove(targetPosition, board) {
      for (const movementFunction of this.movementFunctions) {
        if (movementFunction(this.index, this.color, board  )){
          return true
        }
        // if (component.canMove(this.index, targetPosition)) {
        //   return true;
        // }
      }
      return false;
    }
  }
  
  class OneMoveForwardComponent {
    canMove(currentPosition, targetPosition) {
      // Logic to check if the piece can move one square forward
      // Example: Check if the target position is one row forward
      return (
        Math.abs(targetPosition.row - currentPosition.row) === 1 &&
        targetPosition.column === currentPosition.column
      );
    }
  }
  
  class DiagonalMovementComponent {
    canMove(currentPosition, targetPosition) {
      // Logic to check if the piece can move diagonally
      // Example: Check if the target position is one row and one column away
      return (
        Math.abs(targetPosition.row - currentPosition.row) === 1 &&
        Math.abs(targetPosition.column - currentPosition.column) === 1
      );
    }
  }
  
  class LShapeMoveComponent {
    canMove(currentPosition, targetPosition) {
      // Logic to check if the piece can move in an L-shape
      // Example: Check if the target position is two rows and one column away or one row and two columns away
      return (
        (Math.abs(targetPosition.row - currentPosition.row) === 2 &&
          Math.abs(targetPosition.column - currentPosition.column) === 1) ||
        (Math.abs(targetPosition.row - currentPosition.row) === 1 &&
          Math.abs(targetPosition.column - currentPosition.column) === 2)
      );
    }
  }
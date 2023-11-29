"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Piece = /** @class */ (function () {
    function Piece(color, index) {
        this.color = color;
        this.index = index;
        this.moved = false;
        this.abreviation = "X";
        this.movementFunctions = [];
    }
    Piece.prototype.changeAbreviationBasedOnColor = function () {
        // this fc willchange the abreviation to uppercase when the piece is white
    };
    Piece.prototype.addMovementComponent = function (component) {
        this.movementFunctions.push(component);
    };
    Piece.prototype.canMove = function (targetPosition, board) {
        for (var _i = 0, _a = this.movementFunctions; _i < _a.length; _i++) {
            var movementFunction = _a[_i];
            if (movementFunction(this.index, this.color, board)) {
                return true;
            }
            // if (component.canMove(this.index, targetPosition)) {
            //   return true;
            // }
        }
        return false;
    };
    return Piece;
}());
exports.default = Piece;
var OneMoveForwardComponent = /** @class */ (function () {
    function OneMoveForwardComponent() {
    }
    OneMoveForwardComponent.prototype.canMove = function (currentPosition, targetPosition) {
        // Logic to check if the piece can move one square forward
        // Example: Check if the target position is one row forward
        return (Math.abs(targetPosition.row - currentPosition.row) === 1 &&
            targetPosition.column === currentPosition.column);
    };
    return OneMoveForwardComponent;
}());
var DiagonalMovementComponent = /** @class */ (function () {
    function DiagonalMovementComponent() {
    }
    DiagonalMovementComponent.prototype.canMove = function (currentPosition, targetPosition) {
        // Logic to check if the piece can move diagonally
        // Example: Check if the target position is one row and one column away
        return (Math.abs(targetPosition.row - currentPosition.row) === 1 &&
            Math.abs(targetPosition.column - currentPosition.column) === 1);
    };
    return DiagonalMovementComponent;
}());
var LShapeMoveComponent = /** @class */ (function () {
    function LShapeMoveComponent() {
    }
    LShapeMoveComponent.prototype.canMove = function (currentPosition, targetPosition) {
        // Logic to check if the piece can move in an L-shape
        // Example: Check if the target position is two rows and one column away or one row and two columns away
        return ((Math.abs(targetPosition.row - currentPosition.row) === 2 &&
            Math.abs(targetPosition.column - currentPosition.column) === 1) ||
            (Math.abs(targetPosition.row - currentPosition.row) === 1 &&
                Math.abs(targetPosition.column - currentPosition.column) === 2));
    };
    return LShapeMoveComponent;
}());

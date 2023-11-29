"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var diagonalMovesComponent = function (position, pieceColor, board, range, directions) {
    if (range === void 0) { range = 8; }
    if (directions === void 0) { directions = ['up-left', 'up-right', 'down-left', 'down-right']; }
    var row = Math.floor(position / 8);
    var col = position % 8;
    var possibleMoves = [];
    var directionOffsets = {
        'up-left': [-1, -1],
        'up-right': [-1, 1],
        'down-left': [1, -1],
        'down-right': [1, 1]
    };
    directions.forEach(function (direction) {
        var _a = directionOffsets[direction], rowOffset = _a[0], colOffset = _a[1];
        for (var i = 1; i <= range; i++) {
            var newRow = row + i * rowOffset;
            var newCol = col + i * colOffset;
            if (newRow < 0 || newRow >= 8 || newCol < 0 || newCol >= 8) {
                break;
            }
            var index = newRow * 8 + newCol;
            var cellValue = board.cells[index].value;
            // console.log("X", board.cells[index], " ",cellValue, board.cells[index].piece)
            if (board.cells[index].piece === null) {
                possibleMoves.push(index);
                continue;
            }
            var pieceLetter = board.cells[index].piece.abreviation;
            // console.log(pieceLetter)
            var attackedPieceColor = pieceLetter.toLowerCase() === pieceLetter ? 'black' : 'white';
            console.log(attackedPieceColor, pieceColor);
            if (attackedPieceColor !== pieceColor) {
                possibleMoves.push(index);
                break;
            }
            else {
                break;
            }
        }
    });
    console.log(possibleMoves);
    return possibleMoves;
};
exports.default = diagonalMovesComponent;

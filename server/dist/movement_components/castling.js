"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const straightMoveComp_1 = __importDefault(require("./straightMoveComp"));
const castlingComponent = ({ startPosition, pieceColor, grid, range, directions = ["left", "right"], moved, }) => {
    if (moved) {
        return [];
    }
    let edgePieces = pieceColor == "white"
        ? [grid.getPieceAtIndex(56), grid.getPieceAtIndex(63)]
        : [grid.getPieceAtIndex(0), grid.getPieceAtIndex(8)];
    let longCastleRook = pieceColor == "white" ? grid.getPieceAtIndex(56) : grid.getPieceAtIndex(0);
    let shortCastleRook = pieceColor == "white" ? grid.getPieceAtIndex(63) : grid.getPieceAtIndex(7);
    let longCastleTargets = pieceColor == "white" ? [57, 58] : [1, 2];
    let shortCastleTargets = pieceColor == "white" ? [62, 61] : [6, 5];
    let freeSpaces = (0, straightMoveComp_1.default)({
        startPosition,
        pieceColor,
        grid,
        range: 3,
        directions,
        moved,
    });
    function checkIsCorrectRook(pieceColor, rook) {
        console.log(rook);
        if (rook === null || rook === undefined) {
            return false;
        }
        const correctString = pieceColor == "white" ? "R" : "r";
        if (rook != correctString) {
            return false;
        }
        return true;
    }
    // calculate left castle
    function checkLongCastle() {
        console.log(pieceColor, ' xxx', freeSpaces.indexOf(shortCastleTargets[0]), freeSpaces, longCastleTargets[0], checkIsCorrectRook(pieceColor, longCastleRook));
        if (!checkIsCorrectRook(pieceColor, longCastleRook)) {
            console.log('a');
            return false;
        }
        if (freeSpaces.indexOf(longCastleTargets[0]) == -1) {
            console.log('b');
            return false;
        }
        return true;
    }
    function checkShortCastle() {
        if (!checkIsCorrectRook(pieceColor, shortCastleRook)) {
            console.log(1);
            return false;
        }
        if (freeSpaces.indexOf(shortCastleTargets[0]) == -1) {
            console.log(2);
            return false;
        }
        return true;
    }
    console.log(longCastleRook);
    let possibleMoves = [];
    if (checkLongCastle()) {
        possibleMoves.push(longCastleTargets[0]);
    }
    if (checkShortCastle()) {
        possibleMoves.push(shortCastleTargets[0]);
    }
    console.log("possible castling moves", startPosition, possibleMoves, freeSpaces);
    return possibleMoves;
};
exports.default = castlingComponent;
//   let longCastleBetweenPieces = "white"
//     ? [
//         grid.getPieceAtIndex(57),
//         grid.getPieceAtIndex(58),
//         grid.getPieceAtIndex(59),
//       ]
//     : [
//         grid.getPieceAtIndex(1),
//         grid.getPieceAtIndex(2),
//         grid.getPieceAtIndex(3),
//       ];
//   let shortCastleBetweenPieces = "white"
//     ? [grid.getPieceAtIndex(61), grid.getPieceAtIndex(62)]
//     : [grid.getPieceAtIndex(5), grid.getPieceAtIndex(6)];

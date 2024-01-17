"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const straightMoveComp_1 = __importDefault(require("./straightMoveComp"));
const pawnStraightMoveComponent = ({ startPosition, pieceColor, grid, range, directions, moved }) => {
    const real_move_range = moved ? 1 : 2;
    let possibleMoves = (0, straightMoveComp_1.default)({
        startPosition,
        pieceColor,
        grid,
        range: real_move_range,
        directions: pieceColor == 'white' ? ["up"] : ["down"],
        moved
    });
    console.log('possible straight moves', startPosition, possibleMoves);
    return possibleMoves;
};
exports.default = pawnStraightMoveComponent;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const defaultPiece_1 = __importDefault(require("../../pieces/defaultPiece"));
class CastlingExecutor extends defaultPiece_1.default {
    constructor(color, index, directions, startingPosition) {
        super(color, index, directions);
        this.validCastlingPosition = startingPosition;
    }
    executeCastle(grid, ownerPiece, accompanyingPiece, targetPositions) {
        grid.makeMove(this.index, targetPositions[0]);
        accompanyingPiece.participateCastle(grid, targetPositions[1]);
    }
    participateCastle(grid, targetPosition) {
        grid.makeMove(this.index, targetPosition);
    }
}
exports.default = CastlingExecutor;

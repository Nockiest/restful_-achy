"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CastlingCompanion = void 0;
const defaultPiece_1 = __importDefault(require("../../pieces/defaultPiece"));
class CastlingExecutor extends defaultPiece_1.default {
    constructor(color, index) {
        super(color, index);
        this.validCastlingPosition = index;
        this.castlingPatterns = {
            longCastle: {
                targetPositions: this.color == "white" ? [57, 58] : [1, 2],
                otherPiecePosition: this.color == "white" ? 56 : 0,
            },
            shortCastle: {
                targetPositions: this.color == "white" ? [57, 58] : [1, 2],
                otherPiecePosition: this.color == "white" ? 63 : 0,
            },
        };
    }
    executeCastle(grid, pattern, accompanyingPiece) {
        grid.makeMove(this.getIndex(), pattern.targetPositions[0]);
        accompanyingPiece.participateCastle(grid, pattern.targetPositions[1]);
    }
    changeIndex(to, grid) {
        super.changeIndex(to, grid);
        if (this.moved) {
            return;
        }
        const castlingPattern = this.getCastlingPattern(this.getIndex(), to);
        if (!castlingPattern) {
            return;
        }
        const accompanyingPiece = grid.getPieceAtIndex(castlingPattern.otherPieceCurPosition);
        if (accompanyingPiece instanceof CastlingCompanion) {
            this.executeCastle(grid, castlingPattern, accompanyingPiece);
        }
    }
    participateCastle(grid, targetPosition) {
        grid.makeMove(this.getIndex(), targetPosition);
    }
    getCastlingPattern(from, to) {
        if (this.moved) {
            return null;
        }
        if (from - to === 2) {
            return {
                targetPositions: this.color == "white" ? [57, 58] : [1, 2],
                otherPieceCurPosition: this.color == "white" ? 56 : 0,
            };
        }
        else if (from - to === -2) {
            return {
                targetPositions: this.color == "white" ? [57, 58] : [1, 2],
                otherPieceCurPosition: this.color == "white" ? 63 : 0,
            };
        }
        else {
            return null;
        }
    }
}
exports.default = CastlingExecutor;
class CastlingCompanion extends defaultPiece_1.default {
    participateCastle(grid, targetPosition) {
        grid.makeMove(this.getIndex(), targetPosition);
    }
}
exports.CastlingCompanion = CastlingCompanion;

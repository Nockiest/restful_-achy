"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const castlingExecutrer_1 = require("../movement_components/castling/castlingExecutrer");
const straightMoveComp_1 = __importDefault(require("../movement_components/straightMoveComp"));
class Rook extends castlingExecutrer_1.CastlingCompanion {
    constructor(color, index) {
        super(color, index);
        // Object.assign(this, Piece, CastlingExecutor);
        this.abbreviation = color === 'white' ? 'R' : 'r';
        this.movementFunctions.push(straightMoveComp_1.default);
        this.directions = ["up", "down", "left", "right"];
    }
}
exports.default = Rook;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const diagonal_move_1 = __importDefault(require("../movement_components/diagonal_move"));
const straightMoveComp_1 = __importDefault(require("../movement_components/straightMoveComp"));
const defaultPiece_1 = __importDefault(require("./defaultPiece"));
class Pawn extends defaultPiece_1.default {
    constructor(color, index) {
        super(color, index);
        this.directions = color === 'white' ? ['up', 'up-left', 'up-right'] : ['down', 'down-left', 'down-right'];
        this.abbreviation = color === 'white' ? 'P' : 'p';
        this.movementFunctions.push(straightMoveComp_1.default, diagonal_move_1.default);
        this.range = 1;
    }
}
exports.default = Pawn;

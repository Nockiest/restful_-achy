"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const diagonal_move_1 = __importDefault(require("../movement_components/diagonal_move"));
const defaultPiece_1 = __importDefault(require("./defaultPiece"));
class Bishop extends defaultPiece_1.default {
    constructor(color, index) {
        super(color, index);
        this.abbreviation = color === 'white' ? 'B' : 'b';
        this.movementFunctions.push(diagonal_move_1.default);
        this.directions = ['up-left', 'up-right', 'down-left', 'down-right'];
    }
}
exports.default = Bishop;

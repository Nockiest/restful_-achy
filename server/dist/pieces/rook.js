"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const straightMoveComp_1 = __importDefault(require("../movement_components/straightMoveComp"));
const defaultPiece_1 = __importDefault(require("./defaultPiece"));
class Rook extends defaultPiece_1.default {
    constructor(color, index) {
        super(color, index);
        this.abbreviation = color === 'white' ? 'R' : 'r';
        this.movementFunctions.push(straightMoveComp_1.default);
    }
}
exports.default = Rook;

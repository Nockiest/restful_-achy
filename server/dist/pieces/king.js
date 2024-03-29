"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const castling_1 = __importDefault(require("../movement_components/castling/castling"));
const castlingExecutrer_1 = __importDefault(require("../movement_components/castling/castlingExecutrer"));
const diagonal_move_1 = __importDefault(require("../movement_components/diagonal_move"));
const straightMoveComp_1 = __importDefault(require("../movement_components/straightMoveComp"));
class King extends castlingExecutrer_1.default {
    constructor(color, index) {
        super(color, index);
        this.abbreviation = color === 'white' ? 'K' : 'k';
        this.movementFunctions.push(diagonal_move_1.default, straightMoveComp_1.default, castling_1.default);
        this.range = 1;
    }
}
exports.default = King;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const l_shape_move_1 = __importDefault(require("../movement_components/l_shape_move"));
const defaultPiece_1 = __importDefault(require("./defaultPiece"));
class Knight extends defaultPiece_1.default {
    constructor(color, index) {
        super(color, index);
        this.abbreviation = color === 'white' ? 'N' : 'n';
        this.movementFunctions.push(l_shape_move_1.default);
    }
}
exports.default = Knight;

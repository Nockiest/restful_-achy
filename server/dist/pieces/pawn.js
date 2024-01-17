"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pawn_diagonal_component_1 = __importDefault(require("../movement_components/pawn_diagonal_component"));
const pawn_foward_component_1 = __importDefault(require("../movement_components/pawn_foward_component"));
const defaultPiece_1 = __importDefault(require("./defaultPiece"));
class Pawn extends defaultPiece_1.default {
    constructor(color, index) {
        super(color, index);
        this.directions = color === 'white' ? ['up', 'up-left', 'up-right'] : ['down', 'down-left', 'down-right'];
        this.abbreviation = color === 'white' ? 'P' : 'p';
        this.movementFunctions.push(pawn_diagonal_component_1.default, pawn_foward_component_1.default);
        this.range = 1;
    }
}
exports.default = Pawn;

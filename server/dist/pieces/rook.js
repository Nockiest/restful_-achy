"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const castlingExecutrer_1 = __importStar(require("../movement_components/castling/castlingExecutrer"));
const straightMoveComp_1 = __importDefault(require("../movement_components/straightMoveComp"));
const defaultPiece_1 = __importDefault(require("./defaultPiece"));
class Rook extends castlingExecutrer_1.CastlingCompanion {
    constructor(color, index) {
        super(color, index);
        Object.assign(this, defaultPiece_1.default, castlingExecutrer_1.default);
        this.abbreviation = color === 'white' ? 'R' : 'r';
        this.movementFunctions.push(straightMoveComp_1.default);
        this.directions = ["up", "down", "left", "right"];
    }
}
exports.default = Rook;

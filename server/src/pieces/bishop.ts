import diagonalMovesComponent from "../movement_components/diagonal_move";
import { PlayerColor, BoardIndex } from "../types/types";
import Piece from "./defaultPiece";

export default class Bishop extends Piece {
  constructor(color: PlayerColor, index: BoardIndex) {
    super(color, index);
    this.abbreviation = color === 'white' ? 'B' : 'b';
    this.movementFunctions.push(diagonalMovesComponent);
  }
}


import diagonalMovesComponent from "../movement_components/diagonal_move";
import straightMovesComponent from "../movement_components/straightMoveComp";
import { BoardIndex, PlayerColor } from "../types/types";
import Piece from "./defaultPiece";

export default class King extends Piece {
    constructor(color: PlayerColor, index: BoardIndex) {
      super(color, index);
      this.abbreviation = color === 'white' ? 'K' : 'k';
      this.movementFunctions.push(diagonalMovesComponent, straightMovesComponent);
      this.range = 1
    }
  }
  
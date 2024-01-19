
import castlingComponent from "../movement_components/castling/castling";
import CastlingExecutor from "../movement_components/castling/castlingExecutrer";
import diagonalMovesComponent from "../movement_components/diagonal_move";
import straightMovesComponent from "../movement_components/straightMoveComp";
import { BoardIndex, PlayerColor } from "../types/types";
import Piece from "./defaultPiece";

export default class King extends CastlingExecutor {
    constructor(color: PlayerColor, index: BoardIndex) {
      super(color, index);
      this.abbreviation = color === 'white' ? 'K' : 'k';
      this.movementFunctions.push(diagonalMovesComponent, straightMovesComponent, castlingComponent);
      this.range = 1
    }


  }

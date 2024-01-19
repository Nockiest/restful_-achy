import CastlingExecutor, { CastlingCompanion } from "../movement_components/castling/castlingExecutrer";
import knightMovesComponent from "../movement_components/l_shape_move";
import straightMovesComponent from "../movement_components/straightMoveComp";
import { BoardIndex, PlayerColor } from "../types/types";
import Piece from "./defaultPiece";

export default class Rook extends CastlingCompanion {
    constructor(color: PlayerColor, index: BoardIndex) {

      super(color, index);
      Object.assign(this, Piece, CastlingExecutor);
      this.abbreviation = color === 'white' ? 'R' : 'r';
      this.movementFunctions.push(straightMovesComponent );
      this.directions = ["up", "down", "left", "right" ]

    }


  }

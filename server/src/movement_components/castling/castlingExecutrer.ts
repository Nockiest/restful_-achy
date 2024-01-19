import { Direction } from "readline";
import Grid from "../../grid/grid";

import {
  BoardIndex,
  CastlingPositions,
  PieceType,
  PlayerColor,
} from "../../types/types";
import Piece from "../../pieces/defaultPiece";
import {
  CastlingPattern,
  diagonalDirections,
  straightDirections,
} from "../../types/movementTypes";
import King from "../../pieces/king";

export default class CastlingExecutor extends Piece {
  validCastlingPosition: BoardIndex;
  castlingPatterns: {
    longCastle: {
      targetPositions: number[];
      otherPiecePosition: number;
    };
    shortCastle: {
      targetPositions: number[];
      otherPiecePosition: number;
    };
  };
  constructor(
    color: PlayerColor,
    index: BoardIndex,

  ) {
    super(color, index  );
    this.validCastlingPosition = index;
    this.castlingPatterns = {
      longCastle: {
        targetPositions: this.color == "white" ? [57, 58] : [1, 2],
        otherPiecePosition: this.color == "white" ? 56 : 0,
      },
      shortCastle: {
        targetPositions: this.color == "white" ? [57, 58] : [1, 2],
        otherPiecePosition: this.color == "white" ? 63 : 0,
      },
    };
  }
 executeCastle(
  grid: Grid,
  pattern: CastlingPattern,
  accompanyingPiece: CastlingCompanion
) {
    console.log('patern',pattern)
//   grid.makeMove(this.getIndex(), pattern.targetPositions[0]);
  accompanyingPiece.participateCastle(grid, pattern.targetPositions[1]);
}

changeIndex(to: BoardIndex, grid: Grid) {

  const castlingPattern = this.getCastlingPattern(this.getIndex(), to);
  console.log('castling pattern', castlingPattern)
  if ( castlingPattern) {
    const accompanyingPiece = grid.getPieceAtIndex(
        castlingPattern.otherPieceCurPosition
      );
      if (accompanyingPiece instanceof CastlingCompanion) {
        this.executeCastle(grid, castlingPattern, accompanyingPiece);
      } else {
        console.log("Failed to find a valid accompanying piece for castling");
      }
  }

  super.changeIndex(to, grid);

}

  getCastlingPattern(from: BoardIndex, to: BoardIndex): CastlingPattern | null {
    console.log(from - to)
    if (Math.abs(from - to  )=== 3) {
      return {
        targetPositions: this.color == "white" ? [57, 58] : [1, 2],
        otherPieceCurPosition: this.color == "white" ? 56 : 0,
      };
    } else if (Math.abs(from - to  ) === 2) {
      return {
        targetPositions: this.color == "white" ? [62, 61] : [6, 5],
        otherPieceCurPosition: this.color == "white" ? 63 : 0,
      };
    } else {
      return null;
    }
  }
}

export class CastlingCompanion extends Piece {
  participateCastle(grid: Grid, targetPosition: BoardIndex) {
    grid.makeMove(this.getIndex(), targetPosition);
  }
}

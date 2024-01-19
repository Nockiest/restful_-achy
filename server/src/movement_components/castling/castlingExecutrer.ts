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
    grid.makeMove(this.getIndex(), pattern.targetPositions[0]);
    accompanyingPiece.participateCastle(grid, pattern.targetPositions[1]);
  }

  changeIndex(to: BoardIndex, grid: Grid) {
    super.changeIndex(to, grid);
    if (this.moved) {
      return;
    }
    const castlingPattern = this.getCastlingPattern(this.getIndex(), to);
    if (!castlingPattern) {
      return;
    }
    const accompanyingPiece = grid.getPieceAtIndex(
      castlingPattern.otherPieceCurPosition
    );
    if (accompanyingPiece instanceof CastlingCompanion) {
        this.executeCastle(grid, castlingPattern, accompanyingPiece);
      }
  }

  participateCastle(grid: Grid, targetPosition: BoardIndex) {
    grid.makeMove(this.getIndex(), targetPosition);
  }

  getCastlingPattern(from: BoardIndex, to: BoardIndex): CastlingPattern | null {
    if (this.moved) {
      return null;
    }
    if (from - to === 2) {
      return {
        targetPositions: this.color == "white" ? [57, 58] : [1, 2],
        otherPieceCurPosition: this.color == "white" ? 56 : 0,
      };
    } else if (from - to === -2) {
      return {
        targetPositions: this.color == "white" ? [57, 58] : [1, 2],
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

import { BoardIndex, CastlingPositions } from "./types";

export type straightDirections = "up"| "down"| "left"| "right"
export type diagonalDirections = 'up-left'| 'up-right'| 'down-left'| 'down-right'
export type Directions = Array<straightDirections | diagonalDirections>

export type  CastlingPattern  = {


    targetPositions: CastlingPositions;
    otherPieceCurPosition: BoardIndex;



  };

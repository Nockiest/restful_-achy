import { Direction } from "readline";
import Grid from "../../grid/grid";

import { BoardIndex, CastlingPositions, PieceType, PlayerColor } from "../../types/types";
import Piece from "../../pieces/defaultPiece";
import { diagonalDirections, straightDirections } from "../../types/movementTypes";

export default class CastlingExecutor extends Piece{
    validCastlingPosition: BoardIndex;


    constructor (color: PlayerColor, index: BoardIndex, directions:Array<straightDirections | diagonalDirections>  , startingPosition: BoardIndex){
        super(color , index , directions )
        this.validCastlingPosition = startingPosition
    }
    executeCastle(grid:Grid, ownerPiece:CastlingExecutor, accompanyingPiece: CastlingExecutor, targetPositions: CastlingPositions ){
                grid.makeMove(this.index, targetPositions[0] )
                accompanyingPiece.participateCastle(grid, targetPositions[1] )
    }

    participateCastle (grid:Grid, targetPosition: BoardIndex){
        grid.makeMove(this.index, targetPosition)
    }
}

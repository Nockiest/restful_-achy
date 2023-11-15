import diagonalMovesComponent from "../movement_components/diagonal_move.js";
import Piece from "./defaultPiece.js";

export default class Bishop extends Piece {
    constructor(color, index){
        super(color, index);
        this.abreviation = color === 'white'? 'B':"b"
        this.movementFunctions.push(diagonalMovesComponent);
    }
}

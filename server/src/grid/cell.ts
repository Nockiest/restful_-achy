import Piece from "../pieces/defaultPiece";
import { PieceLetter } from "../types/types";

export default class Cell {
    readonly index: number;
     letterValue: PieceLetter|null;
     piece: Piece|undefined|null; // Adjust the type accordingly based on your Piece class or structure

    constructor(index: number, startValue: PieceLetter, piece:Piece|null  ) {
        this.index = index;
        this.letterValue = startValue;
        this.piece = piece;
    }

    changeValue(newValue: PieceLetter | null): void {
        // if (newValue === null) {
            
        //     console.log("DON'T CHANGE VALUE TO NULL");
        //     return;
        // }
    
        // if (typeof newValue !== "string") {
        //     console.log("DON'T CHANGE VALUE TO SOMETHING DIFFERENT THAN A STRING");
        //     return;
        // }
    
        this.letterValue = newValue;
    
        console.log("Value changed successfully", this.letterValue);
    }
}
import {PlayerColor} from './types/types.js'

export default class Player {
    private time: number;
    private missingPieces: any[] = []; // You might want to replace `any` with the actual type of your pieces
    private kingMoved: boolean = false;
    private leftRookMoved: boolean = false;
    private rightRookMoved: boolean = false;
    private color: PlayerColor
  
    constructor(gameTime: number, color: PlayerColor) {
      this.time = gameTime;
      this.color = color;
    }
  
    public updateTime(): void {
      this.time -= 1;
      // console.log("counting time", this.color, this.time );
      if (this.time <= 0) {
        console.log("TIME RAN OUT", this.time);
      }
    }
  }
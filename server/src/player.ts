import {PlayerColor} from './types/types.js'

export default class Player {
    private time: number;
    private missingPieces: any[] = []; // You might want to replace `any` with the actual type of your pieces
    private kingMoved: boolean = false;
    private leftRookMoved: boolean = false;
    private rightRookMoved: boolean = false;
    private color: PlayerColor
    private id: string|null
    constructor(gameTime: number, color: PlayerColor, id:string|null) {
      this.time = gameTime;
      this.color = color;
      this.id = id
    }

    public updateTime(): void {
      this.time -= 1;
      // console.log("counting time", this.color, this.time );
      if (this.time <= 0) {
        console.log("TIME RAN OUT", this.time);
      }
    }

    public getId():string|null{
      return this.id
    }

    public setId(newId:string){
      if (this.id === null){
        this.id = newId
      } else {
        return new Error ('trying to change an existing player')
      }
    }
  }
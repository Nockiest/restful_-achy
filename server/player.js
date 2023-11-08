export default class Player {
    constructor(gameTime, color) {
        this.time = gameTime;
        this.missingPieces = [];
        this.kingMoved = false;
        this.leftRookMoved = false;
        this.rightRookMoved = false;
        this.color = color;
    }

    updateTime() {
        this.time -= 1;
        // console.log("counting time", this.color, this.time );
        if (this.time <= 0) {
            console.log("TIME RAN OUT", this.time);
        }
    }
}

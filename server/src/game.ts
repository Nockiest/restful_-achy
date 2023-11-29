import Grid from "./grid/grid";
import Piece from "./pieces/defaultPiece";
import Player from "./player";
import { BoardIndex } from "./types/types";

export default class Game {
  private curPlayerIndex: number = 0;
  private grid: Grid;
  private gameTime: number;
  private players: Player[];
  private checkedPlayer: string = "none";
  private timeInterval: NodeJS.Timeout | null = null;
  private gameStarted: boolean = false;

  constructor(gameState: string[], gameTime: number) {
    this.grid = new Grid(8, 8, gameState);
    this.gameTime = gameTime;
    this.players = this.generatePlayers();
  }

  private generatePlayers(): Player[] {
    const whitePlayer = new Player(this.gameTime, "white");
    const blackPlayer = new Player(this.gameTime, "black");
    return [whitePlayer, blackPlayer];
  }

  get curPlayer(): Player {
    return this.players[this.curPlayerIndex];
  }

  private switchPlayer(): void {
    this.curPlayerIndex = 1 - this.curPlayerIndex; // Toggle between 0 and 1
  }

  private startCountingTime(): void {
    this.timeInterval = setInterval(() => {
      this.countTime();
    }, 1000);
  }

  private stopCountingTime(): void {
    if (this.timeInterval !== null) {
      clearInterval(this.timeInterval);
    }
  }

  private countTime(): void {
    this.curPlayer.updateTime();
  }

  public getBoard(): (Piece | null)[] {
    const board: (Piece | null)[] = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const cell = this.grid.getCellAtIndex(row * 8 + col);
        const piece = cell?.piece
          ? { piece: cell.piece.abbreviation, color: cell.piece.color }
          : null;
        board.push(piece);
      }
    }
    return board;
  }

  public beginGame(): void {
    console.log("BEGINNING GAME ");
    if (!this.gameStarted) {
      console.log("Game has begun!");
      this.startCountingTime();
      this.gameStarted = true;
    } else {
      console.log("The game has already started!");
    }
  }

  public checkMoveValid(from: BoardIndex, to: BoardIndex): boolean {
    console.log(from, to);
    const fromCell = this.grid.getCellAtIndex(from);
    if (fromCell.piece === null) {
      console.log("FROM PIECE NULL");
      return false;
    }
    const toCell = this.grid.getCellAtIndex(to);
    console.log("Making move ", fromCell, toCell);
    console.log("CAN MOVE? ", fromCell.piece.canMove(to, this.grid));
    // code for checking if movement is valid
    return true; //fromCell.piece.canMove(to, this.grid); // return if move is valid
  }

  public processValidMovement(from: number, to: number): void {
    // other code for movement
    this.grid.makeMove(from, to);
    this.switchPlayer(); // Switch to the next player after a valid move
  }
}

import { calculatePossibleMoves, findKings } from "../utils"
import { isKingInCheck } from "./CheckCalculator";
export const determineDraw = (board, curPayer,gameHistory, movedPieces,inCheck) => {
   let canMove = false
   // find the players pieces
   const playerPieces = getPlayerPieces(board, curPayer);
// for every piece find legal moves
  //  console.log(playerPieces)
// check if they put the the king in a check
for (let i = 0; i < playerPieces.length; i++) {
    const { piece, pieceIndex } = playerPieces[i];
    const pieceMoves = calculatePossibleMoves(
      pieceIndex,
      piece,
      board,
      gameHistory,
      movedPieces,
      inCheck
    );
    // console.log(pieceMoves)
    for (let j = 0; j < pieceMoves.length; j++) {
      const potentialMove = pieceMoves[j];
      
      let dummyBoard = JSON.parse(JSON.stringify(board)); // Reset dummyBoard to the original board state

      dummyBoard[Math.floor(potentialMove / 8)][potentialMove % 8] = piece;
      dummyBoard[Math.floor(pieceIndex / 8)][pieceIndex % 8] = "";
      const playerPieces = getPlayerPieces(dummyBoard, curPayer);
    const newKingPos = findKings(dummyBoard)[curPayer]
    
    const howIsKingAttacked = isKingInCheck(newKingPos, curPayer, dummyBoard, gameHistory,movedPieces, inCheck)
 
    if ( howIsKingAttacked) {
        // console.log(
        //   `Move ${potentialMove   }  ${ pieceIndex}${ piece}  ${howIsKingAttacked.enemy}   results in check.`  
        // );
        // console.log(dummyBoard)
      } else {
        canMove = true
        break
      }
    }
  }
  return canMove
//if at least one doesnt it isnt a draw
}

function getPlayerPieces(board, player) {
    const flatBoard = board.flat();
    const whitePiecesPositions = [];
    const blackPiecesPositions = [];
    for (let i = 0; i < flatBoard.length; i++) {
      const piece = flatBoard[i];
  
      if (piece !== "") {
        if (piece === piece.toLowerCase()) {
          blackPiecesPositions.push({
            piece,
            pieceIndex: i,
          });
        } else {
          whitePiecesPositions.push({
              piece,
              pieceIndex: i,
            });
        }
      }
    }
    return player === "black" ? blackPiecesPositions : whitePiecesPositions;
  } // funguje správně
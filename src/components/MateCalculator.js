import { isKingInCheck } from "./CheckCalculator";
import { calculatePossibleMoves, findKings } from "../utils";
export const determineMate = (board, checkedPlayer,gameHistory,movedPieces,inCheck) => {
     let canKingGetOutOfCheck = false
    //get players pieces on the board
    const playerPieces = getPlayerPieces(board, checkedPlayer);
     //for every one of them find legal moves
    // console.log(playerPieces)
     // check if they get the king out of mate
     for (let i = 0; i < playerPieces.length; i++) {
        const { piece, pieceIndex } = playerPieces[i];
        const pieceMoves = calculatePossibleMoves(
          pieceIndex,
          piece,
          board,
          gameHistory,
          movedPieces
        );
        // console.log(pieceMoves)
        for (let j = 0; j < pieceMoves.length; j++) {
          const potentialMove = pieceMoves[j];
          
          let dummyBoard = JSON.parse(JSON.stringify(board)); // Reset dummyBoard to the original board state
    
          dummyBoard[Math.floor(potentialMove / 8)][potentialMove % 8] = piece;
          dummyBoard[Math.floor(pieceIndex / 8)][pieceIndex % 8] = "";
          const playerPieces = getPlayerPieces(dummyBoard, checkedPlayer);
        const newKingPos = findKings(dummyBoard)[checkedPlayer]
        //   console.log(dummyBoard, isKingInCheck(newKingPos, checkedPlayer, dummyBoard, gameHistory), checkedPlayer)
        //   console.log(dummyBoard)
        const howIsKingAttacked = isKingInCheck(newKingPos, checkedPlayer, dummyBoard, gameHistory,movedPieces,inCheck)
        // console.log(howIsKingAttacked?.enemy)
        // console.log(howIsKingAttacked, dummyBoard  )  
        if ( howIsKingAttacked) {
            // console.log(
            //   `Move ${potentialMove   }  ${ pieceIndex}${ piece}  ${howIsKingAttacked.enemy}   results in check.`  
            // );
            // console.log(dummyBoard)
          } else {
            canKingGetOutOfCheck = true
            console.log("can get out of check ", canKingGetOutOfCheck)
            break
          }
        }
      }
      return canKingGetOutOfCheck
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
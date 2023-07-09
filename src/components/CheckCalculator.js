import { pieceColor, calculatePossibleMoves } from "../utils";

export const checkWhatGetsPlayerInCheck = (curBoard, player, gameHistory) => {
  // create an array of all the positions of the piece of player
  JSON.parse(JSON.stringify(curBoard));
  const playerPieces = getPlayerPieces(curBoard, player);

  // for each of them calculate where they wouly be able to move
  for (let i = 0; i < playerPieces.length; i++) {
    const { piece, pieceIndex } = playerPieces[i];
    const pieceMoves = calculatePossibleMoves(pieceIndex, piece, curBoard, gameHistory);

    for (let j = 0; j < pieceMoves.length; j++) {
      const potentialMove = pieceMoves[j];
      const clonedGameRep = JSON.parse(JSON.stringify(curBoard));
      clonedGameRep[Math.floor(potentialMove / 8)][potentialMove % 8] = piece;
      clonedGameRep[Math.floor(pieceIndex / 8)][pieceIndex % 8] = '';

      if (isKingInCheck(pieceIndex, pieceColor, curBoard, gameHistory)) {
        console.log(`Move ${piece} from ${pieceIndex} to ${potentialMove} results in check.`);
      }
    }
  }
  console.log(playerPieces);
};

// for each of them calculate where they wouly be able to move

// calculate wheter that moce gets the player in check

//return an array with the player pieces, each of them containing its position, mossible moves

const getPlayerPieces = (curBoard, player) => {
    curBoard = curBoard.flat();
  let playerPieces = [];

  for (let i = 0; i < curBoard.length; i++) {
    const piece = curBoard[i];
    if (piece == ""){continue}
    console.log(piece)
    const pieceColor = piece.toLowerCase() === piece ? "black" : "white"
    console.log(piece, pieceColor, player);
    const isPlayerPiece = player === pieceColor;
  
    if (isPlayerPiece) {
      playerPieces.push({
        piece,
        pieceIndex: i,
      });
    }
  }
  return playerPieces;
};

const checkIfAnyMovePossible = (
  kingColor,
  kingPosition,
  gameRepresentation,
  gameHistory
) => {
  const opponentColor = kingColor === "white" ? "black" : "white";
  console.log(isKingInCheck(kingPosition, opponentColor, gameRepresentation));
  const playerPieces = gameRepresentation
    .flat()
    .filter((piece) => pieceColor(piece) === kingColor);
  console.log(playerPieces);
  // Iterate through all player's pieces and check their potential moves
  for (let i = 0; i < playerPieces.length; i++) {
    const playerPiecePosition = gameRepresentation
      .flat()
      .findIndex((piece) => piece === playerPieces[i]);
    const playerPiecePotentialMoves = calculatePossibleMoves(
      playerPiecePosition,
      playerPieces[i],
      gameRepresentation,
      gameHistory
    );
    console.log(playerPiecePotentialMoves);
    // Iterate through all potential moves of the player's piece
    for (let j = 0; j < playerPiecePotentialMoves.length; j++) {
      const potentialMove = playerPiecePotentialMoves[j];
      const clonedGameRepresentation = JSON.parse(
        JSON.stringify(gameRepresentation)
      );

      // Simulate the potential move
      clonedGameRepresentation[Math.floor(potentialMove / 8)][
        potentialMove % 8
      ] = playerPieces[i];
      clonedGameRepresentation[Math.floor(playerPiecePosition / 8)][
        playerPiecePosition % 8
      ] = "";
      clonedGameRepresentation[0][5] = "";
      console.log(clonedGameRepresentation);

      // Check if the move makes the king move out of check

      const newKingPosition =
        kingPosition === playerPiecePosition ? potentialMove : kingPosition;
      if (
        !isKingInCheck(newKingPosition, opponentColor, clonedGameRepresentation)
      ) {
        return true; // At least one move is possible
      }
    }
  }

  return false; // No move is possible
};

const isKingInCheck = (kingPosition, kingColor, gameRepresentation,gameHistory) => {
  const opponentColor = kingColor === "white" ? "black" : "white";
  const flattenedRepresentation = Array.isArray(gameRepresentation)
    ? gameRepresentation.flat()
    : gameRepresentation;

  for (let index = 0; index < flattenedRepresentation.length; index++) {
    const piece = flattenedRepresentation[index];

    if (piece === "") continue;

    if (pieceColor(piece) === opponentColor) {
      const piecePosition = index;
      const pieceMoves = calculatePossibleMoves(
        piecePosition,
        piece,
        gameRepresentation,
        gameHistory
      );
      console.log(index, pieceMoves);
      if (pieceMoves.includes(kingPosition)) {
        return true;
      }
    }
  }

  return false;
};

//   const checkKingInCheck = (
//     kingsPosition,
//     gameRepresentation,
//     player,
//     gameHistory
//   ) => {
//     //  console.log(kingsPositions)
//     const kingInCheck = isKingInCheck(
//       kingsPosition.white,
//       player,
//       gameRepresentation,
//       gameHistory
//     );
//     // const isBlackKingInCheck = isKingInCheck(kingsPositions.black, 'black',gameRepresentation);
//     // console.log(isWhiteKingInCheck,isBlackKingInCheck)
//     // setWhoIsChecked({white: isWhiteKingInCheck, black: isBlackKingInCheck })
//     return kingInCheck;
//   };

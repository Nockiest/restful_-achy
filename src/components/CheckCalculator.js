import { pieceColor, calculatePossibleMoves, findKings } from "../utils";

let movedPieces = {};
export const checkWhatGetsPlayerInCheck = (
  curBoard,
  player,
  gameHistory,
  movedPiecesProp,
  inCheck
) => {
  // create an array of all the positions of the piece of player
  let illegalMoves = [];
  movedPieces = movedPiecesProp;

  const playerPieces = getPlayerPieces(curBoard, player);

  // for each of them calculate where they would be able to move
  for (let i = 0; i < playerPieces.length; i++) {
    const { piece, pieceIndex } = playerPieces[i];
    const pieceMoves = calculatePossibleMoves(
      pieceIndex,
      piece,
      curBoard,
      gameHistory,
      movedPieces,
      inCheck
    );

    for (let j = 0; j < pieceMoves.length; j++) {
      const potentialMove = pieceMoves[j];

      let dummyBoard = JSON.parse(JSON.stringify(curBoard)); // Reset dummyBoard to the original board state

      dummyBoard[Math.floor(potentialMove / 8)][potentialMove % 8] = piece;
      dummyBoard[Math.floor(pieceIndex / 8)][pieceIndex % 8] = "";
      const playerPieces = getPlayerPieces(dummyBoard, player);
      const newKingPos = findKings(dummyBoard)[player];

      const howIsKingAttacked = isKingInCheck(
        newKingPos,
        player,
        dummyBoard,
        gameHistory,
        movedPieces,
        inCheck
      );

      if (howIsKingAttacked) {
        console.log(
          `Move ${potentialMove}  ${pieceIndex}${piece}  ${howIsKingAttacked.enemy}   results in check.`
        );
        illegalMoves.push({ piece, move: potentialMove });
        // console.log(dummyBoard)
      }
    }
  }
  const kingPos = findKings(curBoard)[player];
  //   console.log(kingPos)
  // check if current position is also a check
  if (
    isKingInCheck(kingPos, player, curBoard, gameHistory, movedPieces, inCheck)
  ) {
    illegalMoves.push("king stands in check now");
  }

  return illegalMoves;
};

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

const checkIfAnyMovePossible = (
  kingColor,
  kingPosition,
  gameRepresentation,
  gameHistory,
  inCheck
) => {
  const opponentColor = kingColor === "white" ? "black" : "white";

  const playerPieces = gameRepresentation
    .flat()
    .filter((piece) => pieceColor(piece) === kingColor);

  // Iterate through all player's pieces and check their potential moves
  for (let i = 0; i < playerPieces.length; i++) {
    const playerPiecePosition = gameRepresentation
      .flat()
      .findIndex((piece) => piece === playerPieces[i]);
    const playerPiecePotentialMoves = calculatePossibleMoves(
      playerPiecePosition,
      playerPieces[i],
      gameRepresentation,
      gameHistory,
      movedPieces
    );
    // console.log(playerPiecePotentialMoves);
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
      //   console.log(clonedGameRepresentation);

      // Check if the move makes the king move out of check

      const newKingPosition =
        kingPosition === playerPiecePosition ? potentialMove : kingPosition;
      if (
        !isKingInCheck(
          newKingPosition,
          opponentColor,
          clonedGameRepresentation,
          movedPieces,
          inCheck
        )
      ) {
        return true; // At least one move is possible
      }
    }
  }

  return false; // No move is possible
};

export const isKingInCheck = (
  kingPosition,
  kingColor,
  gameRepresentation,
  gameHistory,
  movedPieces,
  inCheck
) => {
  const opponentColor = kingColor === "white" ? "black" : "white";
  const flattenedRepresentation = gameRepresentation.flat();
  const enemyPieces = getPlayerPieces(flattenedRepresentation, opponentColor);

  for (let enemy in enemyPieces) {
    const pieceMoves = calculatePossibleMoves(
      enemyPieces[enemy].pieceIndex,
      enemyPieces[enemy].piece,
      flattenedRepresentation,
      gameHistory,
      movedPieces,
      inCheck
    ); 
    if (pieceMoves.includes(kingPosition)) {
      // console.log(pieceMoves,  enemyPieces[enemy])
      return { enemy: enemyPieces[enemy].piece, pieceMoves };
    }
  }

  return false;
};

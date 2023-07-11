export const EvolvePawnPanel = ({ pawnToEvolveIndex, setPawnToEvolveIndex, gameRepresentation, setGameRepresentation, curPlayer, setCurPlayer }) => {
  const evolvablePieces = ["n", "q", "r", "b"];

  const handlePieceSelection = (letter) => {
    const pieceType = curPlayer === "white" ? letter.toUpperCase() : letter;
    const updatedGameRepresentation = [...gameRepresentation];

    const pawnsOfSameType = updatedGameRepresentation.flat().filter((piece) => piece === pieceType);
    const pieceCount = pawnsOfSameType.length;

    if (pawnToEvolveIndex >= 0 && pawnToEvolveIndex < 64) {
      const row = Math.floor(pawnToEvolveIndex / 8);
      const col = pawnToEvolveIndex % 8;

      updatedGameRepresentation[row][col] = pieceType + (pieceCount + 1);
    }

    // Perform any other necessary actions with the updated game representation
    console.log("Updated Game Representation:", updatedGameRepresentation);

    // Check if there are any pawns on the backrank
    const backrankPawnIndex = pawnReachedBackRank(updatedGameRepresentation);
    if (backrankPawnIndex === -1) {
      // No pawns on the backrank, update the game representation and set the current player
      setGameRepresentation(updatedGameRepresentation);
      setCurPlayer(curPlayer === "white" ? "black" : "white");
      setPawnToEvolveIndex(false)
    } else {
      console.log("There are still pawns on the backrank. Cannot switch player yet.");
    }
  };
console.log(pawnToEvolveIndex, typeof(pawnToEvolveIndex) == "number")
  return (
    <div className="evolve-pawn-panel">
      { typeof(pawnToEvolveIndex) == "number" && pawnToEvolveIndex >= 0 && (
        <div id="evolutionRectangle">
          {evolvablePieces.map((letter) => (
            <div
              key={letter}
              className="evolutionPiece"
              onClick={() => handlePieceSelection(letter)}
            >
              {curPlayer === "white" ? letter.toUpperCase() : letter}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export const pawnReachedBackRank = (gameRepresentation) => {
  const backranks = { white: 0, black: 7 };

  for (let col = 0; col < gameRepresentation[backranks.white].length; col++) {
    const piece = gameRepresentation[backranks.white][col];
     console.log(piece.charAt(0).toLowerCase(),piece.charAt(0).toLowerCase() === "p",backranks.white * 8 + col,gameRepresentation, gameRepresentation[backranks.white], gameRepresentation[backranks.white][col])
    if (piece.charAt(0).toLowerCase() === "p") {
      return backranks.white * 8 + col; // Return the index of the pawn
    }
  }

  for (let col = 0; col < gameRepresentation[backranks.black].length; col++) {
    const piece = gameRepresentation[backranks.black][col];

    if (piece.charAt(0).toLowerCase() === "p") {
      return backranks.black * 8 + col; // Return the index of the pawn
    }
  }

  return -1; // Return -1 if no pawn reached the backrank
};

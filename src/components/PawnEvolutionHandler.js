export const EvolvePawnPanel = ({ pawnToEvolveIndex, gameRepresentation, curPlayer }) => {
  const evolvablePieces = ["n", "q", "r", "p"];
 console.log(gameRepresentation)
  return (
    <div className="evolve-pawn-panel">
      {pawnToEvolveIndex !== null &&
        evolvablePieces.map((letter) => (
          <div key={letter} className="pawn-option">
            {curPlayer === "white" ? letter.toUpperCase() : letter}
          </div>
        ))}
    </div>
  );
};

export const pawnReachedBackRank = (gameRepresentation) => {
  const backranks = { white: 0, black: 7 };

  for (let col = 0; col < gameRepresentation[backranks.white].length; col++) {
    const piece = gameRepresentation[backranks.white][col];
    console.log(piece.charAt(0).toLowerCase(),piece.charAt(0).toLowerCase() === "p",backranks.white * 8 + col)
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

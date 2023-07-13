//import React from 'react';
import pieces from "../CheccPieceImageURLS";

const Cell = (props) => {
  const { id, piece, isGray, isSelected, isHighlighted, onClick } = props;
  const cellStyle = {
    textAlign: "center",
    background: isGray ? "#d3d3d3" : "transparent",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    ...(isSelected && { background: "yellow" }), // Highlight the selected cell
    ...(isHighlighted && { background: "green" }), // Highlight the possible move
  };
    // let imageURL = null;
    // // Extract the letter from the piece
    // if (piece !== null) {
    // console.log(piece)
    // const letter = piece[0].tolowerCase();

    // // Find the matching object value with the same first letter (case-insensitive)
    // const matchingPiece = Object.values(pieces).find((pieceObj) => pieceObj.name[0].tolowerCase() === letter);

    // // Determine the image URL based on the piece color
    // imageUrl = matchingPiece[piece.toUpperCase() === piece ? "white" : "black"];
    // console.log(imageURL)
// }

  return (
    <div
      style={cellStyle}
      className={`cell ${isGray ? "gray-cell" : ""} ${isSelected ? "selected-cell" : ""}`}
      data-testid={`cell-${id}`}
      onClick={() => onClick(id, piece)}
    >
      {id}
      {piece && <img src={"https://i.postimg.cc/XqpbQKwK/kr-l.png"} alt={piece} style={{ width: 100, height: 100 }} />}}
    </div>
  );
};

export default Cell;

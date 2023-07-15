import { useState, useEffect } from "react";
import pieces from "../CheccPieceImageURLS";
import { getPieceImage } from "../utils";

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
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    try {
     
      const pieceImg = getPieceImage(piece, pieces)
      // console.log(pieceImg)
      setImageURL(pieceImg);
    } catch (error) {
      console.log(error);
    }
  }, [piece]);

  return (
    <div
      style={cellStyle}
      className={`cell ${isGray ? "gray-cell" : ""} ${isSelected ? "selected-cell" : ""}`}
      data-testid={`cell-${id}`}
      onClick={() => onClick(id, piece)}
    >
      {piece !== "" && !isSelected ? (
        <img
          src={imageURL}
          alt={piece}
          style={{ zIndex: 100 }}
        />
      ) : (
        id
      )}
    </div>
  );
};

export default Cell;

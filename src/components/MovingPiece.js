import { useState, useEffect } from "react";
import { getPieceImage } from "../utils";
import pieces from "../CheccPieceImageURLS";
const PieceSelection = ({ selectedCell }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: -20, y: -20 });
  const [imageURL, setImageURL] = useState(null);
  useEffect(() => {
    const handleMouseMove = (event) => {
      setCursorPosition({ x: event.clientX - 20, y: event.clientY - 20 });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const url = getPieceImage(selectedCell.piece, pieces);
    setImageURL(url);
  }, [selectedCell]);

  const cursorStyle = {
    position: "fixed",
    left: cursorPosition.x,
    top: cursorPosition.y,
    pointerEvents: "none",
    // backgroundColor: "black",

    zIndex: 1000000,
  };

  return <div style={cursorStyle}>{selectedCell.piece && <img src={imageURL} alt={selectedCell.piece} />}</div>;
};

export default PieceSelection;

 
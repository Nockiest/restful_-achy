 

import  { useState, useEffect } from "react";
import { getPieceImage } from "../utils";
import pieces from "../CheccPieceImageURLS";
const PieceSelection = ({ selectedCell }) => {
    const [cursorPosition, setCursorPosition] = useState({ x: -20, y: -20 });
    const [imageURL, setImageURL] = useState(null)
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
  const url = getPieceImage(selectedCell.piece, pieces)
  setImageURL(url)
}, [selectedCell])
  
    const cursorStyle = {
      position: "fixed",
      left: cursorPosition.x,
      top: cursorPosition.y,
      pointerEvents: "none",
      // backgroundColor: "black",
       
      zIndex: 1000000,
    };
  
    return (
      <div style={cursorStyle}>
        {selectedCell.piece && <img src={imageURL} alt={selectedCell.piece}/>}

      </div>
    );
  };
  
  export default PieceSelection;
  
  

//   const selectPiece = (cell) => {
//     setSelectedCell(cell);
//     setSavedPiece(getInfoAboutThePiece(cell));
//     cell.style.backgroundColor = "yellow";

//     const imgSrc = cell.childNodes[1].getAttribute("src");

//     const cursor = document.createElement("img");
//     cursor.src = imgSrc;
//     cursor.id = "cursor";
//     document.body.appendChild(cursor);
//     cursor.style.position = "absolute";
//     cursor.style.left = -20 + event.clientX + window.scrollX + "px";
//     cursor.style.top = -20 + event.clientY + window.scrollY + "px";
//     cursor.style.pointerEvents = "none";
//     document.onmousemove = (e) => {
//       cursor.style.left = -20 + e.pageX + "px";
//       cursor.style.top = -20 + e.pageY + "px";
//       cursor.style.pointerEvents = "none";
//     };
//     targetGridCell(cellId).innerHTML = "";
//   };

//   const unAppendPiece = () => {
//     const cursor = document.getElementById("cursor");
//     cursor.remove();
//   };
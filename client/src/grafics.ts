
import { Fixed64LengthBoard } from "./types/types";
import { showError } from "./utils";

export function renderBoard(simplifiedBoard:Fixed64LengthBoard ) {
    const boardContainer = document.getElementById("board-container");
    if (boardContainer === null) {
        showError('board container is null');
        return
    }
    boardContainer.innerHTML = ""; // Clear previous content
    if (simplifiedBoard.length !== 64) {
        showError('BOARD DOESNT HAVE 64 SQUARES');
      return;
    }
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const square = document.createElement("div");
        square.classList.add("square");

        const pieceIndex = row * 8 + col;
        const pieceLetter = simplifiedBoard[pieceIndex];

        if (pieceLetter) {
          const pieceElement = document.createElement("div");
          pieceElement.classList.add("piece");
          pieceElement.textContent = pieceLetter;
          pieceElement.style.color =
            pieceLetter.toLowerCase() === pieceLetter ? "black" : "white";
          square.appendChild(pieceElement);
        }

        // Add a small element displaying the index
        const indexElement = document.createElement("div");
        indexElement.classList.add("index");
        indexElement.textContent = pieceIndex.toString();
        square.appendChild(indexElement);

        boardContainer.appendChild(square);
      }
    }
  }

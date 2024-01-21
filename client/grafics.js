const piecesValues = {
  bishop: {
    value: 1,
    imageUrl: {
      black: 'https://i.postimg.cc/MHdbmFwh/BBishop.png',
      white: 'https://i.postimg.cc/MHdbmFwh/WBishop.png'
    }
  },
  rook: {
    value: 5,
    imageUrl: {
      black: 'https://i.postimg.cc/2SPdGvp8/BRook.png',
      white: 'https://i.postimg.cc/2SPdGvp8/WRook.png'
    }
  },
  knight: {
    value: 3,
    imageUrl: {
      black: 'https://i.postimg.cc/3xX1sv12/BKnight.png',
      white: 'https://i.postimg.cc/3xX1sv12/WKnight.png'
    }
  },
  pawn: {
      value: 3,
      imageUrl: {
        black: 'https://i.postimg.cc/QxGhm2yV/BPawn.png',
        white: 'https://i.postimg.cc/RZ5GpR7M/WPawn-kopie-kopie.png'
      }
    },
    queen: {
      value: 3,
      imageUrl: {
        black: 'https://i.postimg.cc/jSWQycFF/BQueen.png',
        white: 'https://i.postimg.cc/jSWQycFF/WQueen.png'
      }
    },
    king: {
      value: 3,
      imageUrl: {
        black: '"https://i.postimg.cc/XqpbQKwK/BKing.png',
        white: '"https://i.postimg.cc/XqpbQKwK/kr-1.png'
      }
    },


};

export function renderBoard(simplifiedBoard) {
  const boardContainer = document.getElementById("board-container");
  boardContainer.innerHTML = ""; // Clear previous content
  if (simplifiedBoard.length !== 64) {
    console.log("BOARD DOESNT HAVE 64 SQUARES");
    return;
  }
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.style.position = 'relative'
      const pieceIndex = row * 8 + col;
      const pieceLetter = simplifiedBoard[pieceIndex];

      if (pieceLetter) {
        const pieceElement = document.createElement("div");
        pieceElement.classList.add("piece");
        pieceElement.textContent = pieceLetter;
        pieceElement.style.color =
          pieceLetter.toLowerCase() === pieceLetter ? "black" : "white";

        // const imageURL = getPieceFromIdentifier(pieceLetter);
        // if (imageURL) {
        //   const imageElement = document.createElement("img");
        //   imageElement.src = imageURL;
        //   imageElement.style.position= 'absolute'
        //   imageElement.style.top= '0'
        //   imageElement.style.left= '0'
        //   pieceElement.appendChild(imageElement);
        // }

        square.appendChild(pieceElement);
      }

      // Add a small element displaying the index
      const indexElement = document.createElement("div");
      indexElement.classList.add("index");
      indexElement.textContent = pieceIndex;
      square.appendChild(indexElement);

      boardContainer.appendChild(square);
    }
  }
}

function getPieceFromIdentifier(identifier) {
  console.log('id', identifier)
  if ( identifier === null || identifier === '' || identifier === undefined){
    return null
  }
  // switch statement for getting the correct piece type
  if (identifier.toLowerCase() === "b") {
    return identifier.toLowerCase() === identifier
      ? piecesValues.bishop.imageUrl.black
      : piecesValues.bishop.imageUrl.white;
  } else if (identifier.toLowerCase() === "k") {
    return identifier.toLowerCase() === identifier
      ? piecesValues.king.imageUrl.white
      : piecesValues.king.imageUrl.white;
  } else if (identifier.toLowerCase() === "q") {
    return identifier.toLowerCase() === identifier
      ? piecesValues.queen.imageUrl.white
      : piecesValues.queen.imageUrl.white;
  } else if (identifier.toLowerCase() === "r") {
    return identifier.toLowerCase() === identifier
      ? piecesValues.rook.imageUrl.white
      : piecesValues.rook.imageUrl.white;
  } else if (identifier.toLowerCase() === "p") {
    return identifier.toLowerCase() === identifier
      ? piecesValues.pawn.imageUrl.white
      : piecesValues.pawn.imageUrl.white;
  } else if (identifier.toLowerCase() === "n") {
    return identifier.toLowerCase() === identifier
      ? piecesValues.knight.imageUrl.white
      : piecesValues.knight.imageUrl.white;
  } else if (identifier.toLowerCase() === "x") {
    return null;
  } else {
    return null;
  }
}
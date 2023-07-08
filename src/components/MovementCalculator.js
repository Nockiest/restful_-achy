import React from 'react'

const MovementCalculator = ({id, color, pieceType}) => {
    let pieceTypes = {
        pawn: {
          name: "pawn",
          image: {white: "https://i.postimg.cc/RZ5GpR7M/WPawn-kopie-kopie.png",  black: "https://i.postimg.cc/QxGhm2yV/BPawn.png" } ,
          enPassant: false,
          value:[1],
          calculatePossibleMoves: function(index, color, board) {
          const possibleMoves = [];
          let pawnRow = Math.floor((index) / 8 );
            
          let moves = { white: {  move: -8,  doublemove: -16, captureLeft: -7,  captureRight: -9,  startRow: 49, fifthRow: 30 },
                      black: {  move: 8,  doublemove: 16,  captureLeft: 7,  captureRight: 9,  startRow: 10, fifthRow: 38} };
            
             function isPawn(piece) {
              return piece.toLowerCase() === "p";
            }
      
            function isOnFifthRow(index, color) {
              return isOnSameRow(moves[color].fifthRow, index, board);
            }
      
            function calculateEnpassant(index, color){
              let pieceLeftOfPawn = board[index - 1];
              let pieceRightOfPawn = board[index + 1];
              let lastTurn = gameInformation.gameHistory[gameInformation.gameHistory.length-1];
              if(!lastTurn){return false}
              if(index ===0||index ===63){return}
              if(isPawn(pieceLeftOfPawn) && isOnFifthRow(index - 1, color)) {
                if(lastTurn.movedPiece === "pawn" && Math.abs(lastTurn.from - lastTurn.to) === 16 && Number(lastTurn.to) === Number(index - 1)){    
                  if(color === "black"){
                    possibleMoves.push(Number(index) + moves[color].captureLeft);
                  } else {
                    possibleMoves.push(index + moves[color].captureRight);
                  }
                }                   
              }
      
              if(isPawn(pieceRightOfPawn) && isOnFifthRow(index + 1, color)){                  
                if(lastTurn.movedPiece === "pawn" && Math.abs(lastTurn.from - lastTurn.to) === 16 && Number(lastTurn.to) === Number(index + 1)){
                  if(color === "black"){
                    possibleMoves.push(index + moves[color].captureRight);
      
                  } else {
                    possibleMoves.push(index + moves[color].captureLeft);
                  }
                }
              } 
            }
       
        const unMovedPiece = isOnSameRow(moves[color].startRow, index, board);
        if (isInGameBoundaries(index + moves[color].move) && board[index + moves[color].move] === ''){
          possibleMoves.push(index + moves[color].move);
          if (unMovedPiece && isInGameBoundaries(index + moves[color].doublemove) && board[index + moves[color].doublemove] === '') {
            possibleMoves.push(index + moves[color].doublemove);
          } // walk by two
        } // walk by one
         
        const captureLeft = board[index + moves[color].captureLeft];
        if (captureLeft !== null && captureLeft !== '' && findPiecesColor(captureLeft) !== color && isOnSameRow(index + moves[color].captureLeft, index + moves[color].move)) {
          possibleMoves.push(index + moves[color].captureLeft);
        } //capture left
        const captureRight = board[index + moves[color].captureRight];
        if (captureRight !== null && captureRight !== '' && findPiecesColor(captureRight) !== color && isOnSameRow(index + moves[color].captureRight, index + moves[color].move)) {
          possibleMoves.push(index + moves[color].captureRight);
        } //capture right
              calculateEnpassant(index, color)
        return possibleMoves;
      },
          evolve: function (index, curPlayer){   
            render.removePieceEvolutionPanel()
          },
          checkForBackRank: function (index, curPlayer){
          const backRanks ={ white : 1, black: 63,}
          return isOnSameRow(backRanks[curPlayer], index) ? true : false;
      },
        },    
        night: {
          name: "night",
          image: {white: "https://i.postimg.cc/3xX1sv12/WKnight.png",  black: "https://i.postimg.cc/8z34Y9vG/BKnight.png" } ,
           movementPattern: [ -17, -15, -10, -6, 6, 10, 15, 17],
           value:[3],
           calculatePossibleMoves: function(index, color, board){
             let { gameRepresentation, curPlayer, gameHistory } = gameInformation;
             var indexes = indexToCoords(index)
              let possibleMoves = []
       
            const knightMoves = [[2, 1], [1, 2], [-1, 2], [-2, 1], [-2, -1], [-1, -2], [1, -2], [2, -1]];
       
            for (let i = 0; i < knightMoves.length; i++) {
              const nextRowIndex =  indexes[0] + knightMoves[i][0];
              const nextColumnIndex = indexes[1] + knightMoves[i][1];
              if (nextRowIndex >= 0 && nextRowIndex < 8 && nextColumnIndex >= 0 && nextColumnIndex < 8) {////Nevím proč to takhle funguje
                var cell = gameRepresentation[coordsToIndex(nextRowIndex, nextColumnIndex)]
          
                 if (cell !== '' ) {
                     var pieceColor = findPiecesColor(cell)
                     if(pieceColor === gameInformation.curPlayer){
                       continue;
                     }
                       }
                possibleMoves.push(coordsToIndex(nextRowIndex, nextColumnIndex));
              }
            }
            
             return possibleMoves;
             },
        },//zde změnit
        bishop: {
          name: "bishop",
          image: { white: "https://i.postimg.cc/MHdbmFwh/WBishop.png", black: "https://i.postimg.cc/DyxBr8y8/BBishop.png" },
          value:[3],
          calculatePossibleMoves: function (index, color, board) {
          let { curPlayer, gameHistory } = gameInformation;
            const row = Math.floor(index / 8); // řádek, ve kterém se střelec nachází
            const col = (index) % 8; // sloupec, ve kterém se střelec nachází
            const moves = []; // pole pro ukládání možných tahů
      
            // směry diagonál, po kterých se může střelec pohybovat
            const directions = [    
              [-1, -1], // nahoru vlevo
              [-1, 1],  // nahoru vpravo
              [1, -1],  // dolů vlevo
              [1, 1]    // dolů vpravo
            ];
      
            // procházení jednotlivých směrů a hledání tahů
            for (let i = 0; i < directions.length; i++) {
              const dir = directions[i];
              let newRow = row + dir[0];
              let newCol = col + dir[1];
      
          // procházení polí v daném směru
          while (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
            const newPos = newRow * 8 + newCol; // výpočet nové pozice na šachovnici
            // pokud na nové pozici není figurka, jedná se o možný tah
            const cell = board[newPos];
            if (cell === "") {
              moves.push(newPos);
            } else {
              // pokud na nové pozici je figurka, zjistíme její barvu     
              const color = findPiecesColor(cell);
              // pokud je barva figurky na nové pozici stejná jako barva střelce, nemůžeme na toto pole táhnout
              if (color === findPiecesColor(board[index])) {     
                break;
              } else {
                moves.push(newPos);
                break;
              }
            }  // pokud je barva figurky na nové pozici odlišná od barvy střelce, můžeme na toto pole táhnout a dále pokračujeme v daném směru
      
            newRow += dir[0];
            newCol += dir[1];
          }
        }
        return moves;
      }
        },
        queen: {
          name: "queen",
          image: { white: "https://i.postimg.cc/jSWQycFF/WQueen.png", black: "https://i.postimg.cc/ZRPLCqMY/BQueen.png" },
          value:[9],
          calculatePossibleMoves: function(index, color, board){
          var StraightMoves = pieceTypes.rook.calculatePossibleMoves(index, color, board)
          var DiagonalMoves = pieceTypes.bishop.calculatePossibleMoves(index, color, board)
        
          var possibleMoves =[...DiagonalMoves,...StraightMoves];
          return possibleMoves                                                             
          }
        }, 
        rook: {
          name: "rook",
          image: { white: "https://i.postimg.cc/2SPdGvp8/WRook.png", black: " https://i.postimg.cc/fywfXhGc/BRook.png" },
          value:[5],
          labels: {white: "R", black: "r"},
           calculatePossibleMoves: function(index, color, board) {
             // let { gameRepresentation, curPlayer, gameHistory } = gameInformation;
        const ROW_SIZE = 8;
        const COLUMN_SIZE = 8;
        const row = Math.floor((index) / ROW_SIZE);
        const col = (index) % COLUMN_SIZE;
        let possibleMoves = [];
       
        // Define movement arrays
        const movements = [
          [1, 0], // move down
          [-1, 0], // move up
          [0, 1], // move right
          [0, -1], // move left
        ];
      
        for (let i = 0; i < movements.length; i++) {
          let [rowMove, colMove] = movements[i];
          let newRow = row + rowMove;
          let newCol = col + colMove;
       
          while (
            newRow >= 0 &&
            newRow < ROW_SIZE &&
            newCol >= 0 &&
            newCol < COLUMN_SIZE
          ){
            const newIndex = newRow * ROW_SIZE + newCol;
            const cell = board[newIndex];
             if (cell === "") {
              // If the cell is empty, we can move to it
              possibleMoves.push(newIndex);
            } else {
              // If the cell is not empty, check if it has a piece of the opposite color
              const color = findPiecesColor(cell);
              const startColor = findPiecesColor(board[index]);
              if (color !== startColor) {
                // If the piece is of the opposite color, we can capture it and stop iterating in this direction
                possibleMoves.push(newIndex);
                break;
              } else {
                // If the piece is of the same color, we can't move past it and should stop iterating in this direction
                break;
              }
            }
            newRow += rowMove;
            newCol += colMove;
          }
        }
        return possibleMoves;
      }},
        king: { 
          name: "king", 
          image: { white:  "https://i.postimg.cc/XqpbQKwK/kr-l.png", black: "https://i.postimg.cc/PfwgMGCm/BKing.png" },
          labels: {white: "K", black: "k"},
          value:[0],
          castleRookMovementPattern: {white: {left: [56,58], right: [63,60]},black: {left:[0,2], right:[7,4]}},
          calculatePossibleMoves: function(index, color, board){
        let possibleMoves = [];
        let movementPattern = [-9,-8,-7,-1,1,7,8,9];
        let teamPositions = {
          white: { leftRook: 56, rightRook: 63, king: 59, left: 57, right: 61},
          black: { leftRook: 0, rightRook: 7, king: 3, left: 1, right: 5 }
        };
        
        function tryCastle(rookIndex, kingIndex, color, direction){
          if(gameInformation[color][direction + "RookMoved"]) { return false}
          if(gameInformation[color].kingMoved){return}
          if (kingIndex === teamPositions[color].king) {        
            let rookPosition = board[rookIndex]; 
            if (rookPosition ===  pieceTypes.rook.labels[color]) {
              let indexesBetween = getCellsInBetween(kingIndex, rookIndex);
              let foundNonEmptyCell = false;
              indexesBetween.forEach((index) => {
                if (index !== "") {
                  foundNonEmptyCell = true; // kontrola procházení přes šach
                }
              });
            
              if (foundNonEmptyCell) {
                return false;
              } else {              
                possibleMoves.push(teamPositions[color][direction]);
                return true;
              }
            }
          } else {
          }
        }
        
        const kingRow = Math.floor(index / 8);
        const kingColumn = index % 8;
      
        for (let i = 0; i < movementPattern.length; i++) {     
          var newIndex = index + movementPattern[i];
          var cell = board[newIndex];
      
          if([1,-1].includes(movementPattern[i])){
              if (!isOnSameRow(index, newIndex)) {
            continue;
           }
          } 
           if([-8,8].includes(movementPattern[i])){
              if (!isOnSameColumn(index, newIndex)) {
            continue;
           }
          } 
           if([-7,-9,7,9].includes(movementPattern[i])){
              if (!isOnSameDiagonal(index, newIndex)) {
            continue;
           }
          }   
            var pieceColor = findPiecesColor(cell)
            if(pieceColor === color){continue;}
          
          possibleMoves.push(newIndex)
        }
      
        tryCastle(teamPositions[color].leftRook, index, color, "left");  
        tryCastle(teamPositions[color].rightRook, index, color, "right");
        return possibleMoves
            },  
          },
      };



      
  return (
    <div>MovementCalculator</div>
  )
}

export default MovementCalculator
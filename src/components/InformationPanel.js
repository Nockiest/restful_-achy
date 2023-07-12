import React from 'react'

const InformationPanel = ({selectedCell,curPlayer,capturedPieces,inCheck, gameHistory}) => {
  return (
    <di className="information-panel">  
    <p>Selected Cell: {selectedCell.id}</p>
    <p>Selected Piece: {selectedCell.piece}</p>
    <p>SelectedColor: {selectedCell.curPlayer}</p>  
    <p>Cur: player: {curPlayer}</p>
    <p> capturedPiece: {capturedPieces}</p>
    <p> playerInCheck?: {inCheck === true ? "true" : "false"}</p>
    <div className="game-history-overview">
          {gameHistory.map((move, index) => (
            <div className="game-history-move" key={index}>
              <p>Color: {move.color}</p>
              <p>Piece: {move.piece}</p>
              <p>From: {move.from}</p>
              <p>To: {move.to}</p>
              <p>Captured: {move.captured}</p>
            </div>
          ))}
        </div>
    </di>
  )
}

export default InformationPanel
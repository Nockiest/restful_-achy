import React from 'react'
import Clock from './Clock'

const InformationPanel = ({selectedCell,curPlayer,capturedPieces,inCheck, gameHistory}) => {
  return (
    <div className="information-panel">  
      <Clock />
      {/* <div className='clock'>
         <div>Player 1: {whiteTime} seconds</div>
         <div>Player 2: {blackTime} seconds</div>
      </div> */}
    <p>Selected Cell: {selectedCell.id}</p>
    <p>Selected Piece: {selectedCell.piece}</p>
    <p>SelectedColor: {selectedCell.curPlayer}</p>  
    <p>Cur: player: {curPlayer}</p>
    <p> capturedPiece: {capturedPieces}</p>
    <p> playerInCheck?: {inCheck === true ? "true" : "false"}</p>
    <div className="game-history-overview">
          {gameHistory.map((move, index) => (
           <div className="game-history-move" key={index} style={{ backgroundColor: move.color === "white" ? "white" : "gray", color: move.color === "white" ? "black":"white"  }}>
              <p>Piece: {move.piece}</p>
              <p>From: {move.from}</p>
              <p>To: {move.to}</p>
             { 0<1 && <p>Captured: {move.captured}</p>}
            </div>
          ))}
        </div>
    </div>
  )
}

export default InformationPanel
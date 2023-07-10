import React from 'react'

const PieceSelector = ({selectedCell, setSelectedPiece}) => {
  return (
    <div>
        <p>Selected Cell: {selectedCell.id}</p>
        <p>Selected Piece: {selectedCell.piece}</p>
        <p>Current Player: {selectedCell.curPlayer}</p>  
    </div>
  )
}

export default PieceSelector
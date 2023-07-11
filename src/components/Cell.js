import React from 'react';

const Cell = (props) => {
    const { id, piece, isGray, isSelected, isHighlighted,  onClick } = props;
    const cellStyle = {
      textAlign: 'center',
      background: isGray ? '#d3d3d3' : 'transparent',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      ...(isSelected && { background: 'yellow' }), // Highlight the selected cell
      ...(isHighlighted && { background: 'green' }), // Highlight the possible move
    };
  
    return (
      <div
        style={cellStyle}
        className={`cell ${isGray ? 'gray-cell' : ''} ${isSelected ? 'selected-cell' : ''}`}
        data-testid={`cell-${id}`}
        onClick={() => onClick(id, piece)}
      >
         {id}
        {piece && <span className={`piece ${piece}`}>{piece}</span>}
        
      </div>
    );
  };
  
export default Cell  
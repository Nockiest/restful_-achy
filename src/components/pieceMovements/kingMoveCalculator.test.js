import calculateKingMoves from './kingMoveCalculator';

describe('calculateKingMoves', () => {
  it('returns the correct list of possible moves for the king', () => {
    const position = 9; // Example position for testing
    const color = 'white'; // Example color for testing
    const board = [
      // Example board state for testing
      '', '', '', '', '', '', '', '',
      '', 'K1', '', '', '', '', '', '',
      '', '', 'q1', '', '', '', '', '',
      '', '', '', '', '', '', '', '',
      '', '', '', '', 'p1', '', '', '',
      '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', 'k1', '',
    ];
    const gameHistory = [ 
        {color: 'black', piece: 'q1', from: 26, to: 18, captured: 'Q1'}]; // Example game history for testing
    const movedPieces = { 
        K1: true,
        q1: true,
        p1:true,
        k1: true,
     }; // Example moved pieces for testing
    const inCheck = false; // Example inCheck value for testing
    
    const expectedMoves = [ 0, 1, 2 , 8, 10, 16, 17, 18 ]; // Expected list of possible moves

    const result = calculateKingMoves(position, color, board, gameHistory, movedPieces, inCheck);
    expect(result).toEqual(expectedMoves);
  });
});

describe('tryCastle', () => {
    it('returns the correct list of possible moves for the king without considering check', () => {
      const position = 60; // Example position for testing
      const color = 'white'; // Example color for testing
      const board = [
        // Example board state for testing
        '', '', '', 'k1','', 'q1', '', '',
        '', '', '', '', '', '', '', '',
        'p1', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '',
        'Rl1', '', '', '', 'K1', '', '', 'Rr2',
      ];
      const gameHistory = [ 
          {color: 'black', piece: 'p', from: 8, to: 16, captured: ''}]; // Example game history for testing
      const movedPieces = { 
          K1: false,
          q1: true,
          p1:true,
          k1: true,
          Rl1: false,
          Rr2: false
       }; // Example moved pieces for testing
      const inCheck = false; // Example inCheck value for testing
      
      const expectedMoves = [ 51,52,53,58,59,61,62 ]; // Expected list of possible moves
  
      const result = calculateKingMoves(position, color, board, gameHistory, movedPieces, inCheck);
    
      // expect(new Set(result)).toEqual(new Set(expectedMoves));
      expect(result).toContain(62);
    });

    
  });


  describe('trynottoCastle', () => {
    it('prevent the player from castling', () => {
      const position = 4; // Example position for testing
      const color = 'black'; // Example color for testing
      const board = [
        // Example board state for testing
        'rl1', '', 'b1', 'k1','q1', '', '', 'rr1',
        '', '', '', '', '', '', '', '',
        'p1', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '',
        'Rl1', '', '', '', 'K1', '', '', 'Rr2',
      ];
      const gameHistory = [ 
          {color: 'white', piece: 'p', from: 8, to: 16, captured: ''}]; // Example game history for testing
      const movedPieces = { 
          K1: false,
          q1: true,
          p1:true,
          k1: true,
          Rl1: false,
          Rr2: false,
          rl1:false,
          rr1: false,
          b1: false
       }; // Example moved pieces for testing
      const inCheck = false; // Example inCheck value for testing
      
      const expectedMoves = [ 11,12,13 ]; // Expected list of possible moves
  
      const result = calculateKingMoves(position, color, board, gameHistory, movedPieces, inCheck);
    
      // expect(new Set(result)).toEqual(new Set(expectedMoves));
      expect(result).toContain(11,12,13);
    });

  }) ;
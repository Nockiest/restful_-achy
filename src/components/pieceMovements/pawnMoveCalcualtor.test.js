import calculatePawnMoves from './pawnMoveCalculator';

describe('calculatePawnMoves', () => {
  describe('when en passant is possible', () => {
    it('returns the correct list of possible moves for en passant position', () => {
      const position = 30; // Example en passant position for testing
      const pieceColor = 'white'; // Example piece color for testing
      const board = [
        // Example board state for testing
        '', '', '', '', 'K1', '', '', '',
        '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', 'P1', 'p1',
        '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '',
        '', '', '', '', 'k1', '', '', '',
      ];
      const lastTurn = { piece: 'p1', from: 15, to: 31 }; // Example last turn for en passant testing

      const expectedMoves = [22, 23]; // Expected list of possible moves for en passant position

      const result = calculatePawnMoves(position, pieceColor, board, lastTurn);
      console.log(result)
      expect(result).toEqual(expectedMoves);
    });
  });

  describe('when en passant is not possible', () => {
    it('returns the correct list of possible moves for a normal position', () => {
      const position = 26; // Example normal position for testing
      const pieceColor = 'white'; // Example piece color for testing
      const board = [
        // Example board state for testing
        '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '',
        '', 'p1', '', '', '', '', '', '',
        '', '', 'P1', '', '', '', '', '',
        '', '', '', 'P1', '', '', '', '',
        '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '',
      ];
      const lastTurn = { piece: 'p1', from: 9, to: 17 }; // No en passant in the last turn

      const expectedMoves = [17, 18]; // Expected list of possible moves for a normal position

      const result = calculatePawnMoves(position, pieceColor, board, lastTurn);

      expect(new Set(result)).toEqual(new Set(expectedMoves));
    });
  });
});
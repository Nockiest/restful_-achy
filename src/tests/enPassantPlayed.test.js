import { checkEnPassantWasPlayed } from "../utils";

describe('checkEnPassantWasPlayed', () => {
    it('returns the correct captured piece position if en passant was played', () => {
      const playerColor = 'white'; // Example player color for testing
      const lastTurn = {
        color: 'black',
        piece: 'p',
        from: 8,
        to: 24,
        captured: '',
      }; // Example last turn for testing
      const thisTurn = {
        color: 'white',
        piece: 'P',
        from: 25,
        to: 16,
        captured: '',
      }; // Example this turn for testing
  
      const expectedCapturedPiecePos = 24; // Expected captured piece position
  
      const result = checkEnPassantWasPlayed(playerColor, lastTurn, thisTurn);
  
      expect(result).toEqual(expectedCapturedPiecePos);
    });
  
    // it('returns false if en passant was not played', () => {
    //   const playerColor = 'white'; // Example player color for testing
    //   const lastTurn = {
    //     color: 'black',
    //     piece: 'p',
    //     from: 8,
    //     to: 16,
    //     captured: '',
    //   }; // Example last turn for testing
    //   const thisTurn = {
    //     color: 'white',
    //     piece: 'p',
    //     from: 25,
    //     to: 17,
    //     captured: '',
    //   }; // Example this turn for testing
  
    //   const result = checkEnPassantWasPlayed(playerColor, lastTurn, thisTurn);
  
    //   expect(result).toBeFalsy();
    // });
  });
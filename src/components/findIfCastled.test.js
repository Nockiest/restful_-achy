import { findIfCastled } from "../utils";

describe('findIfCastled', () => {
    it('should return true if the selected piece is "K1" and the difference between selectedId and id is 2', () => {
    
      const selectedId = 62; // Replace with your own values
      const id = 60; // Replace with your own values
      const selectedPiece = 'K1';
  
      const result = findIfCastled( selectedId, id, selectedPiece);
  
      expect(result).toBe(true);
    });
  
    it('should return false if the selected piece is "K1" and the difference between selectedId and id is not 2', () => {
 
      const selectedId = 60; // Replace with your own values
      const id = 61; // Replace with your own values
      const selectedPiece = 'K1';
  
      const result = findIfCastled( selectedId, id, selectedPiece);
  
      expect(result).toBe(false);
    });
  });
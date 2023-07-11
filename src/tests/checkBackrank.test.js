// import { pawnReachedBackRank } from "../components/PawnEvolutionHandler";

// describe('pawnReachedBackRank', () => {
//     it('returns the index of the pawn that reached the backrank', () => {
//       const gameRepresentation = [
//         ['', '', 'P2', '', 'K1', '', '', ''],
//         ['', '', '', '', '', '', '', 'p1'],
//         ['', '', '', '', '', '', '', ''],
//         ['', '', '', '', '', '', '', ''],
//         ['', '', '', '', '', '', '', ''],
//         ['', '', '', '', '', '', '', ''],
//         ['', '', '', '', '', '', 'P1', ''],
//         ['', '', '', '', 'k1', '', '', ''],
//       ];
  
//       const result = pawnReachedBackRank(gameRepresentation);
//       const expectedIndex =  2; // Index of the pawn 'p1'
  
//       expect(result).toEqual(expectedIndex);
//     });
  
//     it('returns -1 if no pawn reached the backrank', () => {
//       const gameRepresentation = [
//         ['', '', '', '', 'K1', '', '', ''],
//         ['', '', '', '', '', '', '', ''],
//         ['', '', '', '', '', '', '', ''],
//         ['', '', '', '', '', '', '', ''],
//         ['', '', '', '', '', '', '', ''],
//         ['', '', '', '', '', '', '', ''],
//         ['', '', '', '', '', '', 'P1', ''],
//         ['', 'p2', '', '', 'k1', '', '', ''],
//       ];
  
//       const result = pawnReachedBackRank(gameRepresentation);
//       const expectedIndex = 57;
  
//       expect(result).toEqual(expectedIndex);
//     });
//   });
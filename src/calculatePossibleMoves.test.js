import { calculatePossibleMoves } from './utils';

describe('calculatePossibleMoves', () => {
  // Test a check position
  test('returns possible moves in a check position', () => {
    const checkPositionGameRep = [
      ['r', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', 'k', '', ''],
    ];
    const checkPositionGameHistory = [
      { color: 'black', piece: 'r', from: 0, to: 1 },
      { color: 'white', piece: 'k', from: 63, to: 55 },
    ];
    const checkPositionMovedPieces = { r: true, k: true };
    const checkPositionInCheck = true;

    const possibleMoves = calculatePossibleMoves(
      1,
      'r',
      checkPositionGameRep,
      checkPositionGameHistory,
      checkPositionMovedPieces,
      checkPositionInCheck
    );

    expect(possibleMoves).toEqual(expect.arrayContaining([9, 17, 25, 33, 41, 49, 57, 2, 3, 4, 5, 6, 7, 10, 11, 12, 13, 14, 15]));
  });

  // Test a midgame position
  test('returns possible moves in a midgame position', () => {
    const midgamePositionGameRep = [
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', 'n', '', '', '', '', ''],
      ['', '', '', '', 'P', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', 'p', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', 'K', ''],
    ];
    const midgamePositionGameHistory = [
      { color: 'white', piece: 'P', from: 28, to: 36 },
      { color: 'black', piece: 'p', from: 35, to: 27 },
    ];
    const midgamePositionMovedPieces = { P: true, p: true };

    const possibleMoves = calculatePossibleMoves(
      25,
      'n',
      midgamePositionGameRep,
      midgamePositionGameHistory,
      midgamePositionMovedPieces,
      false
    );

    expect(possibleMoves).toEqual(expect.arrayContaining([8, 0, 2, 18, 19, 21, 27, 31, 39, 44, 46]));
  });

  // Test an early game position
  test('returns possible moves in an early game position', () => {
    const earlygamePositionGameRep = [
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', 'K', ''],
    ];
    const earlygamePositionGameHistory = [];
    const earlygamePositionMovedPieces = {};

    const possibleMoves = calculatePossibleMoves(
      62,
      'K',
      earlygamePositionGameRep,
      earlygamePositionGameHistory,
      earlygamePositionMovedPieces,
      false
    );

    expect(possibleMoves).toEqual(expect.arrayContaining([61, 54, 55]));
  });
});
import Grid from "../grid/grid";
import CastlingExecutor from "../movement_components/castling/castlingExecutrer";
import Bishop from "../pieces/bishop";
import King from "../pieces/king";
import Knight from "../pieces/knight";
import Pawn from "../pieces/pawn";
import Queen from "../pieces/queen";
import Rook from "../pieces/rook";
import { diagonalDirections, straightDirections } from "./movementTypes";


type ToLowercaseUppercase<T extends string> = `${Uppercase<T> & Lowercase<T>}`;
export type PieceLetter  = ""|'r'| 'n'| 'b'| 'q'| 'k'| 'p'  | 'R'| 'N'| 'B'| 'Q'| 'K'| 'P'| 'x'|'X'
export type PlayerColor = 'white'| 'black'
export type PieceType = {
    abreviation: PieceLetter
} & King|Queen|Pawn|Bishop|Knight|Rook|CastlingExecutor
type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>

type Range<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>

export type BoardIndex = Range<0, 64>
export type Board = (PieceLetter | null)[];
export type CastlingPositions =  [BoardIndex, BoardIndex]
export type MovesComponentArgs = {
  startPosition: BoardIndex;
  pieceColor: PlayerColor;
  grid: Grid;
  range: number | null;
  directions?: Array<straightDirections | diagonalDirections>;
  moved: boolean
};
type ArrayLengthMutationKeys = 'splice' | 'push' | 'pop' | 'shift' | 'unshift' | number
type ArrayItems<T extends Array<any>> = T extends Array<infer TItems> ? TItems : never
type FixedLengthArray<T extends any[]> =
  Pick<T, Exclude<keyof T, ArrayLengthMutationKeys>>
  & { [Symbol.iterator]: () => IterableIterator< ArrayItems<T> > }

type NullArray<T extends number, Result extends any[] = []> =
  Result['length'] extends T ? Result : NullArray<T, [...Result, null]>;

export type Fixed64LengthBoard = [...NullArray<64>, ...PieceLetter[]];

export type MovementComponent = (args: MovesComponentArgs) => number[];
// type NullOrNumberArray<T extends number, Result extends any[] = []> =
// Result['length'] extends T ? Result : NullOrNumberArray<T, [...Result, null | number]>;

// export type Array64Num = NullOrNumberArray<64>;
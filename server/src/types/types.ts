import Grid from "../grid/grid";
import { diagonalDirections, straightDirections } from "./movementTypes";

 
type ToLowercaseUppercase<T extends string> = `${Uppercase<T> & Lowercase<T>}`;
export type PieceLetter  = ""|'r'| 'n'| 'b'| 'q'| 'k'| 'p'  | 'R'| 'N'| 'B'| 'Q'| 'K'| 'P'| 'x'|'X' 
export type PlayerColor = 'white'| 'black'
export type Piece = {
    abreviation: PieceLetter
}
type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>

type Range<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>
 
export type BoardIndex = Range<0, 63>
export type Board = (PieceLetter | null)[];
 
export type MovesComponentArgs = {
  startPosition: BoardIndex;
  pieceColor: PlayerColor;
  grid: Grid;
  range: number | null;
  directions?: Array<straightDirections | diagonalDirections>;
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
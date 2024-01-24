type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>

type Range<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>
export type PieceLetter  = ""|'r'| 'n'| 'b'| 'q'| 'k'| 'p'  | 'R'| 'N'| 'B'| 'Q'| 'K'| 'P'| 'x'|'X'
export type PlayerColor = 'white'| 'black'
export type BoardIndex = Range<0, 64>
export type Board = (PieceLetter | null)[];
export type CastlingPositions =  [BoardIndex, BoardIndex]

type ArrayLengthMutationKeys = 'splice' | 'push' | 'pop' | 'shift' | 'unshift' | number
type ArrayItems<T extends Array<any>> = T extends Array<infer TItems> ? TItems : never
type FixedLengthArray<T extends any[]> =
  Pick<T, Exclude<keyof T, ArrayLengthMutationKeys>>
  & { [Symbol.iterator]: () => IterableIterator< ArrayItems<T> > }

type NullArray<T extends number, Result extends any[] = []> =
  Result['length'] extends T ? Result : NullArray<T, [...Result, null]>;

export type Fixed64LengthBoard = [...NullArray<64>, ...PieceLetter[]];

 
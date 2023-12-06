export function checkInGameBounds(index: number){
    if (index < 0 || index >= 64) {
        throw new Error('Index out of bounds');
        return false
      } else {
        return true
      }
}

export function coordsToIndex(row: number, column: number, numberOfColumns: number): number {
  return row * numberOfColumns + column;
}

export function indexToCoords(index: number, numberOfColumns: number): { row: number, column: number } {
  const row = Math.floor(index / numberOfColumns);
  const column = index % numberOfColumns;
  return { row, column };
}

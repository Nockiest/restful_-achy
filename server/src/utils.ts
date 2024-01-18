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

export function caseMatches(char1:string, char2:string) {
  return (char1 === char1.toUpperCase() && char2 === char2.toUpperCase()) ||
         (char1 === char1.toLowerCase() && char2 === char2.toLowerCase());
}
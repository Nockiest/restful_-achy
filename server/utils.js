export function checkInGameBounds(index){
    if (index < 0 || index >= 64) {
        throw new Error('Index out of bounds');
        return false
      } else {
        return true
      }
}
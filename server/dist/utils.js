"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.caseMatches = exports.indexToCoords = exports.coordsToIndex = exports.checkInGameBounds = void 0;
function checkInGameBounds(index) {
    if (index < 0 || index >= 64) {
        throw new Error('Index out of bounds');
        return false;
    }
    else {
        return true;
    }
}
exports.checkInGameBounds = checkInGameBounds;
function coordsToIndex(row, column, numberOfColumns) {
    return row * numberOfColumns + column;
}
exports.coordsToIndex = coordsToIndex;
function indexToCoords(index, numberOfColumns) {
    const row = Math.floor(index / numberOfColumns);
    const column = index % numberOfColumns;
    return { row, column };
}
exports.indexToCoords = indexToCoords;
function caseMatches(char1, char2) {
    return (char1 === char1.toUpperCase() && char2 === char2.toUpperCase()) ||
        (char1 === char1.toLowerCase() && char2 === char2.toLowerCase());
}
exports.caseMatches = caseMatches;

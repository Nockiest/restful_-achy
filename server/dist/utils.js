"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkInGameBounds = void 0;
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

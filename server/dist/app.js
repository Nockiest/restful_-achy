"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cors_1 = require("cors");
var game_js_1 = require("./game.js");
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
var beginningState = ["r", "n", "b", "k", "q", "b", "n", "r", "p", "p", "p", "p", "p", "p", "p", "p", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "P", "P", "P", "P", "P", "P", "P", "P", "P", "R", "N", "B", "K", "Q", "B", "N", "R"];
var game = null;
app.post("/create_game", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var simplifiedBoard;
    return __generator(this, function (_a) {
        game = new game_js_1.default(beginningState, 600);
        simplifiedBoard = game.getBoard();
        res.json({
            message: 'Success',
            game: game,
            board: simplifiedBoard,
            initialized: game.initialized, // Include the initialization status
        });
        return [2 /*return*/];
    });
}); });
app.post("/begin_game", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (game) {
            game.beginGame();
        }
        else {
            throw new Error(" GAME WANT INITIATED");
        }
        return [2 /*return*/];
    });
}); });
app.post('/new_move', function (req, res) {
    var _a = req.body, from = _a.from, to = _a.to;
    var moveSucesfull = false;
    if (from === undefined || to === undefined || game === null) {
        console.log(from, to);
        return res.status(400).json({ error: 'There was a problem with the new move', values: { from: from, to: to, game: game } });
    }
    console.log('Received move to index:', from);
    if (game.checkMoveValid(from, to)) {
        game.processValidMovement(from, to);
        moveSucesfull = true;
    }
    // Extract necessary information from the game object to avoid circular reference
    var simplifiedBoard = game.getBoard(); // Assuming you have a getBoard method in your Game class
    res.json({
        message: moveSucesfull,
        from: from,
        board: simplifiedBoard,
    });
});
app.get("/game_state", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.json({
            message: game,
            board: game.getBoard(),
        });
        return [2 /*return*/];
    });
}); });
app.listen(3001, function () {
    // console.log("\x1Bc"); // ANSI escape code for clearing CMD in Windows
    // console.log("\x1B[2J\x1B[0f"); // ANSI escape code for clearing terminal in Unix-based systems
    console.log("Server is running on port 3001");
});

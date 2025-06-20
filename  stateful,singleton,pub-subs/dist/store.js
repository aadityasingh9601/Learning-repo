"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
class GameManager {
    //Made this private, now no outsideers can create instances of it, only the methods of the class itself can.
    constructor() {
        this.games = [];
        this.games = [];
    }
    static getInstance() {
        if (GameManager.instance) {
            return GameManager.instance;
        }
        GameManager.instance = new GameManager();
        return GameManager.instance;
    }
    addGame(gameId, name1, name2) {
        this.games.push({
            id: Math.random().toString(),
            whitePlayerName: name1,
            blackPlayerName: name2,
            moves: [],
        });
    }
    addMove(gameId, move) {
        const game = this.games.find((game) => game.id == gameId);
        game === null || game === void 0 ? void 0 : game.moves.push(move);
    }
    log() {
        console.log(this.games);
    }
}
exports.GameManager = GameManager;
//export const gameManager = new GameManager();
//What we're doing here is that we're just exporting only a single instance of the gameManager, so that every file
//uses the same gameManager, because if every file created their separate gameManager, then all of them would be
//different and they can't actaully work together, as they don't have access to the main gameManager that's contains
//the game data that's actually needed.

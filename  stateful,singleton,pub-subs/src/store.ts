interface Game {
  id: string;
  whitePlayerName: string;
  blackPlayerName: string;
  moves: string[];
}

export class GameManager {
  private games: Game[] = [];

  //Made this private, now no outsideers can create instances of it, only the methods of the class itself can.
  private constructor() {
    this.games = [];
  }

  //Static methods belong to the class itself, not to the instances of the class.
  private static instance: GameManager;

  public static getInstance() {
    if (GameManager.instance) {
      return GameManager.instance;
    }
    GameManager.instance = new GameManager();
    return GameManager.instance;
  }

  public addGame(gameId: string, name1: string, name2: string) {
    this.games.push({
      id: Math.random().toString(),
      whitePlayerName: name1,
      blackPlayerName: name2,
      moves: [],
    });
  }

  public addMove(gameId: string, move: string) {
    const game = this.games.find((game) => game.id == gameId);
    game?.moves.push(move);
  }

  public log() {
    console.log(this.games);
  }
}

//export const gameManager = new GameManager();
//What we're doing here is that we're just exporting only a single instance of the gameManager, so that every file
//uses the same gameManager, because if every file created their separate gameManager, then all of them would be
//different and they can't actaully work together, as they don't have access to the main gameManager that's contains
//the game data that's actually needed.

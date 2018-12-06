class Play extends Component {
  constructor() {
    super();
    this.addRoute('/new-game', 'New Game');
    this.newGamePage = new NewGamePage(this);
    this.game = new Game(this);
    this.activeGame = false;
  }

  newGame(playerOne, playerTwo) {
    this.activeGame = true;
    this.render();
    this.game.startGame(playerOne, playerTwo);
  }
}
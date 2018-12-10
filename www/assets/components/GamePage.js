class GamePage extends Component {
  constructor() {
    super();
    this.addRoute('/new-game', 'New Game');
    this.inputPage = new InputPage(this);
    this.game = new Board(this);
    this.activeGame = false;
  }

  newGame(playerOne, playerTwo) {
    console.log(playerOne);
    console.log(playerTwo);
    this.activeGame = true;
    this.game = new Board(this).createBoard();
    this.render();
  }
}
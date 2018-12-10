class GamePage extends Component {
  constructor() {
    super();
    this.addRoute('/new-game', 'New Game');
    this.addEvents({ 'click #quit-game': 'newInput' });
    this.addEvents({ 'click #to-startpage': 'newInput' });
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

  newInput() {
    this.activeGame = false;
  }

  get playerOneName() {
    //Getter for player one name stuff
    return this.inputPage.playerOne.name;
  }
  
  get playerTwoName() {
    //Getter for player two name stuff
    return this.inputPage.playerTwo.name;
  }
}
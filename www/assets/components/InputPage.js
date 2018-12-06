class InputPage extends Component {
  constructor() {
    super();
    this.addEvents({ 'click #start-game': 'startGame' });
  }
  getInput() {

    const p1 = $('#player1-name');
    const p2 = $('#player2-name');
    let playerOne = p1.val().length >= 2 && p1.val().length <= 10;
    let playerTwo = p2.val().length >= 2 && p2.val().length <= 10;
    const playerOneOpponent = $('#type-of-player1').val();
    const playerTwoOpponent = $('#type-of-player2').val();

    if (playerOne === true) {
      playerOne = p1.val();

    }
    if (playerTwo === true) {
      playerTwo = p2.val();
    }

    /* this.game.createBoard(); */
  }

  startGame() {
    this.getInput();
    this.playPage.newGame(this.playerOne, this.playerTwo);
  }
}
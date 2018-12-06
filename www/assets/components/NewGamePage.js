class NewGamePage extends Component {
  constructor(playPage) {
    super();
    this.addEvents({ 'click #start-game': 'startGame' });
    this.playPage = playPage;
    this.playerOne = {};
    this.playerTwo = {};
  }
  getInput() {

    const p1 = $('#player-name');
    const p2 = $('#player2-name');
    let playerOne = p1.val().length >= 2 && p1.val().length <= 10;
    let playerTwo = p2.val().length >= 2 && p2.val().length <= 10;
    const playerOneOpponent = $('#type-of-player').val();
    const playerTwoOpponent = $('#type-of-player2').val();

    if (playerOne === true) {
      playerOne = p1.val();

    }
    if (playerTwo === true) {
      playerTwo = p2.val();
    }

    this.playerOne = {
      name: playerOne,
      type: playerOneOpponent
    }

    this.playerTwo = {
      name: playerTwo,
      type: playerTwoOpponent
    }
  }

  startGame() {
    this.getInput();
    this.playPage.newGame(this.playerOne, this.playerTwo);
  }
}
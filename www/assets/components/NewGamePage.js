class NewGamePage extends Component {
  constructor(addPlayerCallback, newGameCallback) {
    super();
    this.addRoute('/new-game', 'New Game');
    this.addEvents({ 'click #players-and-opponents': 'getInput' });

    this.addPlayerCallback = addPlayerCallback;
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

    console.log(playerOne);
    console.log(playerTwo);
    console.log(playerOneOpponent);
    console.log(playerTwoOpponent);

    this.addPlayerCallback(playerOne);
    this.addPlayerCallback(playerTwo);
  }
}
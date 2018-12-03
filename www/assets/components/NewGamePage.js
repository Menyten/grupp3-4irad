class NewGamePage extends Component {
  constructor() {
    super();
    this.addRoute('/new-game', 'New Game');
    this.addEvents({'click #players-and-opponents': 'getInput'});
  }
  getInput() {
    const playerOne = $('#player-name').val();
    const playerTwo = $('#player2-name').val();
    const playerOneOpponent = $('#type-of-player').val();
    const playerTwoOpponent = $('#type-of-player2').val();
    console.log(playerOne);
    console.log(playerTwo);
    console.log(playerOneOpponent);
    console.log(playerTwoOpponent);
  }
}
class InputPage extends Component {
  constructor(playPage) {
    super();
    this.addEvents({ 'click #start-game': 'startGame' });
    this.addEvents({'keyup .player-name': 'validateUsers'});
    this.playPage = playPage;
    this.playerOne;
    this.playerTwo;
    this.playersValidated = false;
  }
  
  getValidationStatus(){
    return this.playersValidated;
  }


  validateUsers(){
    const valRes = 0 + this.validateName($('#player1-name').val()) + this.validateName($('#player2-name').val());
    if (valRes === 2) {
      $('.inputButton').prop("disabled", false)
    }
  }

  validateName (name) {
    return name.length >= 2 && name.length <= 10
  };

  getInput() {

    const p1 = $('#player1-name');
    const p2 = $('#player2-name');
    let playerOne = p1.val().length >= 2 && p1.val().length <= 10;
    let playerTwo = p2.val().length >= 2 && p2.val().length <= 10;
    const playerOneType = $('#type-of-player1').val();
    const playerTwoType = $('#type-of-player2').val();

    if (playerOne === true) {
      this.playerOne = new Player(p1.val(), playerOneType);

    }
    if (playerTwo === true) {
      this.playerTwo = new Player(p2.val(), playerTwoType);
    }

  }

  startGame() {
    this.getInput();
    this.playPage.newGame(this.playerOne, this.playerTwo);
    $('footer').hide();
    $('nav').hide();
    $('.return').show();
  }
}
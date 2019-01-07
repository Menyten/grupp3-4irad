class InputPage extends Component {
  constructor(playPage) {
    super();
    this.addEvents({ 'click #start-game': 'startGame' });
    this.addEvents({'keyup .player-name': 'validateUsers'});

    this.addEvents({'click .player1-radiobuttons': 'selectPlayer1Type'});
    this.addEvents({'click .player2-radiobuttons': 'selectPlayer2Type'});
    this.playerOneType ='human';
    this.playerTwoType ='computer';

    this.addEvents({'click .player1-img-section': 'selectPlayer1Img'});
    this.player1PreviousTarget='.pirate1-img'; 
    this.playerOneImg='/assets/img/pirates/pirate1.jpg';
    this.addEvents({'click .player2-img-section': 'selectPlayer2Img'});
    this.player2PreviousTarget='.pirate4-img';
    this.playerTwoImg='/assets/img/pirates/pirate4.jpg';

    this.addEvents({'input .player-name': 'validateUsers'});
    this.playPage = playPage;
    this.playerOne;
    this.playerTwo;
    this.playersValidated = false;
  }
  
  selectPlayer1Type(event){
    if($(event.target).hasClass('player1-check-human')){this.playerOneType='human';}
    else if($(event.target).hasClass('player1-check-computer')){this.playerOneType='computer';}
  }
  selectPlayer2Type(event){
    if($(event.target).hasClass('player2-check-human')){this.playerTwoType='human';}
    else if($(event.target).hasClass('player2-check-computer')){this.playerTwoType='computer';}
  }

  selectPlayer1Img(event){
    if ($(event.target).hasClass('avatar-img')) {
      $(this.player1PreviousTarget).removeClass('active');
      $(event.target).addClass('active');
      this.player1PreviousTarget = event.target;
      this.playerOneImg = event.target.src;
    }
  }
  selectPlayer2Img(event){
    if ($(event.target).hasClass('avatar-img')) {
      $(this.player2PreviousTarget).removeClass('active');
      $(event.target).addClass('active');
      this.player2PreviousTarget = event.target;
      this.playerTwoImg = event.target.src;
    }
  }
 
  getValidationStatus(){
    return this.playersValidated;
  }

  validateUsers(){
    const valRes = 0 + this.validateName($('#player1-name').val()) + this.validateName($('#player2-name').val());
    if (valRes === 2) {
      $('.inputButton').prop("disabled", false)
    }
    if (valRes !== 2) {
      $('.inputButton').prop("disabled", true)
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

    if (playerOne === true) {
      this.playerOne = new Player(p1.val(), this.playerOneType, this.playerOneImg);
    }
    if (playerTwo === true) {
      this.playerTwo = new Player(p2.val(), this.playerTwoType, this.playerTwoImg);
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
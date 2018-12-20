class InputPage extends Component {
  constructor(playPage) {
    super();
    this.addEvents({ 'click #start-game': 'startGame' });
    this.addEvents({'keyup .player-name': 'validateUsers'});

    this.addEvents({'click .player1-check-human': 'checkBoxHuman'});
    this.addEvents({'click .player1-check-computer': 'checkBoxComputer'});
    this.addEvents({'click .player2-check-human': 'checkBoxHuman2'});
    this.addEvents({'click .player2-check-computer': 'checkBoxComputer2'});
    this.playerOneType ='human';
    this.playerTwoType ='computer';

    this.addEvents({'click .player1-img-section': 'selectPlayer1Img'});
    this.x;
    
    this.playerOneImg;

    this.playPage = playPage;
    this.playerOne;
    this.playerTwo;
    this.playersValidated = false;
  }

  checkBoxHuman(){
    this.playerOneType='human';
   // $('.playeronecheckboxuman').prop('checked', false);
  }
  checkBoxComputer(){
    this.playerOneType='computer';
  }
  checkBoxHuman2(){
    this.playerTwoType='human';
  }
  checkBoxComputer2(){
    this.playerTwoType='computer';
  }

  selectPlayer1Img(event){

    $(this.x).removeClass('active');
    $(event.target).addClass('active');
    this.x = event.target;

    this.playerOneImg = event.target.src;
    console.log(this.playerOneImg);

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
    //const playerOneType = $('#type-of-player1').val();
    //const playerTwoType = $('#type-of-player2').val();

    //const playerOneType = 'computer';
    //const playerTwoType = 'human';
    

    if (playerOne === true) {
      this.playerOne = new Player(p1.val(), this.playerOneType);
    }
    if (playerTwo === true) {
      this.playerTwo = new Player(p2.val(), this.playerTwoType);
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
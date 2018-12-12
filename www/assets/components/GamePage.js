class GamePage extends Component {
  constructor() {
    super();
    this.addRoute('/new-game', 'New Game');
    this.addEvents({ 'click #quit-game': 'newInput' });
    this.addEvents({ 'click #to-startpage': 'newInput' });
    this.addEvents({'click .showNavFoot': 'showNavFoot'});
    this.inputPage = new InputPage(this);
    this.modals = new Modals(this);
    this.game = new Board(this);
    this.activeGame = false;
  }

  newGame(playerOne, playerTwo) {
    this.activeGame = true;
    this.game = new Board(this);
    this.render();
  }

  newInput() {
    this.activeGame = false;
  }
  /**
   * Getter for player one stuff
   */
  get playerOneName() {
    return this.inputPage.playerOne.name;
  }
   /**
   * Getter for player two name stuff
   */
  get playerTwoName() {
    return this.inputPage.playerTwo.name;
  }
  
  showNavFoot(){
    // this.activeGame = false;
    $('footer').show();
    $('nav').show();
    $('.return').hide();
  }
}


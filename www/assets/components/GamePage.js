class GamePage extends Component {
  constructor() {
    super();
    this.addRoute('/new-game', 'New Game');
    this.addEvents({ 'click #quit-game': 'newInput' });
    this.addEvents({ 'click #to-startpage': 'newInput' });
    this.addEvents({'click .showNavFoot': 'showNavFoot'});
    console.log("I am GamePage and I am constructed with the id", this._id)
    this.modals = new Modals(this);
    App.modals = this.modals;
    this.inputPage = new InputPage(this);
    this.game = new Board(this);
    this.activeGame = false;
  }

  newGame(playerOne, playerTwo) {
    this.activeGame = true;
    this.game = new Board(this);
    this.game.focusPlayer();
    this.render();
  }

  newInput() {
    this.activeGame = false;
  }

  get playerOneName() {
    return this.inputPage.playerOne.name;
  }
  
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


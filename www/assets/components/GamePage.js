class GamePage extends Component {
  constructor() {
    super();
    this.addRoute('/new-game', 'New Game');
    this.addEvents({ 'click #quit-game': 'newInput' });
    this.addEvents({ 'click #to-startpage': 'newInput' });
    this.addEvents({'click .showNavFoot': 'showNavFoot'});
    this.modals = new Modals(this);
    App.modals = this.modals;
    App.gamePage = this;
    this.inputPage = new InputPage(this);
    this.game = new Board(this);
    this.activeGame = false;
  }

  newGame(playerOne, playerTwo) {
    this.activeGame = true;
    Marker.count = 0;
    this.game = new Board(this, playerOne, playerTwo);
    this.game.focusPlayer();
    this.render();
  }

  newInput() {
    this.activeGame = false;
  }
  
  showNavFoot(){
    // this.activeGame = false;
    $('footer').show();
    $('nav').show();
    $('.return').hide();
  }
}


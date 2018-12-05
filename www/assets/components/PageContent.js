class PageContent extends Component {
 
  constructor(){
    super();
    this.startPage = new StartPage();
    this.newGamePage = new NewGamePage(this.addPlayer.bind(this), this.newGame.bind(this) );
    this.spelPage = new SpelPage(this.newGame.bind(this));

    this.players = [];
  }

  newGame() {
    this.spelPage = new SpelPage(this.newGame.bind(this));
  }
  
  addPlayer(firstPlayer, secondPlayer) {
    this.players = [firstPlayer, secondPlayer];
    console.log(Router)
  }
}
class Board extends Component {
  constructor(playPage) {
    super();
    this.addRoute('/new-game', 'GAMETIME');
    this.columns = [];
    this.numberOfColumns = 7;
    this.numberOfRows = 6;
    this.createColumns();
    this.playPage = playPage;
    this.playerTurn = Math.floor((Math.random() * 2) + 1);
    this.focusPlayer();
  }

  createColumns() {
    // I made it so the columns know which alphabetic index they have
    // not sure if this is needed, check again when game is finished
    const indexes = 'acbedfg';
    for (var i = 0; i < this.numberOfColumns; i++) {
      this.columns = [...this.columns, new Column(100/this.numberOfColumns, indexes[i], this)];
    }
  }

  changeTurn(){
    if(this.playerTurn==1){
      this.playerTurn=2;
      $('#player1').addClass('active-player');
      $('#player2').removeClass('active-player');
      alert(this.playerTurn);
    }
    else if(this.playerTurn==2){
      this.playerTurn=1;
      $('#player2').addClass('active-player');
      $('#player1').removeClass('active-player');
      alert(this.playerTurn);
    }   
  }

  focusPlayer(){
    alert(this.playerTurn);
    $('#player'+this.playerTurn).addClass('active-player');
  }


}
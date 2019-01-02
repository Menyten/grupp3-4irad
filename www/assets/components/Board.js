class Board extends Component {
  constructor(playPage, player1, player2) {
    super();
    this.addRoute('/new-game', 'GAMETIME');
    this.columns = [];
    this.numberOfColumns = 7;
    this.numberOfRows = 6;
    this.createColumns();
    this.playPage = playPage;
    this.playerTurn = Math.floor((Math.random() * 2) + 1);  
    this.winChecker = new WinChecker();
    this.drawChecker = new DrawChecker();
    this.computerPlayer = new ComputerPlayer();
    this.gameEnded = false;

    this.player1 = player1
    this.player2 = player2
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
    if (this.gameEnded) { return }

    if(this.playerTurn==1){
      this.playerTurn=2;
      $('#player2').addClass('active-player');
      $('#player1').removeClass('active-player');
      if (this.player2.type === 'computer') {
        this.computerPlayer.makeMove(this.columns);
      }
    }
    else if(this.playerTurn==2){
      this.playerTurn=1;
      $('#player1').addClass('active-player');
      $('#player2').removeClass('active-player');
      if (this.player1.type === 'computer') {
        this.computerPlayer.makeMove(this.columns);
      }
    }   
  }

   focusPlayer(){
    
    if(this.playerTurn==1){
      $(document).ready( function(){
        $('#player1').addClass('active-player');
      });     
    }
    else if(this.playerTurn==2){
      $(document).ready( function(){
        $('#player2').addClass('active-player');
      });
    }
  }

  mounted() {
    if (this.playerTurn === 1 && this.player1.type === 'computer') {
      this.computerPlayer.makeMove(this.columns);
    } else if (this.playerTurn === 2 && this.player2.type === 'computer') {
      this.computerPlayer.makeMove(this.columns);
    }
  }

  animateWinningMarkers(markers) {
    this.animateNonWinningMarkers(markers);
    let animationDelay = 0;
    for (let marker of markers) {
      setTimeout(() => {
        marker.victoryAnimation();
      }, animationDelay)
      animationDelay += 60;
    }
  }

  animateNonWinningMarkers(winningMarkers = []) {
    let animationDelay = 0;
    for (let column of this.columns) {
      for (let marker of column.markers) {
        if (!winningMarkers.includes(marker)) {
          setTimeout(() => {
            marker.nonVictoryAnimation()
          }, animationDelay);
          animationDelay += 40;
        }
      }
    }
  }
}
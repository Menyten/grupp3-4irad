class Board extends Component {
  constructor(playPage) {
    super();
    
    this.gameBoard = [];
    this.numberOfColumns = 7;
    this.numberOfRows = 6;
    this.createColumns();
    this.playPage = playPage; /*Vad gör denna ?*/

    
    this.gameEngine = new GameEngine()
    this.PlayerTurn = this.gameEngine.firstTurn();
  }

  manageTurns(){
    this.PlayerTurn =this.gameEngine.changeTurn();
    //alert(this.PlayerTurn);
    
   
  }

  createColumns() {
    for (var i = 0; i < this.numberOfColumns; i++) {
      this.gameBoard = [...this.gameBoard, new Column(100/this.numberOfColumns,this)];
    }
  }

  createBoard() {
    console.log(this.gameBoard)
    return this.gameBoard;
  }

  addMarkerToColumn(columnIndex, player){
    if(this.gameBoard[columnIndex] < this.numberOfRows) {
      const newMarker = { player };
      this.gameBoard[columnIndex] = [this.gameBoard[columnIndex], newMarker];
    }
  }
}
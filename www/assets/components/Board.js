class Board extends Component {
  constructor() {
    super();
    this.gameBoard = [];
    this.numberOfColumns = 3;
    this.numberOfRows = 6;

    this.createColumns();
  }

  createColumns() {
    for (var i = 0; i < this.numberOfColumns; i++) {
      this.gameBoard = [...this.gameBoard, new Column(100/this.numberOfColumns)];
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
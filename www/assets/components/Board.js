class Board extends Component {
  constructor(playPage) {
    super();
    this.addRoute('/new-game', 'GAMETIME');
    this.columns = [];
    this.numberOfColumns = 7;
    this.numberOfRows = 6;
    this.createColumns();
    this.playPage = playPage;
  }

  createColumns() {
    // I made it so the columns know which alphabetic index they have
    // not sure if this is needed, check again when game is finished
    const indexes = 'acbedfg';
    for (var i = 0; i < this.numberOfColumns; i++) {
      this.columns = [...this.columns, new Column(100/this.numberOfColumns, indexes[i])];
    }
  }
}
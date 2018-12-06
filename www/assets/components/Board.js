class Board extends Component {
  constructor() {
    super();
    this.addRoute('/new-game', 'GAMETIME');
    this.columns = [];
    this.numberOfColumns = 7;
    this.numberOfRows = 6;
    this.createColumns();
  }

  createColumns() {
    const indexes = 'acbedfg';
    for (var i = 0; i < this.numberOfColumns; i++) {
      this.columns = [...this.columns, new Column(100/this.numberOfColumns, indexes[i])];
    }
  }
}
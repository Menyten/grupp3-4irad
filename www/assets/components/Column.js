class Column extends Component {
  constructor(columnWidth, index, board) {
    super();
    this.index = index
    this.markers = [];
    this.columnWidth = columnWidth;
    this.board = board;
    this.addEvents({
      'click': 'createMarker',
    });
  }

  createMarker(){    
    // some simple validation to prevent playing on full columns
    // at the moment it just does nothing if the colum is full, no error messages etc
    if (this.markers && this.markers.length < 6) {
      this.board.changeTurn();
      this.markers.push(new Marker(this.board.playerTurn));
      this.render();
      const potentialWin = this.board.winChecker.checkForWin(this.board.columns)
      if (potentialWin) {
        // in here we do whatever it is we wanna do when someone wins
        console.log('We have a winner!');
        console.log(potentialWin);
        
      }
      // when the game engine knows which player is playing we should also tell the marker which player it belongs to
    }

    
  }

  renderEmptySlots() {
    // the columns are set with flexbox to display the elements from bottom up
    // so after we render the markers, we fill the remaining spaces (if any) with empty divs
    let emptySlots = 6 - this.markers.length;
    let html = '';
    for (let i = 0; i < emptySlots; i++) {
      html += '<div class="marker-slot"><div class="empty"></div></div>';
    }
    return html
  }
}
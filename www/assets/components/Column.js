class Column extends Component {
  constructor(columnWidth, index, board) {
    super();
    this.index = index
    this.markers = [];
    this.columnWidth = columnWidth;
    this.board = board;
    //this.modals = new Modals();
    this.addEvents({
      'click': 'validateMove',
    });
  }

  validateMove() {
    if (this.board.playerTurn === 1 && this.board.player1.type === 'human') {
      return this.createMarker();
    }

    if (this.board.playerTurn === 2 && this.board.player2.type === 'human') {
      return this.createMarker();
    }
  }

  createMarker(){    
    if (this.board.gameEnded) {
     return
   }
    // some simple validation to prevent playing on full columns
    // at the moment it just does nothing if the colum is full, no error messages etc
    if (this.markers && this.markers.length < 6) {
      this.markers.push(new Marker(this.board.playerTurn));
      this.render();
      this.checkForWinOrDraw();
      this.board.changeTurn();
    }    
  }
  
  checkForWinOrDraw() {
    const potentialWin = this.board.winChecker.checkForWin(this.board.columns);
    if (potentialWin) {
      // in here we do whatever it is we wanna do when someone wins
      let winnerName = potentialWin.winner === 1 ? this.board.player1.name : this.board.player2.name;
      this.board.gameEnded = true;
      // App.modals.victoryModal(winnerName);
      this.board.animateWinningMarkers(potentialWin.markers);   
    }
    if (this.board.drawChecker.checkDraws(this.board.columns)) {
      this.board.gameEnded = true;
      App.modals.drawModal();
      this.board.animateNonWinningMarkers();
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

  show() {
    this.render();
    setTimeout(() => {
        this.baseEl.modal('show');
    }, 0);
  }

}
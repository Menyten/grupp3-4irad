class Game extends Component {
  constructor(playPage) {
    super();
    this.playPage = playPage;
    this.playerOne = {};
    this.playerTwo = {};
    this.game = '';
    this.playerOneMove = true;
    this.addNthIndexOfToStrings();

    this.addEvents({
      'click .playing-field .col-1': 'handleColumnClick'
    })

  }

  startGame(playerOne, playerTwo) {
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
    this.playerOneMove = true;
    if (playerOne.type === 'computer') {
      makeMove(makeComputerMove());
    }

  }

  handleColumnClick(event) {
    const move = event.target.className[0];

    if (!this.validateMove(move)) {
      alert('INVALID MOVE SUCKER')
      return
    }

    if (this.playerOneMove && this.playerOne.type === 'player') {
      this.makeMove(move);
      return
    }

    if (!this.playerOneMove && this.playerTwo.type === 'player') {
      this.makeMove(move);
    }   

  }

  validateMove(move) {
    const regex = new RegExp(move + '{1}', 'g');
    // identify which row the move was played on
    const previousMovesOnColumn = this.game.match(regex);
    if (previousMovesOnColumn && previousMovesOnColumn.length >= 6) {
      return false
    } else {
      return true
    }
  }

  makeMove(move) {
    this.game += move;
    this.playerOneMove = !this.playerOneMove;
    this.updatePlayingField(move);
    if(this.checkForWin()) {
      alert('YOU WIN');
    }

  }

  updatePlayingField(move) {
    //create a regexp pattern to search for previous moves on same column
    const regex = new RegExp(move + '{1}', 'g');
    // identify which row the move was played on
    const row = this.game.match(regex).length;

    if (this.game.length % 2 === 1) {
      //this means player one made the move
      this.baseEl.find(`.${move}.${row}`).addClass('player-one');
    } else {
      //otherwise player two made the move
      this.baseEl.find(`.${move}.${row}`).addClass('player-two');
    }
  }

  checkForWin() {
    this.checkForHorizontalWin();
    this.checkForVerticalWin();
    this.checkForDiagonalWin();
  }

  checkForHorizontalWin() {
    const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
    // this function checks row for row to see if theres any horizontal winning going on
    for (let i = 1; i <= 6; i++) {
      // make an array with the nth occurence of all the columns
      // this is equal to the nth row of the playing board
      const row = [];
      for (let column of columns) {
        row.push(this.game.nth_index_of(column, i) % 2)
        // these values will be -1 if played by noone, 0 if played by player1 and 1 if played by player two
      }

      //loop through the first four items to see if the following three are identical (indicating a win)

      for (let i = 0; i < 4; i++) {
        if (row[i] !== -1 && row[i] === row[i+1] && row[i] === row[i+2] && row[i] === row [i+3] ) {
          // return the number of the winning player
          alert('You win sucker');
          return row[i] ? 2 : 1
        }
      }         
    }
    // in case of no winner, return false
    return false;
  }

  checkForVerticalWin() {
    const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
    for (let column of columns) {
      const regex = new RegExp(column + '{1}', 'g');
      // this nifty regex will get us all the moves on the specified column
      const movesOnColumn = this.game.match(regex);
      // if there are no moves, or less than four, there is no need to check if a player has won on that column
      if (!movesOnColumn || movesOnColumn.length < 4) {
        continue;
      } else {
        // this is roughly the same logic as in the horizontal win checking
        for (let i = 1; i < movesOnColumn.length - 2; i++) {
          if (
            this.game.nth_index_of(column, i) % 2 === this.game.nth_index_of(column, i + 1) % 2
            && this.game.nth_index_of(column, i) % 2 === this.game.nth_index_of(column, i + 2) % 2
            && this.game.nth_index_of(column, i) % 2 === this.game.nth_index_of(column, i + 3) % 2          
            ) {
              alert('You win vertically');
              return this.game.nth_index_of(column, i) % 2 ? 2 : 1
            }
        }
      }

    }
  }

  checkForDiagonalWin() {
    // diagonal wins are possible upwards from the lower three rows and downwards from the higher three
    // due the constraints of the playing field, we can cover all cases if we check to the right from columns a-c
    // and to the left from columns e-g
    const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
    // first the outer loop for the first three columns
    for (let i = 0; i < 3; i++) {
      // and now the loop checking up and to the right from the bottom three rows
      for (let j = 1; j <= 3; j++) {
        if (
          this.game.nth_index_of(columns[i], j) !== -1
          && this.game.nth_index_of(columns[i], j) % 2 === this.game.nth_index_of(columns[i+1], j+1) % 2
          && this.game.nth_index_of(columns[i], j) % 2 === this.game.nth_index_of(columns[i+2], j+2) % 2
          && this.game.nth_index_of(columns[i], j) % 2 === this.game.nth_index_of(columns[i+3], j+3) % 2
        ) {
          alert('You win diagonally from bottom to top right')
          return this.game.nth_index_of(columns[i], j) ? 2 : 1
        }        
      }
      // loop checking down and to the right for the upper three rows
      for (let j = 4; j <= 6; j++) {
        if (
          this.game.nth_index_of(columns[i], j) !== -1
          && this.game.nth_index_of(columns[i], j) % 2 === this.game.nth_index_of(columns[i+1], j-1) % 2
          && this.game.nth_index_of(columns[i], j) % 2 === this.game.nth_index_of(columns[i+2], j-2) % 2
          && this.game.nth_index_of(columns[i], j) % 2 === this.game.nth_index_of(columns[i+3], j-3) % 2
        ) {
          alert('You win diagonally from top to bottom right')
          return this.game.nth_index_of(columns[i], j) ? 2 : 1
        }        
      }

    }
    // and now the outer loop for the last three columns: 
    for (let i = 4; i < 7; i++) {
      // and the loop checking up and to the left for the bottom three rows
      for (let j = 1; j <= 3; j++) {
        if (
          this.game.nth_index_of(columns[i], j) !== -1
          && this.game.nth_index_of(columns[i], j) % 2 === this.game.nth_index_of(columns[i-1], j+1) % 2
          && this.game.nth_index_of(columns[i], j) % 2 === this.game.nth_index_of(columns[i-2], j+2) % 2
          && this.game.nth_index_of(columns[i], j) % 2 === this.game.nth_index_of(columns[i-3], j+3) % 2
        ) {
          alert('You win diagonally from bottom to top left')
          return this.game.nth_index_of(columns[i], j) ? 2 : 1
        }        
      }
      // loop checking down and to the right for the upper three rows
      for (let j = 4; j <= 6; j++) {
        if (
          this.game.nth_index_of(columns[i], j) !== -1
          && this.game.nth_index_of(columns[i], j) % 2 === this.game.nth_index_of(columns[i-1], j-1) % 2
          && this.game.nth_index_of(columns[i], j) % 2 === this.game.nth_index_of(columns[i-2], j-2) % 2
          && this.game.nth_index_of(columns[i], j) % 2 === this.game.nth_index_of(columns[i-3], j-3) % 2
        ) {
          alert('You win diagonally from top to bottom left')
          return this.game.nth_index_of(columns[i], j) ? 2 : 1
        }        
      }

    }
  }


  addNthIndexOfToStrings() {
    String.prototype.nth_index_of = function(pattern, n) {
      let i = -1;
  
      while (n-- && i++ < this.length) {
          i = this.indexOf(pattern, i);
          if (i < 0) break;
      }
  
      return i;
  }
  }
}
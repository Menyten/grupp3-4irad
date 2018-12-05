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
    const column = event.target.className[0];
    if (this.playerOneMove && this.playerOne.type === 'player') {
      this.makeMove(column);
      return;
    }
    if (!this.playerOneMove && this.playerTwo.type === 'player') {
      this.makeMove(column);
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
  }

  checkForHorizontalWin() {
    // this function checks row for row to see if theres any horizontal winning going on
    for (let i = 1; i <= 6; i++) {
      // make an array with the nth occurence of the column in question
      // this is equal to the nth row of the playing board
      const row = [
        // these values will be -1 if played by noone, 0 if played by player1 and 1 if played by player two
        this.game.nth_index_of('a', i) % 2,
        this.game.nth_index_of('b', i) % 2,
        this.game.nth_index_of('c', i) % 2,
        this.game.nth_index_of('d', i) % 2,
        this.game.nth_index_of('e', i) % 2,
        this.game.nth_index_of('f', i) % 2,
        this.game.nth_index_of('g', i) % 2,
      ]

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
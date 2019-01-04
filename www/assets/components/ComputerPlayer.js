class ComputerPlayer {
  constructor(columns) {
    this.winchecker = new WinChecker();
    this.columns = columns
  }

  get gameboard() {
    return this.reduceColumns(this.columns);
  }

  get player() {
    return Marker.count % 2 === 1 ? 2 : 1;
  }

  get enemy() {
    return Marker.count % 2 === 1 ? 1 : 2;
  }

  makeMove(columns) {
    // let move = Math.round(Math.random()*6);
    // if (columns[move].markers && columns[move].markers.length < 6) {
    //   return setTimeout(() => { columns[move].createMarker() }, 2000)
    // } else {
    //   for (let column of columns) {
    //     if (column.markers.length < 6) {
    //       return setTimeout(() => { column.createMarker() }, 2000)
    //     }
    //   }
    // }
    setTimeout(() => this.makeSmartMove(), 2000);
  }

  makeRealMove(move) {
    this.columns[move].createMarker();
  }

  chooseRandomMove(moves) {
    if (moves.length === 1) {
      return this.makeRealMove(moves[0])
    }
    const random = Math.random();
    const move = Math.round(random * (moves.length - 1));
    this.makeRealMove(moves[move]);
  }

  reduceColumns(columns) {
    const reduced = columns.map((column) => {
      const markers = column.markers.map((marker) => marker.player ? marker.player : 0);
      while (markers.length < 6) {
        markers.push(0);
      }
      return markers
    });
    return reduced
  }

  

  makeSmartMove() {
    const legalMoves = this.findLegalMoves();
    const evaluations = {};
    for (let move of legalMoves) {
      evaluations[move] = this.evaluateMove(move);
    }
    // console.log('evaluations for player', this.player, evaluations);
    // find the evaluation of the best move
    let bestMoveEval = 0;
    for (let key in evaluations) {
      if (evaluations[key] > bestMoveEval) {
        bestMoveEval = evaluations[key];
      }
    }
    const bestMoves = []
    // find all the moves with the best evaluation
    for (let key in evaluations) {
      if (evaluations[key] === bestMoveEval) {
        bestMoves.push(key);
      }
    }
    this.chooseRandomMove(bestMoves);
  }

  findLegalMoves() {
    const legalMoves = [];
    for (let i = 0; i <= 6; i++) {
      if (this.columns[i].markers.length < 6) {
        legalMoves.push(i);
      }
    }
    return legalMoves
  }

  evaluateMove(move) {
    let evaluation = 0;
    const board = this.makeTheoreticalMove(this.gameboard, move, this.player);
    const win = this.winchecker.reducedBoardWinChecker(board);
    if (win === this.player) {
      return 10000
    }
    // see if we can win by making two moves in a row, if so give 50 evaluation
    for (let i = 0; i <= 6; i++) {
      const newBoard = this.makeTheoreticalMove(board, i, this.player);
      const win = this.winchecker.reducedBoardWinChecker(newBoard);
      if (win === this.player) {
        evaluation += 50;
      }
    }
    // see if opponent can win, if so give minus 100 evaluation
    for (let i = 0; i <= 6; i++) {
      const newBoard = this.makeTheoreticalMove(board, i, this.enemy);
      const win = this.winchecker.reducedBoardWinChecker(newBoard);
      if (win === this.enemy) {
        evaluation -= 10000;
      }
    }
    return evaluation
  }

  makeTheoreticalMove(board, move, player) {
    // returns state of game after move was made
    // deep clone the board so we don't modify the existing one
    const newBoard = board.map((array) => array.slice(0));
    const index = newBoard[move].indexOf(0);
    newBoard[move].splice(index, 1, player);
    return newBoard
  }

  
    
}
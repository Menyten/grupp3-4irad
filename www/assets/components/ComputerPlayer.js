class ComputerPlayer {
  constructor(columns) {
    this.winchecker = new WinChecker();
    this.threatChecker = new ThreatChecker();
    this.positionEvaluator = new PositionEvaluator();
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
    if (this.player === 2) {
      setTimeout(() => this.makeSmartMove(), 2000);

    } else {

      setTimeout(() => this.makeDeepMove(), 2000);
    }
  }

  makeRealMove(move) {
    console.log('making move', move);
    this.columns[move].createMarker();
  }
  
  makeDeepMove() {
    const evaluations = this.positionEvaluator.evaluateWithDepth(this.gameboard, 50);
    const move = this.positionEvaluator.chooseBestMove(evaluations, this.player);
    this.makeRealMove(move);
  }

  chooseRandomMove(moves) {
    if (moves.length === 1) {
      console.log('there is but one move', moves);
      return this.makeRealMove(moves[0])
    }
    const moveOrder = [3, 4, 2, 1, 5, 0, 6];
    for (let move of moveOrder) {
      if (moves.includes(move)) {
        console.log('chose move', move, 'from', moves);
        return this.makeRealMove(move);
      } else {
        console.log('I wanted to do move', move, 'but it wasnt in my options', moves);
      }
    }
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
    console.log('evaluations for player', this.player, evaluations);
    // find the evaluation of the best move
    let bestMoveEval = -10000
    for (let key in evaluations) {
      if (evaluations[key] > bestMoveEval) {
        bestMoveEval = evaluations[key];
      }
    }
    const bestMoves = []
    // find all the moves with the best evaluation
    for (let key in evaluations) {
      if (evaluations[key] === bestMoveEval) {
        bestMoves.push(+key);
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
    // see if we get any nice threats
    const threats = this.threatChecker.getAllThreats(board);
    const playableThreats = threats.filter(threat => threat.playable === true && threat.player === this.player);
    const unplayableThreats = threats.filter(threat => threat.playable === false && threat.player == this.player);
    if (playableThreats.length > 1) {
      console.log('I will have two or more playable threats if I make move', move);
      evaluation += 700
    }
    for (let threat of unplayableThreats) {
      if (this.player === 1 && threat.odd) {
        evaluation += 50;
      } else if (this.player === 1 && !threat.odd) {
        evaluation += 11;
      } else if (this.player === 2 && threat.odd) {
        evaluation += 12;
      } else if (this.player === 2 && !threat.odd) {
        evaluation += 60;
      }
    }

    // see if opponent can win, if so give minus 1000 evaluation
    // if opponent gets nice threats, give minus also
    for (let i = 0; i <= 6; i++) {
      const newBoard = this.makeTheoreticalMove(board, i, this.enemy);
      const win = this.winchecker.reducedBoardWinChecker(newBoard);
      if (win === this.enemy) {
        evaluation -= 1000;
        continue
      }
      const threats = this.threatChecker.getAllThreats(newBoard);
      const playableThreats = threats.filter(threat => threat.playable === true && threat.player === this.enemy);
      const unplayableThreats = threats.filter(threat => threat.playable === false && threat.player == this.enemy);
      if (playableThreats.length > 1) {
        evaluation -= 800;
        continue
      }
      for (let threat of unplayableThreats) {        
        if (this.enemy === 1) {
          evaluation -= threat.odd ? 50 : 11
        } else {
          evaluation -= threat.odd ? 12 : 60
        }
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
  
  evaluateNMoves(n) {
    const player = this.player;
    const enemy = this.enemy;
    let evaluation = -10000;
    const results = {};
    for (let i = 0; i <= 6; i++) {
      const board = makeTheoreticalMove(this.gameboard, i, player);
      results[i] = this.positionEvaluator.evaluatePosition(board);
    }
  }
}
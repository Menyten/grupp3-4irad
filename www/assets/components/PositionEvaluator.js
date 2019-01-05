class PositionEvaluator {
  constructor() {
    this.threatChecker = new ThreatChecker();
    this.winChecker = new WinChecker();
  }
  // this motherfucker evaluates positions
  // positive numbers are good for player one, negative good for player two
  evaluatePosition(board) {
    let evaluation = 0;
    const player = this.determinePlayerTurn(board);
    const win = this.winChecker.reducedBoardWinChecker(board);
    if (win) {
      return win === 1 ? 9999 : -9999
    }
    if (player === 1) {
      return this.evaluatePlayerOneTurn(board)
    } else {
      return this.evaluatePlayerTwoTurn(board)
    }
  }

  evaluatePlayerOneTurn(board) {
    let evaluation = 0;
    const { 
      playerOnePlayableThreats, playerOneUnplayableThreats, playerTwoPlayableThreats, playerTwoUnplayableThreats 
    } = this.getThreats(board);
    if (playerOnePlayableThreats.length > 0) {
      return 9998
    }
    if (playerTwoPlayableThreats.length > 1) {
      return -9997
    }
    if (playerTwoPlayableThreats === 1) {
      let moveOfDeath = playerTwoPlayableThreats[0].winningMove;
      moveOfDeath[1]++;
      if (playerTwoUnplayableThreats.some(threat => threat.winningMove === moveOfDeath)) {
        return -9996
      }
    }
    const playerOneHasOddThreat = playerOneUnplayableThreats.some(threat => threat.odd);
    const playerOneHasEvenThreat = playerOneUnplayableThreats.some(threat => !threat.odd);
    const playerTwoHasOddThreat = playerTwoUnplayableThreats.some(threat => threat.odd);
    const playerTwoHasEvenThreat = playerTwoUnplayableThreats.some(threat => !threat.odd);

    if (playerOneHasOddThreat && playerTwoHasOddThreat) {
      return 0
    }
    if (playerOneHasOddThreat && !playerTwoHasOddThreat) {
      return 100
    }
    if (playerTwoHasEvenThreat && !playerOneHasEvenThreat) {
      return -100
    } else {
      return 0
    }

    return evaluation
  }

  evaluatePlayerTwoTurn(board) {
    const { 
      playerOnePlayableThreats, playerOneUnplayableThreats, playerTwoPlayableThreats, playerTwoUnplayableThreats 
    } = this.getThreats(board);
    if (playerTwoPlayableThreats.length > 0) {
      return -9998
    }
    if (playerOnePlayableThreats.length > 1) {
      return 9997
    }
    if (playerOnePlayableThreats === 1) {
      let moveOfDeath = playerOnePlayableThreats[0].winningMove;
      moveOfDeath[1]++;
      if (playerOneUnplayableThreats.some(threat => threat.winningMove === moveOfDeath)) {
        return 9996
      }
    }
    const playerOneHasOddThreat = playerOneUnplayableThreats.some(threat => threat.odd);
    const playerOneHasEvenThreat = playerOneUnplayableThreats.some(threat => !threat.odd);
    const playerTwoHasOddThreat = playerTwoUnplayableThreats.some(threat => threat.odd);
    const playerTwoHasEvenThreat = playerTwoUnplayableThreats.some(threat => !threat.odd);

    if (playerOneHasOddThreat && playerTwoHasOddThreat) {
      return 0
    }
    if (playerOneHasOddThreat && !playerTwoHasOddThreat) {
      return 100
    }
    if (playerTwoHasEvenThreat && !playerOneHasEvenThreat) {
      return -100
    } else {
      return 0
    }
  }

  determinePlayerTurn(board) {
    // determine whos turn it is by counting the markers
    let markers = 0;
    for (let column of board) {
      for (let marker of column) {
        if (marker !== 0) {
          markers++;
        }
      }
    }
    return markers % 2 === 1 ? 2 : 1
  }

  makeTheoreticalMove(board, move) {
    // returns state of game after move was made
    // deep clone the board so we don't modify the existing one
    const player = this.determinePlayerTurn(board);
    const newBoard = board.map((array) => array.slice(0));
    const index = newBoard[move].indexOf(0);
    newBoard[move].splice(index, 1, player);
    return newBoard
  }

  getThreats(board) {
    const threats = this.threatChecker.getAllThreats(board);
    const playerOnePlayableThreats = threats.filter(threat => threat.player === 1 && threat.playable === true);
    const playerOneUnplayableThreats = threats.filter(threat => threat.player === 1 && threat.playable === false);
    const playerTwoPlayableThreats = threats.filter(threat => threat.player === 2 && threat.playable === true);
    const playerTwoUnplayableThreats = threats.filter(threat => threat.player === 2 && threat.playable === false);

    return {
      playerOnePlayableThreats: playerOnePlayableThreats,
      playerOneUnplayableThreats: playerOneUnplayableThreats,
      playerTwoPlayableThreats: playerTwoPlayableThreats,
      playerTwoUnplayableThreats: playerTwoUnplayableThreats
    }
  }

  // and now we try to make a function to evaluate the position after checking a few moves into the future, making the best move for each player
  evaluateWithDepth(board, depth) {
    const evaluations = {};
    // one loop for each move
    const legalMoves = this.findLegalMoves(board);
    if (legalMoves.length === 0) {
      return evaluatePosition(board);
    }

    for (let move of legalMoves) {
      let newBoard = this.makeTheoreticalMove(board, move);
      // now make the best move for each player 'depth' amount of times
      for (let j = 1; j < depth; j++) {
        const player = this.determinePlayerTurn(newBoard);
        evaluations[move] = this.evaluatePosition(newBoard);
        evaluations[move] = this.adjustEvaluationBasedOnTurns(evaluations[move], player, j);
        if (this.winChecker.reducedBoardWinChecker(newBoard)) { break }
        console.log('evluation for the nth time', j);
        const newEvaluations = this.evaluateMoves(newBoard);
        const bestMove = this.chooseBestMove(newEvaluations, player);
        newBoard = this.makeTheoreticalMove(newBoard, bestMove);
        if (this.findLegalMoves(newBoard).length === 0) { break }
      }
    }
    console.log('evaluations with depth', depth, evaluations, 'for board', board);
    return evaluations
  }

  adjustEvaluationBasedOnTurns(evaluation, player, turns) {
    if (player === 1 && (evaluation < -600 || evaluation > 600)) {
      return evaluation < 0 ? evaluation + turns : evaluation - turns      
    }
    if (player === 2 && (evaluation < -600 || evaluation > 600)) {
      return evaluation < 0 ? evaluation + turns : evaluation - turns      
    }
    return evaluation
  }

  evaluateMoves(board) {
    console.log('evaluating all the moves for ', board);
    // this function evaluates all seven possible moves and returns an object with all the evaluations
    const evaluations = {};
    for (let move of this.findLegalMoves(board)) {
      evaluations[move] = this.evaluatePosition(this.makeTheoreticalMove(board, move));
    }
    return evaluations
  }

  chooseBestMove(evaluations, player) {
    // chooses the best move from an object containing the evaluations
    let highest = -20000;
    let lowest = 20000;
    // get the highest and lowest evaluation
    for (let move in evaluations) {
      if (evaluations[move] > highest) {
        highest = evaluations[move]
      }
      if (evaluations[move] < lowest) {
        lowest = evaluations[move]
      }
    }
    // find all the moves that share the highest/lowest evaluation
    const playerOneMoves = [];
    const playerTwoMoves = [];
    for (let move in evaluations) {
      if (evaluations[move] === highest) {
        playerOneMoves.push(+move);
      }
      if (evaluations[move] === lowest) {
        playerTwoMoves.push(+move);
      }
    }
    // return a move with the highest eval if player one turn, otherwise return lowest eval move
    if (player === 1) {
      return this.chooseFromEqualMoves(playerOneMoves)
    } else {
      return this.chooseFromEqualMoves(playerTwoMoves)
    }
  }

  chooseFromEqualMoves(moves) {
    // we choose a move based on the order in the array below
    for (let move of [3, 4, 2, 5, 1, 0, 6]) {
      if (moves.includes(move)) {
        return move
      }
    }
  }

  findLegalMoves(board) {
    const legalMoves = [];
    // if there is a 0 anywhere in the column, add its index to the list of legal moves
    for (let i = 0; i <= 6; i++) {
      if (board[i].indexOf(0) >= 0) {
        legalMoves.push(i);
      }
    }
    return legalMoves
  }
}
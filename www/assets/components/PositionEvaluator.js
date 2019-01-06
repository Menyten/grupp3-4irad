class PositionEvaluator {
  constructor() {
    this.threatChecker = new ThreatChecker();
    this.winChecker = new WinChecker();
  }
  // this motherfucker evaluates positions
  // positive numbers are good for player one, negative good for player two
  evaluatePosition(board) {
    const win = this.winChecker.reducedBoardWinChecker(board);
    // if the position is won it is easy to evaluate
    if (win) {
      return win === 1 ? 9999 : -9999
    }
    return this.evaluateThreats(board);
  }

  evaluateThreats(board) {
    // we want the player&enemy as a string so we can use it as a property key
    const player = this.determinePlayerTurn(board).toString();
    const enemy = player === '1' ? '2' : '1';
    let evaluation = 0;
    // get the threats, split up by player and immediate playability
    const threats = this.getThreats(board);
    // first evaluate the playable threats
    evaluation = this.evaluatePlayableThreats(threats, player, enemy);
    // if we find a won position, return it, otherwise move on to unplayable threats evaluation
    if (evaluation) { return evaluation }
    evaluation = this.evaluateUnplayableThreats(board, threats, player, enemy);
    
    // we have no more tricks so just return the evals
    
    return evaluation
  }

  evaluatePlayableThreats(threats, player, enemy) {
    // this function will return evaluation for positions that are clearly won or lost, otherwise false
    // if the player whose turn it is has a playable threat, it is again easy to evaluate
    if (threats[player].playable.length > 0) {
      return player === '1' ? 9998 : -9998
    }
    // if the enemy has two different playable threats, it is again easy to evaluate
    if (threats[enemy].playable.length > 1) {
      return player === '1' ? -9997 : 9997
    }
    // if the enemy has a playable threat, and an unplayable that becomes playable if I prevent the first one, its again lost
    if (threats[enemy].playable.length === 1) {
      // so we check if enemy has another threat with the winning move directly above the first one
      let moveOfDeath = threats[enemy].playable[0].winningMove;
      moveOfDeath[1]++;
      if (threats[enemy].unplayable.some(threat => threat.winningMove === moveOfDeath)) {
        return player === '1' ? -9996 : 9996
      }
    }
    return false
  }

  evaluateUnplayableThreats(board, threats, player, enemy) {
    let evaluation = 0;
    // we try to evaluate a position based on the threats
    const playerOneHasOddThreat = threats['1'].unplayable.some(threat => threat.odd);
    const playerOneHasEvenThreat = threats['1'].unplayable.some(threat => !threat.odd);
    const playerTwoHasOddThreat = threats['2'].unplayable.some(threat => threat.odd);
    const playerTwoHasEvenThreat = threats['2'].unplayable.some(threat => !threat.odd);

    // if player one has an odd threat and player two does not, its good news for player one
    if (playerOneHasOddThreat && !playerTwoHasOddThreat) {
      evaluation += 200;
    }
    // if player two has an even threat, its good for player two but not good enough if player one has an odd threat and player two does not
    if (playerTwoHasEvenThreat) {
      evaluation -= 100;
    }
    // even threats are not very effective for player one, but its better than nothing
    if (playerOneHasEvenThreat) {
      evaluation += 1;
    }
    return evaluation
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
    const splitThreats = {
      '1': {},
      '2': {}
    }
    // split the threats up by player & playability for easy processing
    splitThreats['1'].playable = threats.filter(threat => threat.player === 1 && threat.playable === true);
    splitThreats['1'].unplayable = threats.filter(threat => threat.player === 1 && threat.playable === false);
    splitThreats['2'].playable = threats.filter(threat => threat.player === 2 && threat.playable === true);
    splitThreats['2'].unplayable = threats.filter(threat => threat.player === 2 && threat.playable === false);

    return splitThreats
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
      // now make the best (to our knowledge) move for each player 'depth' amount of times
      for (let j = 1; j < depth; j++) {
        const player = this.determinePlayerTurn(newBoard);
        evaluations[move] = this.evaluatePosition(newBoard);
        // adjust winning/losing moves based on how many turns it takes, so to "stay alive" longer in a losing game
        // and win faster in a won game
        evaluations[move] = this.adjustEvaluationBasedOnTurns(evaluations[move], player, j);
        // if a player has won or drawn, make no more moves
        if (this.winChecker.reducedBoardWinChecker(newBoard) || this.findLegalMoves(newBoard).length === 0) { break }
        // otherwise, make the best move and update the state of the board
        const newEvaluations = this.evaluateMoves(newBoard);
        const bestMove = this.chooseBestMove(newEvaluations, player);
        newBoard = this.makeTheoreticalMove(newBoard, bestMove);
        // if the board is full, make no more moves
        if (this.findLegalMoves(newBoard).length === 0) { break }
      }
    }
    return evaluations
  }

  adjustEvaluationBasedOnTurns(evaluation, player, turns) {
    // moves that lose slower and win faster get more favorable evaluation
    if (player === 1 && (evaluation < -600 || evaluation > 600)) {
      return evaluation < 0 ? evaluation + turns : evaluation - turns      
    }
    if (player === 2 && (evaluation < -600 || evaluation > 600)) {
      return evaluation < 0 ? evaluation + turns : evaluation - turns      
    }
    return evaluation
  }

  evaluateMoves(board) {
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
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

  makeTheoreticalMove(board, move, player) {
    // returns state of game after move was made
    // deep clone the board so we don't modify the existing one
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
}
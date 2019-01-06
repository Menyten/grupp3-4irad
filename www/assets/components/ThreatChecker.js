class ThreatChecker {
  constructor() {
    window.threatChecker = this;
  }
  generateCoords(x, y, incX, incY) {
    // function to generate set of four coordinates with given start values and increments
    return [[x,y], [x += incX, y += incY], [x += incX, y += incY], [x += incX, y += incY]]
  }

  getAllThreats(b) {
    // this function is ugly and repeats itself too much but I'm not motivated to fix it
    // b is for board
    const threats = [];
    // check horizontal threats
    for (let i = 0; i <= 3; i++) {
      for (let j = 0; j <= 5; j++) {
        const markers = [b[i][j], b[i+1][j], b[i+2][j], b[i+3][j]];
        const threat = this.threatExists(markers);
        if (threat) {
          // zeroindex is the relative index of the column with the empty slot (so 0 if its the leftmost column of the threat)
          const zeroIndex = markers.indexOf(0);
          const coords = this.generateCoords(i, j, 1, 0);
          const playable = this.isThreatPlayable(b, coords, zeroIndex);
          const winningMove = coords[zeroIndex];
          if (!threats.some(oldThreat => oldThreat.winningMove === winningMove && oldThreat.player === threat)) {
            threats.push({
              player: threat,
              playable: playable,
              odd: j % 2 === 1 ? false : true,
              winningMove: winningMove
            })
          }
        }
      }
    }
    // vertical threats are always playable... but still
    for (let i = 0; i <= 6; i++) {
      for (let j = 0; j <= 2; j++) {
        const markers = [b[i][j], b[i][j+1], b[i][j+2], b[i][j+3]];
        const threat = this.threatExists(markers);
        const winningMove = [i, j+3];
        if (threat) {
          if (!threats.some(oldThreat => oldThreat.winningMove === winningMove && oldThreat.player === threat)) {
            threats.push({
              player: threat,
              playable: true,
              odd: (j + 3) % 2 === 1 ? false : true,
              winningMove: winningMove
            })
          }
        }
      }
    }

    //diagonal threatz
    for (let i = 0; i <= 3; i++) {
      for (let j = 0; j <= 2; j++) {
        const markers = [b[i][j], b[i+1][j+1], b[i+2][j+2], b[i+3][j+3]];
        const threat = this.threatExists(markers);
        if (threat) {
          const zeroIndex = markers.indexOf(0);
          const coords = this.generateCoords(i, j, 1, 1);
          const playable = this.isThreatPlayable(b, coords, zeroIndex);
          const winningMove = coords[zeroIndex];
          if (!threats.some(oldThreat => oldThreat.winningMove === winningMove && oldThreat.player === threat)) {
            threats.push({
              player: threat,
              playable: playable,
              odd: (j + zeroIndex) % 2 === 1 ? false : true,
              winningMove: winningMove
            })
          }
        }
      }
      for (let j = 3; j <= 5; j++) {
        const markers = [b[i][j], b[i+1][j-1], b[i+2][j-2], b[i+3][j-3]];
        const threat = this.threatExists(markers);
        if (threat) {
          const zeroIndex = markers.indexOf(0);
          const coords = this.generateCoords(i, j, 1, -1);
          const playable = this.isThreatPlayable(b, coords, zeroIndex);
          const winningMove = coords[zeroIndex];
          if (!threats.some(oldThreat => oldThreat.winningMove === winningMove && oldThreat.player === threat)) {
            threats.push({
              player: threat,
              playable: playable,
              odd: (j - zeroIndex) % 2 === 1 ? false : true,
              winningMove: winningMove
            })
          }
        }
      }
    }


    return threats
  }

  threatExists(markers) {
    // check if 3 values of the given four are either one or two, and the other one is zero
    for (let player of [1, 2]) {
      let count = 0;
      for (let marker of markers) {
        if (marker === player) {
          count++;
        }
      }
      if (count === 3 && markers.indexOf(0) > -1) {
        return player
      } 
    }
    return false
  }

  isThreatPlayable(board, coords, zeroIndex) {
    // coords is the set of coordinates for the whole threat, zeroindex is the relative index of empty slot
    // so coords[zeroIndex[0]] is the x-coordinate (column) of the empty slot in the threat
    // if the first zero of that column has the same index as the y-coordinate (row) of the empty slot of the threat
    // it can be immediately played
    if (board[coords[zeroIndex][0]].indexOf(0) === coords[zeroIndex][1]) {
      return true
    } else {
      return false
    }
  }
}
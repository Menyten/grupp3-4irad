class WinChecker {
  checkForWin(columns) {
    let potentialWin = this.checkForHorizontalWin(columns);
    if (potentialWin) { return potentialWin }
    potentialWin = this.checkForVerticalWin(columns);
    if (potentialWin) { return potentialWin }
    potentialWin = this.checkForDiagonalWin(columns);
    return potentialWin;
  }

  checkForHorizontalWin(columns) {
    // for each row, loop through the first three markers and check if the following four are placed by the same playa

    // outer loop for rows
    for (let i = 0; i <= 6; i++) {
      // inner loop for columns
      for (let j = 0; j <= 3; j++) {
        // check if all markers we want to look up really exist, if not, continue
        if (!columns[j].markers[i] || !columns[j + 1].markers[i] || !columns[j + 2].markers[i] || !columns[j + 3].markers[i]) {
          continue;
        }
        // then check if all four were placed by the same player
        if (
          columns[j].markers[i].player === columns[j + 1].markers[i].player
          && columns[j].markers[i].player === columns[j + 2].markers[i].player
          && columns[j].markers[i].player === columns[j + 3].markers[i].player
        ) {
          // save the winner as a variable
          const winner = columns[j].markers[i].player
          // save the four winning markers to an array
          const markers = [columns[j].markers[i], columns[j + 1].markers[i], columns[j + 2].markers[i], columns[j + 3].markers[i]];
          // check if there are more connected markers by the same player, if so add them too
          let k = 4;
          while (columns[j + k]) {
            if (columns[j + k].markers[i] && columns[j + k].markers[i].player === winner) {
              markers.push(columns[j + k].markers[i]);
            }
            k++;
          }
          // return the information about the win
          return {

            moves: Math.ceil(Marker.count / 2),
            winner: winner,
            markers: markers
          }
        }
      }
    }
  }

  checkForVerticalWin(columns) {
    // loop through all columns:
    for (let i = 0; i <= 6; i++) {
      // if there less than four markers, move on to the next
      if (columns[i].markers.length < 4) {
        continue
      }
      // else check four in a row from bottom to top, as many times as needed
      for (let j = 0; j < columns[i].markers.length - 3; j++) {
        if (
          columns[i].markers[j].player === columns[i].markers[j + 1].player
          && columns[i].markers[j].player === columns[i].markers[j + 2].player
          && columns[i].markers[j].player === columns[i].markers[j + 3].player
        ) {
          return {
            winner: columns[i].markers[j].player,

            moves: Math.ceil(Marker.count / 2),
            markers: [columns[i].markers[j + 3], columns[i].markers[j + 2], columns[i].markers[j + 1], columns[i].markers[j]]
          }
        }
      }
    }
  }

  checkForDiagonalWin(columns) {
    // we can cover all possible diagonal wins if we check "to the right" from the first four columns, checking upwards from the lower three rows and downwards from the higher three
    // first the outer loop for the columns
    for (let i = 0; i <= 3; i++) {
      // then the inner loop checking upwards from the bottom three rows
      for (let j = 0; j <= 2; j++) {
        if (
          columns[i].markers[j] && columns[i + 1].markers[j + 1] && columns[i + 2].markers[j + 2] && columns[i + 3].markers[j + 3]
          && columns[i].markers[j].player === columns[i + 1].markers[j + 1].player
          && columns[i].markers[j].player === columns[i + 2].markers[j + 2].player
          && columns[i].markers[j].player === columns[i + 3].markers[j + 3].player
        ) {
          // save the winner as a variable
          const winner = columns[i].markers[j].player
          // save the four winning markers to an array:
          const markers = [columns[i].markers[j], columns[i + 1].markers[j + 1], columns[i + 2].markers[j + 2], columns[i + 3].markers[j + 3]];
          // check if there are more connected markers by the same player, if so add them too
          let k = 4;
          while (columns[i + k] && columns[i + k].markers[j + k]) {
            if (columns[i + k].markers[j + k].player === winner) {
              markers.push(columns[i + k].markers[j + k]);
            }
            k++;
          }
          // return information about the win
          return {
            moves: Math.ceil(Marker.count / 2),
            winner: winner,
            markers: markers,

          }
        }
      }

      // and the inner lopp for checking downwards from the top three rows
      for (let j = 3; j <= 5; j++) {
        if (
          columns[i].markers[j] && columns[i + 1].markers[j - 1] && columns[i + 2].markers[j - 2] && columns[i + 3].markers[j - 3]
          && columns[i].markers[j].player === columns[i + 1].markers[j - 1].player
          && columns[i].markers[j].player === columns[i + 2].markers[j - 2].player
          && columns[i].markers[j].player === columns[i + 3].markers[j - 3].player
        ) {
          // save the winner as a variable
          const winner = columns[i].markers[j].player
          // save the four winning markers to an array:
          const markers = [columns[i].markers[j], columns[i + 1].markers[j - 1], columns[i + 2].markers[j - 2], columns[i + 3].markers[j - 3]];
          // check if there are more connected markers by the same player, if so add them too
          let k = 4;
          while (columns[i + k] && columns[i + k].markers[j - k]) {
            if (columns[i + k].markers[j - k].player === winner) {
              markers.push(columns[i + k].markers[j - k]);
            }
            k++;
          }
          // return information about the win
          return {
            moves: Math.ceil(Marker.count / 2),
            winner: winner,
            markers: markers
          }
        }
      }
    }
  }

  reducedBoardWinChecker(b) {
    // this is the same wincheck as above but for the board reduced to 0s 1s and 2s, and returns only false, 1 or 2
    // we use the variable b for board because its gonna be typed so many times
    // and the risk for confusion is minimal
    // horizontal check:
    // loop for columns
    for (let i = 0; i <= 3; i++) {
      // loop for rows
      for (let j = 0; j <= 5; j++) {
        // p for player. again minimal risk of confusion
        const p = b[i][j];
        if (p !== 0 && p === b[i + 1][j] && p === b[i + 2][j] && p === b[i + 3][j]) {
          return p
        }
      }
    }
    // vertical check
    // loop for columns
    for (let i = 0; i <= 6; i++) {
      // loop for rows
      for (let j = 0; j <= 2; j++) {
        const p = b[i][j];
        if (p !== 0 && p === b[i][j + 1] && p === b[i][j + 2] && p === b[i][j + 3]) {
          return p
        }
      }
    }
    // diagonal checks
    // columns
    for (let i = 0; i <= 3; i++) {
      // first rows
      for (let j = 0; j <= 2; j++) {
        const p = b[i][j];
        if (p !== 0 && p === b[i + 1][j + 1] && p === b[i + 2][j + 2] && p === b[i + 3][j + 3]) {
          return p
        }
      }
      // last rows
      for (let j = 3; j <= 5; j++) {
        const p = b[i][j];
        if (p !== 0 && p === b[i + 1][j - 1] && p === b[i + 2][j - 2] && p === b[i + 3][j - 3]) {
          return p
        }
      }
    }
    return false
  }
}
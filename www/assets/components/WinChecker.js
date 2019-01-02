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
          return {
            winner: columns[j].markers[i].player,
            markers: [[j, i], [j + 1, i], [j + 2, i], [j + 3, i]],
            moves: Math.ceil(Marker.count/2)
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
            markers: [[i, j], [i, j + 1], [i, j + 2], [i, j + 3]],
            moves: Math.ceil(Marker.count/2)
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
          return {
            winner: columns[i].markers[j].player,
            markers: [[i, j], [i+1, j+1], [i+2, j+2], [i+3, j+3]],
            moves: Math.ceil(Marker.count/2)
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
          return {
            winner: columns[i].markers[j].player,
            markers: [[i, j], [i+1, j-1], [i+2, j-2], [i+3, j-3]],
            moves: Math.ceil(Marker.count/2)
          }
        }
      }
    }
  }
}
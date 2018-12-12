class WinChecker {
  checkForWin(columns) {
    let potentialWin = this.checkForHorizontalWin(columns);
    if (potentialWin) { return potentialWin }
    potentialWin = this.checkForVerticalWin(columns);
    if (potentialWin) { return potentialWin }
    potentialWin = this.checkForDiagonalWin(columns);
    return potentialWin
  }

  checkForHorizontalWin(columns) {
    // for each row, loop through the first three markers and check if the following four are placed by the same playa
    // outer loop for rows
    for (let i = 0; i <= 6; i++) {
      // inner loop for columns
      for (let j = 0; j <= 3; j++) {
        // check if all markers we want to look up really exist, if not, continue
        if (!columns[j].markers[i] || !columns[j+1].markers[i] || !columns [j+2].markers[i] || !columns [j+3].markers[i]) {
          continue;
        }
        // then check if all four were placed by the same player
        if (
          columns[j].markers[i].player === columns[j+1].markers[i].player
          && columns[j].markers[i].player === columns[j+2].markers[i].player
          && columns[j].markers[i].player === columns[j+3].markers[i].player
          ) {
            return {
              winner: columns[j].markers[i].player,
              markers: [[j, i], [j+1, i], [j+2, i], [j+3, i]],
              type: 'horizontal'
            }
          }
      }
    }
  }

  checkForVerticalWin(columns) {

  }

  checkForDiagonalWin(columns) {
    
  }
}
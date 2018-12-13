class ComputerPlayer {
  makeMove(columns) {
    let move = Math.round(Math.random()*6);
    if (columns[move].markers && columns[move].markers.length < 6) {
      return setTimeout(() => { columns[move].createMarker() }, 2000)
    } else {
      for (let column of columns) {
        if (column.markers.length < 6) {
          return setTimeout(() => { column.createMarker() }, 2000)
        }
      }
    }
  }
}
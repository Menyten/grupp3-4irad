class DrawChecker {
  checkDraws(columns) {
    for (let column of columns) {
      if (column.markers.length !== 6) {
        return false
      }
    }
    return true
  }
}
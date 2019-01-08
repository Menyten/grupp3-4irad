class ComputerPlayer {
  constructor(columns) {
    this.winchecker = new WinChecker();
    this.threatChecker = new ThreatChecker();
    this.positionEvaluator = new PositionEvaluator();
    this.columns = columns
  }

  get gameboard() {
    // this reduces the gameboard from a bunch of instances of classes to 0s, 1s and 2s
    return this.reduceColumns(this.columns);
  }

  get player() {
    return Marker.count % 2 === 1 ? 2 : 1;
  }

  get enemy() {
    return Marker.count % 2 === 1 ? 1 : 2;
  }
  
  makeMove() {
    const evaluations = this.positionEvaluator.evaluateWithDepth(this.gameboard, 45);
    const move = this.positionEvaluator.chooseBestMove(evaluations, this.player);
    const coolEvals = this.positionEvaluator.evaluate2(this.gameboard, 3);
    console.log(coolEvals);
    setTimeout(() => {
      this.columns[move].createMarker();
    }, 2000);
  }

  reduceColumns(columns) {
    // this reduces the gameboard from a bunch of instances of classes, to 0s, 1s and 2s
    // for each column it replaces the actual markers with just the number of the player they belong to
    // and then fill up the empty spots with 0s
    const reduced = columns.map((column) => {
      const markers = column.markers.map((marker) => marker.player ? marker.player : 0);
      while (markers.length < 6) {
        markers.push(0);
      }
      return markers
    });
    return reduced
  }
}
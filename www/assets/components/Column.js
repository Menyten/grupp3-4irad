class Column extends Component {
  constructor(columnWidth,board){
    super();

    this.board=board;

    //this.markers = [new Markers('','','red')];
    this.markers = [];
    this.columnWidth = columnWidth;
    this.addEvents({
      'click': 'createMarker',
    });
  }

  createMarker(){
    /*console.log('add some markers fam!');
    this.markers = [ ...this.markers, new Markers() ];*/
    //let askGameEngine = new GameEngine();
    //x.doSomething();
    //alert(this.board.PlayerTurn);
    if(this.board.PlayerTurn==1){
      this.markers.push(new Markers('','','red'));
      //alert('ett');
    }
    else if(this.board.PlayerTurn==2){
      this.markers.push(new Markers('','','blue'));
      //alert('två');
    }
    
    this.render();
    this.board.manageTurns()
  }

  renderMarkers(){
    return this.markers;
  }
}
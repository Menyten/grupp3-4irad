class Column extends Component {
  constructor(columnWidth){
    super();

    this.markers = [new Markers('','','red')];
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

    this.markers.push(new Markers('','','red'));
    this.render();
  }

  renderMarkers(){
    return this.markers;
  }
}
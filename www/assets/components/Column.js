class Column extends Component {
  constructor(columnWidth){
    super();

    this.markers = [new Markers()];
    this.columnWidth = columnWidth;
    this.addEvents({
      'click column': 'createMarker'
    })
  }

  createMarker(){
    console.log('add some markers fam!')
    this.markers = [ ...this.markers, new Markers() ];
  }

  renderMarkers(){
    return this.markers;
  }
}
class Column extends Component {
  constructor(columnWidth, index) {
    super();
    this.index = index
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

    this.markers.push(new Markers('','','red'));
    this.render();
  }

  renderEmptySlots() {
    // the columns are set with flexbox to display the elements from bottom up
    // so after we render the markers, we fill the remaining spaces (if any) with empty divs
    let emptySlots = 6 - this.markers.length;
    let html = '';
    for (let i = 0; i < emptySlots; i++) {
      html += '<div class="marker-slot"><div class="empty"></div></div>';
    }
    return html
  }
}
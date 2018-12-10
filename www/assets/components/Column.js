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
    // some simple validation to prevent playing on full columns
    // at the moment it just does nothing if the colum is full, no error messages etc
    if (this.markers && this.markers.length < 6) {
      this.markers.push(new Marker());
      this.render();
      // when the game engine knows which player is playing we should also tell the marker which player it belongs to
    }
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
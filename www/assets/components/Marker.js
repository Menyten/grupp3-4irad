class Marker extends Component {
  constructor(player) {
    super();    
    // we later want to replace this with either player one or two, when the game engine knows which player is playing
    this.player = player;
    

    // start a count for the amount of markers, if there is none already
    Marker.count = Marker.count || 0;
    // the following line adds one to Marker.count, and then assigns the new value to this.id
    this.id = ++Marker.count;
  }  

  animate() {
    // we animate the markers with jquery fadein
    // this function gets called on a new marker after the move has been made and the new marker rendered
    const innerDiv = this.baseEl.find('.animate');
    innerDiv.fadeIn(600, 'linear');
  }
}
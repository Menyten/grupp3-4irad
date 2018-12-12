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

  // this is a "lifecycle hook" I added to the framework
  // basically the mounted()-method of any component (if there is one) runs after the element has been rendered to the DOM

  mounted() {
    // see marker.html for more details
    // the newest marker added gets the class animate upon render
    // we then remove the animate class to start the animation
    const innerDiv = this.baseEl.find(`.player-${this.player}`);
    innerDiv.removeClass('animate');
    // then the function self-destructs to avoid running again
    // (the component only attempts to run this.mounted if it is truthy)
    this.mounted = '';
  }
}
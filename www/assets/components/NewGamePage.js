class NewGamePage extends Component {
  constructor() {
    super();
    this.addRoute('/new-game', 'New Game');
    this.addEvents({ 'click #players-and-opponents': 'getInput' });
    this.players = [];
  }
  getInput() {

    const p1 = $('#player-name');
    const p2 = $('#player2-name');
    let playerOne = p1.val().length >= 2 && p1.val().length <= 10;
    let playerTwo = p2.val().length >= 2 && p2.val().length <= 10;
    const playerOneOpponent = $('#type-of-player').val();
    const playerTwoOpponent = $('#type-of-player2').val();
    console.log (p1);

    // uses the value instead of the whole object
    const player1 = $('#player-name').val();
    const player2 = $('#player2-name').val();
    //push values into arrey
    this.players.push(new Player(player1, playerOneOpponent));
    this.players.push(new Player(player2, playerTwoOpponent));
    this.render();
    // ToDo not push but replace stuff in array [0,1] or if statement


    if (playerOne === true) {
      playerOne = p1.val();

    }
    if (playerTwo === true) {
      playerTwo = p2.val();
    }
    

    console.log(playerOne);
    console.log(playerTwo);
    console.log(playerOneOpponent);
    console.log(playerTwoOpponent);
  }

  // setPlayer(){
  //   let player = this.baseEl.find('#player-name').val();
  //   this.player = new Player(player);
  //   this.render();
  // }
  
  
  // getPlayer1(){
  //   return this.p1;
  // };

  // getPlayer2(){
  //   return this.p2;
  // };
}
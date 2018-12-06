class GameCol extends Component{

    constructor(gamepage){
        super();
        this.gamePage=gamepage;
        this.addEvents({
            'click .game-col-click-area':'doSomething'
        });

        this.gameMarkers=[];
        
    }

    doSomething(){

        if(this.gamePage.player1Turn==true){
            this.gameMarkers.push(new GameMarker('red'));
            this.render();
        }
        else if(this.gamePage.player2Turn==true){
            this.gameMarkers.push(new GameMarker('green'));
            this.render();
        }

        this.checkVerticalBingo();
    }
   

    checkVerticalBingo(){

        if(
           this.gameMarkers[0].color=='red' && 
           this.gameMarkers[1].color=='red' &&
           this.gameMarkers[2].color=='red' &&
           this.gameMarkers[3].color=='red'){

            alert('Bingo');
        }
        else if(
            this.gameMarkers[1].color=='red' && 
            this.gameMarkers[2].color=='red' &&
            this.gameMarkers[3].color=='red' &&
            this.gameMarkers[4].color=='red'){

             alert('Bingo');
        }
        else if(
            this.gameMarkers[2].color=='red' && 
            this.gameMarkers[3].color=='red' &&
            this.gameMarkers[4].color=='red' &&
            this.gameMarkers[5].color=='red'){

             alert('Bingo');
        }

    }

   

}
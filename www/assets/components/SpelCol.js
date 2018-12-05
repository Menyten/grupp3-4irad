class SpelCol extends Component{

    constructor(spelpage){
        super();
        this.spelPage=spelpage;
        this.addEvents({
            'click .spel-col-click-area':'doSomething'
        });

        this.spelMarkers=[];
        
    }

    doSomething(){

        if(this.spelPage.player1Turn==true){
            this.spelMarkers.push(new SpelMarker('red'));
            this.render();
        }
        else if(this.spelPage.player2Turn==true){
            this.spelMarkers.push(new SpelMarker('green'));
            this.render();
        }

        this.checkVerticalBingo();
    }
   

    checkVerticalBingo(){

        if(
           this.spelMarkers[0].color=='red' && 
           this.spelMarkers[1].color=='red' &&
           this.spelMarkers[2].color=='red' &&
           this.spelMarkers[3].color=='red'){

            alert('Bingo');
        }
        else if(
            this.spelMarkers[1].color=='red' && 
            this.spelMarkers[2].color=='red' &&
            this.spelMarkers[3].color=='red' &&
            this.spelMarkers[4].color=='red'){

             alert('Bingo');
        }
        else if(
            this.spelMarkers[2].color=='red' && 
            this.spelMarkers[3].color=='red' &&
            this.spelMarkers[4].color=='red' &&
            this.spelMarkers[5].color=='red'){

             alert('Bingo');
        }

    }

   

}
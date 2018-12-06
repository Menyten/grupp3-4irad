class GamePage extends Component{

    constructor(){
        super();
        this.addRoute('/game', 'game');
        this.addEvents({
            'click .game-col-click-area':'changeTurn'
        });

        this.gameCols = [
            new GameCol(this),
            new GameCol(this),
            new GameCol(this),
            new GameCol(this),
            new GameCol(this),
            new GameCol(this),
            new GameCol(this)                   
        ];     
       
        this.player1Turn;
        this.player2Turn;

        this.firstTurn();
        this.changeTurn();

    }

    firstTurn(){

        let whosTurn =Math.floor((Math.random() * 2) + 1);
        if(whosTurn==1){
            this.player1Turn=true;
        }
        if(whosTurn==2){
            this.player2Turn=true;
        }       
    }

    changeTurn(){

        if(this.player1Turn==true){        
           
            this.player1Turn=false;
            this.player2Turn=true;
        }
        else if(this.player2Turn==true){          
            
            this.player2Turn=false;
            this.player1Turn=true;
        }
    }

    

}
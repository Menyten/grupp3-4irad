class GameEngine extends Component{

    constructor(){
        super();
        this.player1Turn=false;
        this.player2Turn=false;
        this.firstTurn();
    }

    firstTurn(){

        let x= Math.floor((Math.random() * 2) + 1);
        if(x==1){
            this.player1Turn=true;
            this.player2Turn=false;
            return 2;
        }
        else if(x==2){
            this.player1Turn=false;
            this.player2Turn=true;
            return 1;
        }
    }

    changeTurn(){

        if(this.player1Turn==true){
            this.player1Turn=false;
            this.player2Turn=true;
            return 1;
        }
        else if(this.player2Turn==true){
            this.player1Turn=true;
            this.player2Turn=false;
            return 2;
        }
        //alert(this.player1Turn);
    }

}
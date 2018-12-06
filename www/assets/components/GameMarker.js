class GameMarker extends Component{

    constructor(color){

        super();
        this.color= color;
        this.colorRed;
        this.setColor();
    }

    setColor(){

        if(this.color=='red'){
           this.colorRed=true;
        }
        else if(this.color=='green'){
            this.colorRed=false;
        }
    }

}
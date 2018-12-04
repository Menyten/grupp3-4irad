class SpelMarker extends Component{

    constructor(color){

        super();
        this.addEvents({
            'click .spel-marker-click-area': 'changeMyColor'
          });
        this.color= color;
        this.whatColor();
    }

    whatColor(){

        if(this.color=='red'){
           
           //some code
        }
    }

    changeMyColor(){
        
        /*$(this).css('background-color', 'red');
        this.render();*/
        //console.log(this);
        //$(this.baseEl).css('background-color', 'red');
        //this.baseEl.find('.spel-marker-click-area').addClass('marker-red');
       
    }
}
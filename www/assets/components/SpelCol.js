class SpelCol extends Component{

    constructor(){
        super();

        this.addEvents({
            'click .spel-col-click-area':'doSomething'
        });

        this.spelMarkers=[
            new SpelMarker('somecolor'),
            new SpelMarker('somecolor'),
            new SpelMarker('somecolor'),
            new SpelMarker('somecolor'),
            new SpelMarker('somecolor'),
            new SpelMarker('somecolor')         
        ];

        this.checkSomething();
 
    }

    checkSomething(){

        if(this.spelMarkers[0].color=='red'){

            alert('say whaat');
        }

    }

    doSomething(){

        alert('hej');
        console.log(this);

       /* this.spelMarkers.splice(5,1);
        this.spelMarkers.push(new SpelMarker('red')); */
        
    }

}
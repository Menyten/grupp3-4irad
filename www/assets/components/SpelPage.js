class SpelPage extends Component{

    constructor(){
        super();
        this.addRoute('/spel', 'Spel');

        this.spelCols = [
            new SpelCol(),
            new SpelCol(),
            new SpelCol(),
            new SpelCol(),
            new SpelCol(),
            new SpelCol(),
            new SpelCol()
                    
        ];     

    }

}
class Modals extends Component {
    constructor(){
        super();
        this.victoryModal() // remove me when done
    }

    show(){
        this.render();
        setTimeout(()=>{
            this.baseEl.modal('show');
        }, 0);
    }

    victoryModal(){
        console.log('Det fungerar');
        this.title = "winner";
        this.show();

    }

    metod2(){
        this.title = "u lost";
        this.show();
    }

}

class Modals extends Component {
    constructor(){
        super();
        //this.victoryModal()
       //this.loserModal()
    }

    show(){
        this.render();
        setTimeout(()=>{
            this.baseEl.modal('show');
        }, 0);
    }

    victoryModal(){
        this.title = "Grattis!  ";
        this.show();

    }

    loserModal(){
        this.title = "Du förlorade tyvärr";
        this.show();
    }



}

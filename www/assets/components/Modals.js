class Modals extends Component {
    constructor(parent) {
        super();
        //this.victoryModal();
        //this.loserModal()
        //this.drawModal()
        this.parent = parent;
        this.addEvents({
            'click .restartButton': 'restartGame'
        })
        
    }

    restartGame(){
        this.parent.newGame();
    }

    show() {
        this.render();
        setTimeout(() => {
            this.baseEl.modal('show');
        }, 0);
    }

    victoryModal() {
        this.title = "Grattis!  ";
        $(document).ready(function () {
            $('.modal-body').addClass('victoryImage');
        });
        this.show();

    }

    loserModal() {
        this.title = "Du förlorade tyvärr";
        $(document).ready(function () {
            $('.modal-body').addClass('losingImage');
        });
        this.show();
    }

    drawModal() {
        this.title = "Det slutade lika";
        $(document).ready(function () {
            $('.modal-body').addClass('drawImage');
        });
        this.show();
    }

}

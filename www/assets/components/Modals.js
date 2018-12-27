class Modals extends Component {
    constructor(parent) {
        super();
        this.parent = parent;
        this.addEvents({
            'click .restartButton': 'restartGame'
        })
        this.victoryModal();

        
    }

    restartGame(){
        this.parent.newGame(this.parent.game.player1, this.parent.game.player2);
        $('.modal').hide();
    }

    show() {
        this.render();
        setTimeout(() => {
            this.baseEl.modal('show');

        }, 1000);
    }

    victoryModal(winnerName) {
        this.title = "Grattis  ";
        this.winnerName = winnerName;
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
        this.winnerName = '';
        $(document).ready(function () {
            $('.modal-body').addClass('drawImage');
        });
        this.show();
    }

}

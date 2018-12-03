class NavBar extends Component {

    constructor(){
      super();
      this.navItems = [
        new NavItem('Start', '/'),
        new NavItem('Spela', '/new-game'),
        new NavItem('Spelregler', ''),
        new NavItem('Highscore', '')
      ];
    }
  
  }
  
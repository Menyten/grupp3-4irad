class App extends Component {
 
  constructor(){
    super();
    this.navBar = new NavBar();
    this.pageContent = new PageContent();

    new Router(this.pageContent);
    $('body').html(this.render());
  }
 
}

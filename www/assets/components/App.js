class App extends Component {
 
  constructor(){
    super();
    this.pageContent = new PageContent();
    this.footer = new Footer();

    new Router(this.pageContent);
    $('body').html(this.render());
  }
 
}

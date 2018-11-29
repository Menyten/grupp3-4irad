class App extends Component {
 
  constructor(){
    super();
    new Router(this.pageContent);
    $('body').html(this.render());
  }
 
}

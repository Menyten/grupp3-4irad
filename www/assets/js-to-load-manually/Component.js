class Component {
 
  constructor(){
    this.addUniqueId();
    // Replace render method
    this._orgRender = this.render;
    this.render = this._render;
    this.toString = this.render;
    // Remember the original page title from HTML
    Component.orgPageTitle = Component.orgPageTitle || document.title;
  }
 
  addUniqueId(){
    Component.co = Component.co || 0;
    this._id = Component.co;
    Component.co++;
  }
 
  _render(){
    // convert html string to jQuery elements
    let elements = $(this._orgRender());
    // check that there is exactly 1 root element
    if(elements.length !== 1){
      throw(new Error('Provide exactly 1 root element'));
    }
    // if already in DOM then replace it
    let inDOM = $(`[data-instance-id=${this._id}]`);
    if(inDOM.length > 0){
      inDOM.replaceWith(elements);
    }
    // If I have a route and it is not the current one - render nothing
    if(this.route && this.route !== Router.path){
      inDOM.remove();
      this.unmount && this.unmount();
      return '';
    }
    // Change the title if we match a route with a title
    if(this.route === Router.path && this.title){
      document.title =  Component.orgPageTitle + ': ' + this.title;
    }
    // add the instance id
    elements.attr('data-instance-id', this._id);
    // add the mounted lifecycle hook
    if (typeof this.mounted === 'function') {
      setTimeout(() => {
        this.mounted();
      }, 0);
    }
    // return as a string
    return elements[0].outerHTML;
  }
 
  addEvents(eventMap){
    // eventMap should be an object on the form
    // {
    //   'eventType selector': 'nameOfMethod',
    //   etc... 
    // }
    for(let event in eventMap){
      let methodName = eventMap[event];
      let type = event.split(' ').shift();
      let selector = event.substr(event.indexOf(' ') + 1);
      if(!event.includes(' ')){selector = '';}
      $(document).on(type,`[data-instance-id=${this._id}] ${selector}`, (event) => {
        return this[methodName](event);
      });
    }
  }
 
  addRoute(route, title){
    this.route = route;
    this.title = title;
    Router.registerRoute(route);
  }

  get baseEl(){
    return $(`[data-instance-id=${this._id}]`);
  }
 
}

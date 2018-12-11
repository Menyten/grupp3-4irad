class Markers extends Component {
  constructor(row, col, color) {
    super();
    
    this.row = row;
    this.col = col;
    this.color = color;

    this.colorRed=false;
    this.colorBlue=false;
    this.decideColor();
  }

  decideColor(){

    //alert('hejjj');
    if(this.color=='red'){
      this.colorRed=true;
      this.colorBlue=false;
    }
    else if(this.color=='blue'){
      this.colorRed=false;
      this.colorBlue=true;
    }

  }

  
}
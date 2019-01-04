class HighscorePage extends Component {
  constructor() {
    super();
    this.addRoute('/highscore', 'Highscore');
    this.getNewHighscoreList();
    this.highscoreList = [];
  }

  async getNewHighscoreList() {
    const response = await fetch('http://localhost:3000/get-highscore', {
      method: 'GET'
    });
    this.highscoreList = await response.json();
    this.render();
  }

  createHighscoreList() {
    let html = '';
    let i = 1;
    for (let highscore of this.highscoreList) {
      html += `<tr>
      <th scope="row">${i++}</th>
      <td>${highscore["name"]}</td>
      <td>${highscore["score"]}</td>
      </tr>`;
    }
    return html;
  }

  mounted() {
    this.getNewHighscoreList();
  }

}
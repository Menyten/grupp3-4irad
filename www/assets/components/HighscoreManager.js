class HighscoreManager {
  constructor() {
    this.highscoreList = [];
    this.getNewHighscoreList();
  }

  checkForHighscore(score) {
    for (let highscore of this.highscoreList) {
      if (score < highscore.score) {
        return true;
      }
    }
    return false;
  }

  async getNewHighscoreList() {
    const response = await fetch('http://localhost:3000/get-highscore', {
      method: 'GET'
    });
    this.highscoreList = await response.json();
  }

  async postNewHighscore(name, score) {
    await fetch('http://localhost:3000/add-score', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        score: score
      })
    });
    await this.getNewHighscoreList();
  }
}



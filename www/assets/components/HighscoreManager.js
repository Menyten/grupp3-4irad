class HighscoreManager {
  constructor() {
    this.highscoreList = [];
    this.getNewHighscoreList()
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

  /* addHighscore(name, score) {
    let object = { "name": name, "score": score }
    this.highscoreList.push(object);
    this.highscoreList.sort(function (a, b) {
      return a.score - b.score;
    });
    this.highscoreList.length = 10;
    console.log(this.highscoreList);
  } */


  async postNewHighscore(name, score) {
    // $.post("/add-score", { name: name, score: score }, function (responseData) {
    //   console.log('the new highscore-list is:', responseData);
    //   console.error('append/use the new highscore-list then remove this console.error');
    // });
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
    console.log('gotten new list', this.highscoreList);
  }


}
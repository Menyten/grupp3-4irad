class HighscoreManager {
  constructor() {
    this.highscoreList = [
      {
        "name": "Sterben",
        "score": "4"
      },
      {
        "name": "Kaugan",
        "score": "5"
      },
      {
        "name": "Svartsoppa",
        "score": "6"
      },
      {
        "name": "Stenen",
        "score": "7"
      },
      {
        "name": "Fläsk",
        "score": "8"
      },
      {
        "name": "Kaugan",
        "score": "9"
      },
      {
        "name": "Svartsoppa",
        "score": "10"
      },
      {
        "name": "Stenen",
        "score": "11"
      },
      {
        "name": "Fläsk",
        "score": "12"
      },
      {
        "name": "Fläsk",
        "score": "14"
      }
    ]
  }

  checkForHighscore(score) {
    for (let highscore of this.highscoreList) {
      if (score < highscore.score) {
        return true;
      }
    }
    return false;
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


  postNewHighscore(name, score) {
    $.post("/add-score", { name: name, score: score }, function (responseData) {
      console.log('the new highscore-list is:', responseData);
      console.error('append/use the new highscore-list then remove this console.error');
    });
  }


}
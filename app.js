// Require the express module
const express = require('express');
// Create a new web server
const app = express();
// Tell the web server to serve files
// from the www folder
app.use(express.static('www'));
// Start the web server on port 3000
app.listen(3000, () => console.log('Letz get cracking on port 3000. Open up a bottle of port and do your magic!'));

const fs = require('fs');
const path = require('path');

// Automatically load all scripts at root level of js folder
// and load their corresponding template files
app.get('/autoload-js-and-templates', (req, res) => {
  let files = fs.readdirSync(path.join(__dirname, '/www/assets/components'));
  files = files.filter(x => x.substr(-3) === '.js')
  let html = files.map(x => `<script src="/assets/components/${x}"></script>`).join('');
  html += files.filter(x => fs.existsSync(path.join(
    __dirname, '/www/assets/templates', x.split('.js').join('.html')
  ))).map(x => `<script src="/template-to-js/${
    x.split('.js').join('.html')}"></script>`).join('');
  res.send(`document.write('${html}')`);
});

// Convert a template to a js render method
app.get('/template-to-js/:template', (req, res) => {
  let html = fs.readFileSync(path.join(
    __dirname, '/www/assets/templates', req.params.template));
  html = req.params.template.split('.html')[0] +
    '.prototype.render = function(){ return `\n' + html + '\n`};'
  res.send(html);
});

// Serve the index page everywhere so that the
// frontend router can decide what to do
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/www/index.html'));
});

const Sass = require('./sass');
const config = require('./config.json');

for (let conf of config.sass) {
  new Sass(conf);
}

// express etc should still be loaded in here...

let bodyParser = require('body-parser'); // import body-parser (to read sent data from clients)
app.use(bodyParser.json()); // use body-parser
app.use(bodyParser.urlencoded({ extended: false })); // configure body-parser

let highscores = require('./www/assets/json/highscore.json'); // load the json file - store it in a new variable

// add a route that the browsers/clients can communicate through
app.post('/add-score', (req, res) => {
  highscores.push(req.body); // add the new score
  highscores.sort(function (a, b) {
    return a.score - b.score; // Google MDN js array sort and write the sort-function
  });
  highscores = highscores.slice(0, 10); // only keep the top 10 in the array
  fs.writeFile('./www/assets/json/highscore.json', JSON.stringify(highscores, null, 2), () => { }); // replace the file content with the new array
  res.json(highscores); // respond to the browser, send the new/updated array
});
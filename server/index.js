var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var calcHolder;
var answer;

app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.urlencoded({extended: true}));

app.post('/calc', function(req, res) {
  calcHolder = req.body;
  switch(calcHolder.type){
    case '+':
    answer = Number(calcHolder.x) + Number(calcHolder.y);
    break;
    case '-':
    answer = Number(calcHolder.x) - Number(calcHolder.y);
    break;
    case '*':
    answer = Number(calcHolder.x) * Number(calcHolder.y);
    break;
    case '/':
    answer = Number(calcHolder.x) / Number(calcHolder.y);
    break;
    default:
    alert("Something went horribly wrong!");
  }

  res.send(answer.toString());
});

app.get('/*', function(req, res) {
  console.log('request params', req.params);
var file = req.params[0] || 'views/index.html';
res.sendFile(path.join(__dirname, "./public", file));
});

app.listen(app.get('port'), function() {
  console.log("Server is ready on port:" + app.get('port'));
});

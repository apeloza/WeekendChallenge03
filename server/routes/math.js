var express = require('express');
var router = express.Router();
var calcHolder;
var answer;

router.post('/divide', function(req,res) {
  calcHolder = req.body;
  answer = Number(calcHolder.x) / Number(calcHolder.y);
  res.send(answer.toString());
});

router.post('/multiply', function(req,res) {
  calcHolder = req.body;
  answer = Number(calcHolder.x) * Number(calcHolder.y);
  res.send(answer.toString());
});

router.post('/minus', function(req,res) {
  calcHolder = req.body;
  answer = Number(calcHolder.x) - Number(calcHolder.y);
  res.send(answer.toString());
});

router.post('/plus', function(req,res) {
  calcHolder = req.body;
  answer = Number(calcHolder.x) + Number(calcHolder.y);
  res.send(answer.toString());
});

module.exports = router;

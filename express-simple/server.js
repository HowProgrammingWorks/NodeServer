var express = require('express');
var app = express();

var me = { name: 'jura', age: 22 };

app.get('/', function(req, res) {
  res.send('welcome to homepage');
  res.end();
});

app.get('/user', function(req, res) {
  res.send(me);
  res.end();
});

app.get('/user/name', function(req, res) {
  res.send(me.name);
  res.end();
});

app.get('/user/age', function(req, res) {
  res.send(me.age+'');
  res.end();
});

app.listen(80);

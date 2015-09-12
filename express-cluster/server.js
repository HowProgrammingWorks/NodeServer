var express = require('express');
var cluster = require('cluster');
var os = require('os');
var app = express();

var me = { name: 'jura', age: 22 };

if (cluster.isMaster) {

  var count = os.cpus().length;
  for (var i = 0; i < count; i++) cluster.fork();

} else {

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

}

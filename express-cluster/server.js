'use strict';

const os = require('os');
const express = require('express');
const cluster = require('cluster');
const app = express();

const user = { name: 'jura', age: 22 };

if (cluster.isMaster) {

  let count = os.cpus().length;
  for (let i = 0; i < count; i++) cluster.fork();

} else {

  app.get('/', (req, res) => {
    res.send('welcome to homepage');
    res.end();
  });

  app.get('/user', (req, res) => {
    res.send(user);
    res.end();
  });

  app.get('/user/name', (req, res) => {
    res.send(user.name);
    res.end();
  });

  app.get('/user/age', (req, res) => {
    res.send(user.age + '');
    res.end();
  });

  app.listen(80);

}

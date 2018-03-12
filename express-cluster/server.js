'use strict';

const os = require('os');
const express = require('express');
const cluster = require('cluster');
const app = express();

const user = { name: 'jura', age: 22 };

if (cluster.isMaster) {

  const count = os.cpus().length;
  for (let i = 0; i < count; i++) cluster.fork();

} else {

  app.get('/', (req, res) => {
    res.send('welcome to homepage');
  });

  app.get('/user', (req, res) => {
    res.send(user);
  });

  app.get('/user/name', (req, res) => {
    res.send(user.name);
  });

  app.get('/user/age', (req, res) => {
    res.send(user.age + '');
  });

  app.listen(8000);

}

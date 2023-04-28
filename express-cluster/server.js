'use strict';

const os = require('node:os');
const cluster = require('node:cluster');
const express = require('express');
const app = express();

const user = { name: 'jura', age: 22 };

if (cluster.isPrimary) {
  const count = os.cpus().length;
  for (let i = 0; i < count; i++) cluster.fork();
} else {
  app.get('/', (req, res) => {
    res.end('welcome to homepage');
  });

  app.get('/user', (req, res) => {
    res.end(JSON.stringify(user));
  });

  app.get('/user/name', (req, res) => {
    res.end(user.name);
  });

  app.get('/user/age', (req, res) => {
    res.end(user.age + '');
  });

  app.listen(8000);
}

'use strict';

const express = require('express');
const app = express();

const user = { name: 'jura', age: 22 };

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
  res.send(user.age.toString());
  res.end();
});

app.listen(80);

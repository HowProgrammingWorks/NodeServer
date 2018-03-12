'use strict';

const express = require('express');
const app = express();

const user = { name: 'jura', age: 22 };

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
  res.send(user.age.toString());
});

app.listen(8000);

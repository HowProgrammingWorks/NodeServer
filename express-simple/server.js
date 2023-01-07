'use strict';

const express = require('express');
const app = express();

const user = { name: 'jura', age: 22 };

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
  res.end(user.age.toString());
});

app.listen(8000);

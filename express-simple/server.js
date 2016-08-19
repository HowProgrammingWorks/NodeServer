'use strict';

const express = require('express');
let app = express();

let me = { name: 'jura', age: 22 };

app.get('/', (req, res) => {
  res.send('welcome to homepage');
  res.end();
});

app.get('/user', (req, res) => {
  res.send(me);
  res.end();
});

app.get('/user/name', (req, res) => {
  res.send(me.name);
  res.end();
});

app.get('/user/age', (req, res) => {
  res.send(me.age + '');
  res.end();
});

app.listen(80);

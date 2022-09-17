'use strict';

const express = require('express');
const logger = require('./logger.js');
const timeout = require('./timeout.js');

const app = express();

app.use(logger);
app.use(timeout(1000));

app.get('/', (req, res) => {
  res.end('Hello World!');
});

app.get('/page1', (req, res) => {
  setTimeout(() => {
    res.end('Hello World!');
  }, 5000);
});

app.listen(8000);

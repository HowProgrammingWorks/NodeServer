'use strict';

const http = require('http');

let me = { name: 'jura', age: 22 };

let routing = {
  '/': '<h1>welcome to homepage</h1><hr>',
  '/user': me,
  '/user/name': () => me.name,
  '/user/age': () => me.age,
  '/hello': { hello: 'world', andArray: [1, 2, 3, 4, 5, 6, 7] }
};

let types = {
  object: o => JSON.stringify(o),
  string: s => s,
  undefined: () => 'not found',
  function: (fn, req, res) => fn(req, res) + '',
};

http.createServer((req, res) => {
  let data = routing[req.url],
      result = types[typeof(data)](data, req, res);
  res.end(result);
}).listen(80);

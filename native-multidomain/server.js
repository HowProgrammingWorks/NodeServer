'use strict';

const fs = require('node:fs');
const https = require('node:https');

const user = { name: 'jura', age: 22 };

const routing = {
  '/': '<h1>welcome to homepage</h1><hr>',
  '/user': user,
  '/user/name': () => user.name.toUpperCase(),
  '/user/age': () => user.age,
  '/hello': { hello: 'world', andArray: [1, 2, 3, 4, 5, 6, 7] },
  '/api/method1': (req, res) => {
    console.log(req.url + ' ' + res.statusCode);
    return { status: res.statusCode };
  },
  '/api/method2': (req) => ({
    user,
    url: req.url,
    cookie: req.headers.cookie
  }),
};

const types = {
  object: JSON.stringify,
  string: (s) => s,
  undefined: () => 'not found',
  function: (fn, req, res) => JSON.stringify(fn(req, res)),
};

const key = fs.readFileSync('./cert/key.pem');
const cert = fs.readFileSync('./cert/cert.pem');
const options = { key, cert };

const server = https.createServer(options, (req, res) => {
  const data = routing[req.url];
  const type = typeof data;
  const serializer = types[type];
  const result = serializer(data, req, res);
  res.end(result);
});

{
  const key = fs.readFileSync('./cert/key.pem');
  const cert = fs.readFileSync('./cert/cert.pem');
  const creds = { key, cert };
  server.addContext('127.0.0.1', creds);
}

{
  const key = fs.readFileSync('./cert/key.pem');
  const cert = fs.readFileSync('./cert/cert.pem');
  const creds = { key, cert };
  server.addContext('localhost', creds);
}

{
  const key = fs.readFileSync('./cert/key.pem');
  const cert = fs.readFileSync('./cert/cert.pem');
  const creds = { key, cert };
  server.addContext('*', creds);
}

server.listen(8000);
console.log('Open: https://127.0.0.1:8000');
console.log('   or https://localhost:8000');

console.log({ 'server._contexts': server._contexts });

setInterval(() => user.age++, 2000);

'use strict';

const fs = require('node:fs');
const http2 = require('node:http2');

const PORT = 8000;

const user = { name: 'jura', age: 22 };

const routing = {
  '/': '<h1>welcome to homepage</h1><hr>',
  '/user': user,
  '/user/name': () => user.name.toUpperCase(),
  '/user/age': () => user.age,
  '/hello': { hello: 'world', andArray: [1, 2, 3, 4, 5, 6, 7] },
  '/api/method1': (stream, headers) => {
    console.log(headers[':path']);
    return { status: 200 };
  },
  '/api/method2': (stream, headers) => ({
    user,
    url: headers[':path'],
    cookie: headers[':cookie'],
  }),
};

const types = {
  object: (o) => JSON.stringify(o),
  string: (s) => s,
  undefined: () => 'not found',
  function: (fn, stream, headers) => JSON.stringify(fn(stream, headers)),
};

const key = fs.readFileSync('./cert/key.pem');
const cert = fs.readFileSync('./cert/cert.pem');
const options = { key, cert };

const server = http2.createSecureServer(options);

server.on('stream', (stream, headers) => {
  stream.respond({
    'content-type': 'text/html; charset=utf-8',
    ':status': 200,
  });
  const path = headers[':path'];
  const data = routing[path];
  const type = typeof data;
  const serializer = types[type];
  const result = serializer(data, stream, headers);
  stream.end(result);
});

server.listen(PORT);
console.log(`Open: https://127.0.0.1:${PORT}`);

setInterval(() => user.age++, 2000);

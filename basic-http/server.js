'use strict';

const http = require('node:http');

const user = {
  name: 'Marcus Aurelius',
  city: 'Rome',
  proffesion: 'emperor',
};

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.writeHead(400, { 'Content-Type': 'text/plain' });
  res.end('111');
  res.end(
    `${user.name} said "Java is a crap!" and chiao from ${user.city}`
  );
});

server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(8000);

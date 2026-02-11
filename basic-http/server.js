'use strict';

const http = require('node:http');

const PORT = 8000;

const user = {
  name: 'Marcus Aurelius',
  city: 'Rome',
  proffesion: 'emperor',
};

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  const { name, city } = user;
  res.end(`${name} said "Java is a crap!" and ciao from ${city}`);
});

server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(PORT);

'use strict';

const http = require('http');

const user = {
  name: 'Marcus Aurelius',
  city: 'Rome',
  proffesion: 'emperor',
};

const server = http.createServer((req, res) => {
  res.end(
    `${user.name} said "Java is a crap!" and chiao from ${user.city}`
  );
});

server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(8000);

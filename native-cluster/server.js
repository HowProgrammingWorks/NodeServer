'use strict';

const http = require('http');
const cluster = require('cluster');
const os = require('os');

const PORT = 2000;

const user = { name: 'jura', age: 22 };
const pid = process.pid;

const routing = {
  '/': 'welcome to homepage',
  '/user': user,
  '/user/name': () => user.name,
  '/user/age': () => user.age,
};

const types = {
  object: JSON.stringify,
  string: s => s,
  number: n => n.toString(),
  undefined: () => 'not found',
  function: (fn, par, client) => JSON.stringify(fn(client, par)),
};

if (cluster.isMaster) {
  const count = os.cpus().length;
  console.log(`Master pid: ${pid}`);
  console.log(`Starting ${count} forks`);
  for (let i = 0; i < count; i++) cluster.fork();
} else {
  const id = cluster.worker.id;
  console.log(`Worker: ${id}, pid: ${pid}, port: ${PORT}`);
  http.createServer((req, res) => {
    const data = routing[req.url];
    const type = typeof data;
    const serializer = types[type];
    res.setHeader('Process-Id', pid);
    res.end(serializer(data, req, res));
  }).listen(PORT);
}

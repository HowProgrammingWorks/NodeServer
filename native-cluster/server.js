'use strict';

const http = require('http');
const cluster = require('cluster');
const os = require('os');

const user = { name: 'jura', age: 22 };
const BASE_PORT = 80;

const routing = {
  '/': 'welcome to homepage',
  '/user': user,
  '/user/name': () => user.name,
  '/user/age': () => user.age
};

const types = {
  object: o => JSON.stringify(o),
  string: s => s,
  number: n => n.toString(),
  undefined: () => 'not found',
  function: (fn, par, client) => JSON.stringify(fn(client, par))
};

const pid = process.pid;
if (cluster.isMaster) {
  const count = os.cpus().length;
  console.log(`Master pid: ${pid}`);
  console.log('Starting ' + count + ' forks');
  for (let i = 0; i < count; i++) cluster.fork();
} else {
  const id = cluster.worker.id;
  const port = BASE_PORT + id;
  console.log(`Worker: ${id}, pid: ${pid}, port: ${port}`);
  http.createServer((req, res) => {
    const data = routing[req.url];
    res.setHeader('Process-Id', process.pid);
    res.end(types[typeof(data)](data, req, res));
  }).listen(port);
}

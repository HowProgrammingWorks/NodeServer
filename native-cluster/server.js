'use strict';

global.api = {};
api.http = require('http');
api.cluster = require('cluster');
api.os = require('os');

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
if (api.cluster.isMaster) {
  let count = api.os.cpus().length;
  console.log(`Master pid: ${pid}`);
  console.log('Starting ' + count + ' forks');
  for (let i = 0; i < count; i++) api.cluster.fork();
} else {
  const id = api.cluster.worker.id;
  const port = BASE_PORT + id;
  console.log(`Worker: ${id}, pid: ${pid}, port: ${port}`);
  api.http.createServer((req, res) => {
    const data = routing[req.url];
    res.setHeader('Process-Id', process.pid);
    res.end(types[typeof(data)](data, req, res));
  }).listen(port);
}

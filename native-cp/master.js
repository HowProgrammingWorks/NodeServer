'use strict';

const cp = require('child_process');
const os = require('os');

const pid = process.pid;
const count = os.cpus().length;

console.log(`Master pid: ${pid}`);
console.log(`Starting ${count} forks`);

for (let i = 0; i < count;) {
  cp.fork('./worker.js', [++i]);
}

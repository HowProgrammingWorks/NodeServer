'use strict';

global.api = {};
api.http = require('http');

let me = { name: 'jura', age: 22 };

let routing = {
  '/': 'welcome to homepage',
  '/user': me,
  '/user/name': () => me.name,
  '/user/age': () => me.age,
  '/user/*': (client, par) => 'parameter=' + par[0]
};

let types = {
  object: o => JSON.stringify(o),
  string: s => s,
  number: n => n + '',
  undefined: () => 'not found',
  function: (fn, par, client) => fn(client, par)
};

let matching = [];
for (let key in routing) {
  if (key.indexOf('*') !== -1) {
    let rx = new RegExp(key.replace('*', '(.*)'));
    matching.push([rx, routing[key]]);
    delete routing[key];
  }
}

function router(client) {
  let rx, par, route = routing[client.req.url];
  if (route === undefined) {
    for (let i = 0, len = matching.length; i < len; i++) {
      rx = matching[i];
      par = client.req.url.match(rx[0]);
      if (par) {
        par.shift();
        route = rx[1];
        break;
      }
    }
  }
  let renderer = types[typeof(route)];
  return renderer(route, par, client);
}

api.http.createServer((req, res) => {
  res.end(router({ req, res }) + '');
}).listen(80);

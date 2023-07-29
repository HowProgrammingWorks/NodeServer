'use strict';

const http = require('node:http');

const PORT = 8000;
const user = { name: 'jura', age: 22 };

const routing = {
  '/': 'welcome to homepage',
  '/user': user,
  '/user/name': () => user.name,
  '/user/age': () => user.age,
  '/user/*': (client, params) => 'parameter=' + params[0],
};

const types = {
  object: JSON.stringify,
  string: (s) => s,
  number: (n) => n + '',
  undefined: () => 'not found',
  function: (fn, params, client) => fn(client, params),
};

const matching = [];
for (const key in routing) {
  if (key.includes('*')) {
    const rx = new RegExp(key.replace('*', '(.*)'));
    const route = routing[key];
    matching.push([rx, route]);
    delete routing[key];
  }
}

const router = (client) => {
  const { req: { url } } = client;
  let route = routing[url];
  let params = [];
  if (!route) {
    for (const rx of matching) {
      params = url.match(rx[0]);
      if (params) {
        params.shift();
        route = rx[1];
        break;
      }
    }
  }
  const type = typeof route;
  const renderer = types[type];
  return renderer(route, params, client);
};

http.createServer((req, res) => {
  res.end(`${router({ req, res })}`);
}).listen(PORT);

console.log(`Running server on port ${PORT}`);

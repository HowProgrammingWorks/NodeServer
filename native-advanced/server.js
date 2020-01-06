'use strict';

const http = require('http');

const user = { name: 'jura', age: 22 };

const routing = {
  '/': 'welcome to homepage',
  '/user': user,
  '/user/name': () => user.name,
  '/user/age': () => user.age,
  // client is passed but never used
  '/user/*': (client, par) => 'parameter=' + par[0],
};

const types = {
  object: JSON.stringify,
  string: s => s,
  number: n => n + '',
  undefined: () => 'not found',
  function: (fn, par, client) => fn(client, par),
};

let matching
for (const key in routing) {
  if (key.includes('*')) {
    const rx = new RegExp(key.replace('*', '(.*)'));
    const route = routing[key];

    /* I did it like that because we have to make variable matching make global.
    * if it would be const [...matching] = [rx, route] it could not be seen in function route
    * i made it cause matching was two-dimential array
    */

    (function f() {return [...matching] = [rx, route]})();

    delete routing[key];
  }
}

const router = client => {
  let par;
  let route = routing[client.req.url];
  if (!route) {
    const rx = matching[0]
    par = client.req.url.match(rx);
    if (par) {
      par.shift();
      route = matching[1];
    }
  }

  /* Why do we have to check type of route
   if route is always 'function'? */

  const type = typeof route;
  const renderer = types[type];
  return renderer(route, par, client);
};

http.createServer((req, res) => {
  res.end(router({ req, res }) + '');
}).listen(8000);

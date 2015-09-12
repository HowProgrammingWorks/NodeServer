var http = require('http');

var me = { name: 'jura', age: 22 };

var routing = {
  '/': 'welcome to homepage',
  '/user': me,
  '/user/name': function() { return me.name; },
  '/user/age': function() { return me.age; },
  '/user/*': function(client, par) { return 'parameter=' + par[0]; }
};

var types = {
  object: function(o) { return JSON.stringify(o); },
  string: function(s) { return s; },
  number: function(n) { return n + ''; },
  undefined: function() { return 'not found'; },
  function: function(fn, par, client) { return fn(client, par); }
};

var matching = [];
for (key in routing) {
  if (key.indexOf('*') !== -1) {
    var rx = new RegExp(key.replace('*', '(.*)'));
    matching.push([rx, routing[key]]);
    delete routing[key];
  }
}

function router(client) {
  var rx, par, route = routing[client.req.url];
  if (route === undefined) {
    for (var i = 0, len = matching.length; i < len; i++) {
      rx = matching[i];
      par = client.req.url.match(rx[0]);
      if (par) {
        par.shift();
        route = rx[1];
        break;
      }
    }
  }
  var renderer = types[typeof(route)];
  return renderer(route, par, client);
}

http.createServer(function (req, res) {
  res.end(router({ req: req, res: res }) + '');
}).listen(80);

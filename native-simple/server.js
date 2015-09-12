var http = require('http');

var me = { name: 'jura', age: 22 };

var routing = {
  '/': 'welcome to homepage',
  '/user': me,
  '/user/name': function() { return me.name; },
  '/user/age': function() { return me.age; }
};

var types = {
  object: function(o) { return JSON.stringify(o); },
  string: function(s) { return s; },
  undefined: function() { return 'not found'; },
  function: function(fn, req, res) { return fn(req, res) + ''; },
};

http.createServer(function (req, res) {
  var data = routing[req.url],
      result = types[typeof(data)](data, req, res);
  res.end(result);
}).listen(80);

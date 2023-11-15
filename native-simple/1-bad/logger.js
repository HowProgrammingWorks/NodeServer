'use strict';

const writeLog = (req) => () => {
  const time = Date.now() - req.requestTime;
  console.log(`${req.method} ${req.url} ${req.headers.referer} ${time}`);
};

const logger = (req, res, next) => {
  req.requestTime = Date.now();
  res.on('close', writeLog(req));
  next();
};

module.exports = logger;

'use strict';

const writeLog = (req, res) => () => {
  const time = Date.now() - req.requestTime;
  console.log(`${req.method} ${req.url} ${req.headers.referer} ${time}`);
};

const logger = (req, res, next) => {
  req.requestTime = Date.now();
  res.on('close', writeLog(req, res));
  next();
};

module.exports = logger;

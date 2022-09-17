'use strict';

const timeout = (msec) => (req, res, next) => {
  setTimeout(() => {
    const time = Date.now() - req.requestTime;
    if (!res.headerSent) {
      res.end(`Timeout reached: ${time} >= ${msec}`);
    }
  }, msec);
  next();
};

module.exports = timeout;

'use strict';

var secrets = require('../secrets');

module.exports = function(req, res, next) {
  res.locals.path = req.path;
  res.locals.googleAnalytics = secrets.googleAnalytics;
  next();
};

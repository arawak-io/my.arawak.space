'use strict';

var express = require('express');
var swig = require('swig');
var subdomainOffset = process.env.SUBDOMAIN_OFFSET || 0;
var secrets = require('./secrets');
var http     = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')({ session: session });
var mongoose = require('mongoose');
var passport = require('passport');
var bodyParser = require('body-parser');
var compress = require('compression')();
var lodash = require('lodash');
// var Authentication = require('./authentication');
var expressValidator = require('express-validator');
var errorHandler = require('./lib/error');
var viewHelper = require('./lib/view-helper');
var flash = require('express-flash');
var cors = require('cors');
var corsOptions = {
  origin: '*'
};
var staticDir;
var server   = http.createServer(app);
var io       = require('socket.io').listen(server);
//config files ================================================================

var credentials = require('./credentials.json');

var docker   = require('docker.io')({
  socketPath: false,
  host: 'http://'+credentials.host, port: '4243'});


// socket function =============================================================
require('./lib/sockets.js')(io, credentials, docker);

// setup db
mongoose.connect(secrets.db);
mongoose.connection.on('error', function() {
  console.error('MongoDB Connection Error. Make sure MongoDB is running.');
});

var corsOptions = {
  origin: '*'
};

// express setup
var app = express();

if (app.get('env') === 'production') {
  app.locals.production = true;
  swig.setDefaults({ cache: 'memory' });
  staticDir = path.join(__dirname + '/../public');
} else {
  app.locals.production = false;
  swig.setDefaults({ cache: false });
  staticDir = path.join(__dirname + '/../public');
}

// This is where all the magic happens!
app.engine('html', swig.renderFile);
app.set('views', path.join(__dirname, '../server/views'));
app.set('view engine', 'html');
app.locals._ = lodash;
app.locals.stripePubKey = secrets.stripeOptions.stripePubKey;


app.use(favicon(path.join(__dirname + '/../public/favicon.ico')));
app.use(logger('dev'));

app.use(compress);
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cookieParser());

app.use(express.static(staticDir));
if(app.get('env') !== 'production'){
  app.use('/styles', express.static(__dirname + '/../.tmp/styles'));
  // app.use('/', routes.styleguide);
}

app.use(session({
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 60 * 1000 // 1 minute
  },
  secret: secrets.sessionSecret,
  store: new MongoStore({
    url: secrets.db,
    aautoReconnect: true
  })
}));

// setup passport authentication
app.use(passport.initialize());
app.use(passport.session());

// other
app.use(flash());
app.use(cors(corsOptions));

var passportMiddleware = require('./lib/passport');
passportMiddleware(passport);

// setup view helper
app.use(viewHelper);

// setup routes
var routes = require('../server/routes');
routes(app, passport, docker);

/// catch 404 and forwarding to error handler
app.use(errorHandler.notFound);

/// error handlers
if (app.get('env') === 'development') {
  app.use(errorHandler.development);
} else {
  app.use(errorHandler.production);
}

module.exports = app;

const express = require('express');
const session = require('express-session');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// init mongodb before router require
// because models are used in routers
require('./mongodb');
const router = require('./router');

// create express instance
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
// init session
app.use(session({
  secret: 'test',
  resave: false,
  saveUninitialized: true
}));

// serve `build` dir as static files.
// in dev mode, it's in memory,
// in production mode, it's in disk.
app.use(express.static(path.join(__dirname, 'build')));

// serve `public` dir as static files.
app.use('/public', express.static(path.join(__dirname, '../public')));

// init ajax api routes
app.use('/api', router);

// for any other get requests, serve `index.html` file
app.get('*', (req, res) => {
  res.sendFile('build/index.html', {root: global});
});

module.exports = app;

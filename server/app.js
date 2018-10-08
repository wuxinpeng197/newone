const express = require('express');
const session = require('express-session');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

require('./mongodb');
const index = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
  secret: 'test',
  resave: false,
  saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'build')));
app.use('/public', express.static(path.join(__dirname, '../public')));
app.use('/api', index);
app.get('*', (req, res) => {
  res.sendFile('build/index.html', {root: global});
});

module.exports = app;

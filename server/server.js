#!/usr/bin/env node

const app = require('./app');
const http = require('http');

// create server and listen to 3001 port.
const port = 3001;
app.set('port', port);

const server = http.createServer(app);

server.listen(port);

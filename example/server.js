'use strict';

var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var baaw = require('../')(io, 'http://127.0.0.1:9999/socket.io/socket.io.js');

// HTTP setup

server.listen(9999);

app
  .get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
  });
  .get('/script', function (req, res) {
    res.setHeader('content-type', 'text/javascript');
    res.send(baaw.script.content);
  });

// Baaw setup

baaw.on('new', function (worker) {
  worker.work(
    function () {
      // Below code will be executed in browser
      document.body.style.background = 'red';
    }
  );
});

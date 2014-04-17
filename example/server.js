'use strict';

var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var baaw = require('../')(io, 'http://127.0.0.1:1337/socket.io/socket.io.js');

server.listen(1337);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.get('/script', function (req, res) {
  res.setHeader('content-type', 'text/javascript');
  res.send(baaw.script.content);
});

baaw.on('new', function (worker) {
  worker.work(
    // Inside browser
    function () {
      document.body.style.background = 'red';
    }
  );
});

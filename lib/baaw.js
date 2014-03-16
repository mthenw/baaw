'use strict';

var BrowserWorker = require('./BrowserWorker');
var BrowserScript = require('./BrowserScript');
var EventEmitter = require('events').EventEmitter;
var util = require('util');

var NAMESPACE = '/baaw';

var Baaw = function (io, url) {
  if (!io) {
    throw new Error('I need socket.io to live.');
  }

  if (!url) {
    throw new Error('I don\'t know URL of socket.io.');
  }

  this.script = new BrowserScript(url);

  var self = this;
  io.of(NAMESPACE).on('connection', function () {
    self.emit('new', new BrowserWorker());
  });
};

util.inherits(Baaw, EventEmitter);

module.exports = function (io, url) {
  return new Baaw(io, url);
};

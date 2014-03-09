'use strict';

var BrowserWorker = require('./BrowserWorker');
var BrowserScript = require('./BrowserScript');
var EventEmitter = require('events').EventEmitter;
var util = require('util');

var NAMESPACE = '/baaw';

var Baaw = function (io) {
  this.script = new BrowserScript();

  var self = this;
  io.of(NAMESPACE).on('connection', function () {
    self.emit('new', new BrowserWorker());
  });
};

util.inherits(Baaw, EventEmitter);

module.exports = function (io) {
  return new Baaw(io);
};

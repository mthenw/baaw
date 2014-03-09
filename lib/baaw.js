'use strict';

var Worker = require('./Worker');
var BrowserScript = require('./BrowserScript');
var EventEmitter = require('events').EventEmitter;
var util = require('util');

var NAMESPACE = '/baaw';

var Mistrz = function (io) {
  this.script = new BrowserScript();

  var self = this;
  io.of(NAMESPACE).on('connection', function () {
    self.emit('new', new Worker());
  });
};

util.inherits(Mistrz, EventEmitter);

module.exports = function (io) {
  return new Mistrz(io);
};

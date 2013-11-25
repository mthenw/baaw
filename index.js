'use strict';

var Agent = require('./lib/agent');
var EventEmitter = require('events').EventEmitter;
var util = require('util');

var Mistrz = function (io) {
    var NAMESPACE = '/mistrz';
    var self = this;

    io.of(NAMESPACE).on('connection', function () {
        self.emit('new', new Agent());
    });
};

util.inherits(Mistrz, EventEmitter);

module.exports = function (io) {
    return new Mistrz(io);
};

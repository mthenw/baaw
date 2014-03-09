'use strict';

var sinon = require('sinon');
var expect = require('chai').expect;
var EventEmitter = require('events').EventEmitter;
var JobManager = require('../lib/job_manager');

describe('JobManager', function () {
  it('should send result to server', function () {
    var socket = new EventEmitter();
    sinon.spy(socket, 'emit');

    var manager = new JobManager(socket);
    manager.sendResult({});

    expect(socket.emit.calledWith('done', {})).to.be.true;
  });
});
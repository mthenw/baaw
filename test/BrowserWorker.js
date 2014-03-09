'use strict';

var sinon = require('sinon');
var expect = require('chai').expect;
var EventEmitter = require('events').EventEmitter;
var BrowserWorker = require('../lib/BrowserWorker');

describe('BrowserWorker', function () {
  beforeEach(function () {
    this.socket = new EventEmitter();
    sinon.spy(this.socket, 'emit');
    this.worker = new BrowserWorker(this.socket);
  });

  it('should send job to remote worker using socket', function () {
    this.worker.work(function () { console.log('test'); });

    expect(this.socket.emit.lastCall.args[0]).to.eql('work');
    expect(this.socket.emit.lastCall.args[1].executor).to.eql('function () { console.log(\'test\'); }');
  });

  it('should send data to remote worker', function () {
    this.worker.work(function () { console.log('test'); }, {user: 1});

    expect(this.socket.emit.lastCall.args[1]).to.eql({
      executor: 'function () { console.log(\'test\'); }',
      data: { user: 1 }
    });
  });

  it('should (un)register callback when remote worker is done', function (done) {
    this.worker.work(
      function () {
        console.log('test');
      },
      {},
      done
    );

    this.socket.emit('done');
    this.socket.emit('done');
  });

  it('should optionally accept callback as a second parameter', function (done) {
    this.worker.work(
      function () {
        console.log('test');
      },
      done
    );

    this.socket.emit('done');
  });
});

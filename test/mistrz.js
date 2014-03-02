'use strict';

var sinon = require('sinon');
var Agent = require('../lib/agent');
var BrowserScript = require('../lib/browser_script');
var EventEmitter = require('events').EventEmitter;

describe('mistrz', function () {
  beforeEach(function () {
    this.namespace = new EventEmitter();
    this.namespaceStub = sinon.stub(this.namespace, 'on').withArgs('connection').yieldsAsync();

    this.io = {of: function () {
    }};
    this.ioStub = sinon.stub(this.io, 'of').withArgs('/mistrz').returns(this.namespace);
  });

  it('should emit "new" event for every connected agent', function (done) {
    var mistrz = require('../')(this.io);
    mistrz.on('new', function () {
      done();
    });

    this.ioStub.called.should.equal(true);
    this.namespaceStub.called.should.equal(true);
  });

  it('should emit "new" event with agent instance', function (done) {
    var mistrz = require('../')(this.io);
    mistrz.on('new', function (agent) {
      agent.should.be.instanceOf(Agent);
      done();
    });

    this.ioStub.called.should.equal(true);
    this.namespaceStub.called.should.equal(true);
  });

  it('should return browser script', function () {
    var mistrz = require('../')(this.io);

    mistrz.script.should.be.an.instanceOf(BrowserScript);
  });
});

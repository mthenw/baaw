'use strict';

var sinon = require('sinon');
var expect = require('chai').expect;
var Agent = require('../lib/agent');
var BrowserScript = require('../lib/browser_script');
var EventEmitter = require('events').EventEmitter;

describe('mistrz', function () {
  beforeEach(function () {
    this.namespace = new EventEmitter();
    sinon.stub(this.namespace, 'on').withArgs('connection').yieldsAsync();

    this.io = {of: function () {}};
    sinon.stub(this.io, 'of').withArgs('/mistrz').returns(this.namespace);
  });

  afterEach(function () {
    this.namespace.on.restore();
    this.io.of.restore();
  });

  it('should emit "new" event with agent instance', function (done) {
    var mistrz = require('../lib/mistrz')(this.io);
    mistrz.on('new', function (agent) {
      expect(agent).to.be.instanceOf(Agent);
      done();
    });
  });

  it('should return browser script', function () {
    var mistrz = require('../')(this.io);

    expect(mistrz.script).to.be.an.instanceOf(BrowserScript);
  });
});

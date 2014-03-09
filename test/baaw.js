'use strict';

var sinon = require('sinon');
var expect = require('chai').expect;
var Worker = require('../lib/Worker');
var BrowserScript = require('../lib/BrowserScript');
var EventEmitter = require('events').EventEmitter;

describe('baaw', function () {
  beforeEach(function () {
    this.namespace = new EventEmitter();
    sinon.stub(this.namespace, 'on').withArgs('connection').yieldsAsync();

    this.io = {of: function () {}};
    sinon.stub(this.io, 'of').withArgs('/baaw').returns(this.namespace);
  });

  afterEach(function () {
    this.namespace.on.restore();
    this.io.of.restore();
  });

  it('should emit "new" event with Worker instance', function (done) {
    var baaw = require('../lib/baaw')(this.io);
    baaw.on('new', function (worker) {
      expect(worker).to.be.instanceOf(Worker);
      done();
    });
  });

  it('should return BrowserScript instance', function () {
    var baaw = require('../')(this.io);

    expect(baaw.script).to.be.an.instanceOf(BrowserScript);
  });
});

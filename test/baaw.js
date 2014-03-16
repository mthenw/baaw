'use strict';

var sinon = require('sinon');
var expect = require('chai').expect;
var BrowserWorker = require('../lib/BrowserWorker');
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

  it('should emit "new" event with BrowserWorker instance', function (done) {
    var baaw = require('../')(this.io, 'localhost');
    baaw.on('new', function (worker) {
      expect(worker).to.be.instanceOf(BrowserWorker);
      done();
    });
  });

  it('should return BrowserScript instance', function () {
    var baaw = require('../')(this.io, 'localhost');

    expect(baaw.script).to.be.an.instanceOf(BrowserScript);
  });

  it('should throw error if no socket.io instance', function () {
    expect(function () {
      require('../')();
    }).to.throw(/I need socket.io to live./);
  });

  it('should throw error if no socket.io url passed', function () {
    var self = this;
    expect(function () {
      require('../')(self.io);
    }).to.throw(/I don't know URL of socket.io./);
  });
});

'use strict';

var jsdom = require('jsdom');
var expect = require('chai').expect;
var BrowserScript = require('../lib/BrowserScript');

describe('BrowserScript', function () {
  var window;

  beforeEach(function (done) {
    var html = '<!doctype html><title></title><body></body>';
    var script = new BrowserScript('socket.io');

    jsdom.env({
      html: html,
      src: [script.content],
      done: function (err, domWindow) {
        window = domWindow;
        done();
      }
    });
  });

  afterEach(function () {
    window.close();
  });

  it('should load socket.io from server', function () {
    var script = window.document.getElementsByTagName('script')[0];
    expect(script).to.be.ok;
    expect(script.src).to.equal('socket.io');
    expect(script.type).to.equal('text/javascript');
  });

  it('should define JobManager', function () {
    expect(window.JobManager).to.be.ok;
  });
});

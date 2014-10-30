'use strict';

var sinon = require('sinon');
var jsdom = require('jsdom');
var expect = require('chai').expect;
var loader = require('../lib/loader');

describe('loader', function () {
  var window;

  beforeEach(function (done) {
    var html = '<!doctype html><title></title><body></body>';

    jsdom.env({
      html: html,
      src: [loader.toString()],
      done: function (err, domWindow) {
        window = domWindow;
        done();
      }
    });
  });

  afterEach(function () {
    window.close();
  });

  it('should callback after script load', function () {
    var callback = sinon.spy();
    window.loader(callback);
    var script = window.document.getElementsByTagName('script')[0];

    script.onload();

    expect(callback.calledOnce).to.be.true;
  });
});

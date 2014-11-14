/* jshint evil:true */
/* global io:false */
'use strict';

var JobManager = require('./JobManager');
var loader = require('./loader');

function BrowserScript(url, namespace) {
  this.content = stringifyJobManager() + stringifyLoader(url) + stringifyLoaderExecution(namespace);
}

function stringifyLoader(url) {
  return ';' + loader.toString().replace('URL', url);
}

function stringifyJobManager() {
  return ';' + JobManager.toString();
}

function stringifyLoaderExecution(namespace) {
  return ';loader(' +
    (function () {
      var socket = io.connect('127.0.0.1NAMESPACE');
      var manager = new JobManager(socket);

      socket.on('connect', function () {
        socket.on('work', function (job) {
          var executor = new Function('data', 'manager', 'return (' + job.executor  + ')(data, manager)');
          executor(job.data, manager);
        });
        console.log('baaw connected');
      });
    }).toString().replace('NAMESPACE', namespace) +
  ');';
}

module.exports = BrowserScript;

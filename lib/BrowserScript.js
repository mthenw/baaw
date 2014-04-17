/* jshint evil:true */
/* global io:false */
'use strict';

var JobManager = require('./JobManager');

function BrowserScript(url, namespace) {
  this.content = stringifyJobManager() + stringifyLoader(url) + stringifyLoaderExecution(namespace);
}

function loader(callback) {
  var head = document.getElementsByTagName('body')[0];
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'URL';
  script.onload = callback;
  head.appendChild(script);
}

function stringifyLoader(url) {
  return loader.toString().replace('URL', url);
}

function stringifyJobManager() {
  return JobManager.toString() + ';';
}

function stringifyLoaderExecution(namespace) {
  return ';loader(' +
    (function () {
      var socket = io.connect('127.0.0.1NAMESPACE');
      var manager = new JobManager(socket);

      socket.on('connect', function () {
        socket.emit('idle');

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

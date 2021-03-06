'use strict';

function BrowserWorker(socket) {
  this.socket = socket;
}

BrowserWorker.prototype.work = function (executor, data, callback) {
  if (typeof data === 'function') {
    callback = data;
    data = {};
  }

  var payload = {
    executor: executor.toString(),
    data: data
  };
  this.socket.emit('work', payload);

  registerCallback(this.socket, callback);
};

function registerCallback(socket, callback) {
  socket.currentJobCallback = callback;

  socket.on('done', function (data) {
    socket.removeAllListeners('done');
    socket.currentJobCallback(data);
  });
}

module.exports = BrowserWorker;

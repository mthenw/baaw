'use strict';

module.exports = function JobManager(socket) {
  this.socket = socket;
  this.sendResult = function (result) {
    this.socket.emit('done', result);
  };
};

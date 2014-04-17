'use strict';

module.exports = function (socket) {
  this.sendResult = function (result) {
    socket.emit('done', result);
  };
};

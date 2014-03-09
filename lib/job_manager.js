module.exports = function JobManager(socket) {
  this.sendResult = function (result) {
    socket.emit('done', result);
  };
};
'use strict';

var Agent = function (socket) {
    var registerCallback = function (callback) {
        socket.currentJobCallback = callback;

        socket.on('done', function () {
            socket.removeAllListeners('done');
            socket.currentJobCallback();
        });
    };

    this.do = function (executor, data, callback) {
        if (typeof data === 'function') {
            callback = data;
            data = {};
        }

        var payload = {
            executor: executor.toString(),
            data: data
        };
        socket.emit('do', payload);

        registerCallback(callback);
    };
};

module.exports = Agent;
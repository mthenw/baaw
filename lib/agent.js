'use strict';

var Agent = function (socket) {
    this.do = function (executor, data) {
        var payload = {};

        payload.executor = executor.toString();
        payload.data = data;

        socket.emit('do', payload);
    };
};

module.exports = Agent;
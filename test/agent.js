'use strict';

var sinon = require('sinon');
var EventEmitter = require('events').EventEmitter;
var Agent = require('../lib/agent');

describe('Agent', function () {
    beforeEach(function () {
        this.socket = new EventEmitter();
        this.socketSpy = sinon.spy(this.socket, 'emit');
    });

    it('should send job to remote agent using socket', function () {
        var agent = new Agent(this.socket);

        agent.do(function () { console.log('test'); });

        this.socketSpy.lastCall.args[0].should.eql('do');
        this.socketSpy.lastCall.args[1].executor.should.eql('function () { console.log(\'test\'); }');
    });

    it('should send data to remote agent', function () {
        var agent = new Agent(this.socket);

        agent.do(function () { console.log('test'); }, {user: 1});

        this.socketSpy.lastCall.args[1].should.eql({
            executor: 'function () { console.log(\'test\'); }',
            data: { user: 1 }
        });
    });

    it('should (un)register callback when remote agent is done', function (done) {
        var agent = new Agent(this.socket);

        agent.do(
            function () { console.log('test'); },
            {},
            done
        );

        this.socket.emit('done');
        this.socket.emit('done');
    });

    it('should accept callback as a second parameter', function (done) {
        var agent = new Agent(this.socket);

        agent.do(
            function () { console.log('test'); },
            done
        );

        this.socket.emit('done');
    });
});
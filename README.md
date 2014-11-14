# baaw
compute on the client side

[![Build Status](https://travis-ci.org/mthenw/baaw.svg)](https://travis-ci.org/mthenw/baaw)

## Installation

    npm install baaw --save

## What is it?

baaw is a small library on top of [socket.io](https://github.com/Automattic/socket.io) that allows delegating work to the remote browsers in few small steps ([working example](https://github.com/mthenw/baaw/tree/master/example)):

#### Initialize baaw with socket.io instance and socket.io client library url (server side)

```
  var baaw = require('baaw')(io, 'http://127.0.0.1:9999/socket.io/socket.io.js');
```

#### Host baaw init script, for example with express (server side):

```
  app
    .get('/script', function (req, res) {
      res.setHeader('content-type', 'text/javascript');
      res.send(baaw.script.content);
    });
```

#### Add this script tag to some page (client side)

```
  <script src="http://127.0.0.1:9999/script" type="text/javascript"></script>
```

#### Delegate some work (server side)

```
  baaw.on('new', function (worker) {
    // New worker (browser) connected

    var executor = function (color, manager) {
      // Below code will be executed in browser
      document.body.style.background = 'red';
      jobManager.sendResult('I\'ve change background color!');
    }

    // Data passed to executor
    var data = 'red';

    var onDone = function (result) {
      // Below code will be excuted in node after sending result from browser
      console.log('Browsers result:', result);
    };

    worker.work(executor, data, onDone);
  });
```

## API

### baaw(io, url)

* ``io`` - socket.io instance
* ``url`` - url where socket.io will host client side library

Events:

* ```new``` - new browser connected, callback gets ```worker``` (an instance of BrowserWorker) as a first argument

### BrowserWorker

#### work(executor, data, onDone)
delegate some work to browser

* ```executor(data, manager)``` - function that will be executed in browser,
* ```data``` - data that will be passed as first argument to executor
* ```onDone(result)``` - function that will be executed on server side when browser will finish execution

### JobManager
JobManager instance is passed to executor function as a second argument. It's used to send result to server.

* ```sendResult(result)``` - send result back to server, after that onDone will be called with ```result```.

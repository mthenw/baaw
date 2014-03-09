var JobManager = require('./JobManager');

function BrowserScript(url) {
  var URL = url;

  function loader() {
    var head = document.getElementsByTagName('body')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = URL;
    head.appendChild(script);
  }

  function stringifyLoader() {
    return loader.toString().replace('URL', "'" + URL + "'");
  }

  function stringifyJobManager() {
    return JobManager.toString() + ';';
  }

  this.content = stringifyJobManager() + stringifyLoader() + ';loader();'
}


module.exports = BrowserScript;
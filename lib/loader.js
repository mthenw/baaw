'use strict';

module.exports = function loader(callback) {
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'URL';
  script.onload = callback;
  head.appendChild(script);
};

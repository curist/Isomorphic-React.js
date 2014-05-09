/** @jsx React.DOM */

(function muteUsefulLogs(do_it) {
  if(do_it && window.console) {
    window.console.warn = dummy;
    window.console.debug = dummy;
    window.console.log = dummy;
  }
  function dummy() {}
})(false);

var React = require('react');

var RootNode = require('app/views/root_node');

var routing = require('app/routing');
var Promise = require('bluebird');

require('domready')(function() {
  var router = routing.getRouter();
  router.configure({
    notfound: function() {
      console.log('not found');
      // 重新整理頁面 -> 導到後端
      window.location.reload();
    },
    html5history: true,
    strict: false,
    before: function() {
      var deferred = Promise.defer();
      this.deferred = deferred;
      this.promise = deferred.promise;
    },
    on: function() {
      console.log('on to something');
      render();
    }
  });

  document.addEventListener('click', function(e) {
    var el = e.target
      , dataset = el && el.dataset
    ;
    if (el && el.nodeName === 'A' && (
      dataset.passThru == null || dataset.passThru === 'false'
    )) {
      router.setRoute(el.attributes.href.value);
      e.preventDefault();
    }
  }.bind(this), false);

  router.init();
});



function getRoutePath() {
  var pathname = window.location.pathname;
  return pathname;
}

function render() {
  React.renderComponent(RootNode({
    side: 'client',
    route: getRoutePath()
  }), document.getElementById('container'));

  console.log('render');
}

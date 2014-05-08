require('node-jsx').install({
  extension: '.jsx'
});

var express = require('express');
var app = express();
var url = require('url');
var Promise = require('bluebird');

app.configure('development', function() {
  app.use(require('connect-livereload')());
});

app.use(express.compress());
app.use(express.static(__dirname + '/public'));


var React = require('react');
var SiteNode = require('app/views/site_node');

app.get('/*', function(req, res) {
  var routing = require('app/routing');
  var router = routing.router;
  var pathname = url.parse(req.url).pathname;

  router.configure({
    notfound: function() {
      res.end('404', 404);
    },
    strict: false,
    before: function() {
      var deferred = Promise.defer();
      this.deferred = deferred;
      this.promise = deferred.promise;
    },
    on: function() {
      console.log('on to something');
      this.deferred.resolve();
      this.promise.then(function(template) {
        var template = React.renderComponentToString(SiteNode({
          side: 'server',
          route: pathname
        }));
        res.end(template);
      });
    }
  });

  router.dispatch('on', pathname);
});

app.listen(3000);

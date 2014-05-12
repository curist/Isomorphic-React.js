require('node-jsx').install({
  extension: '.jsx'
});

var express = require('express');
var app = express();

var env = process.env.NODE_ENV;

var compress = require('compression');
var serveStatic = require('serve-static');

var url = require('url');
var Promise = require('bluebird');


// Using log4js as logger
require('log4js').replaceConsole();

if(env == 'development') {
  app.use(require('connect-livereload')());
}

app.use(compress());
app.use(serveStatic (__dirname + '/public'));


var request = require('superagent');
app.get('/api/news', function(req, res) {
  console.log('api being queried!');
  request('http://api.ihackernews.com/page')
    .end(function(err, resp) {
      if(err) {
        console.log(err);
        res.json([]);
      } else {
        res.json(resp.body.items);
      }
    });
});


var ReactAsync = require('react-async');
var SiteNode = require('app/views/site_node');
app.get('/*', function(req, res) {
  var routing = require('app/routing');
  var router = routing.getRouter();
  var pathname = url.parse(req.url).pathname;

  // router configure放這是為了把res, req丟進scope
  router.configure({
    notfound: function() {
      res.send('404', 404);
    },
    strict: false,
    before: function() {
      var deferred = Promise.defer();
      this.deferred = deferred;
      this.promise = deferred.promise;

      // TODO 搞定bluebird的promise timeout
    },
    on: function() {
      // TODO 處理錯誤，promise被reject時...?
      this.promise.then(function(component) {
        ReactAsync.renderComponentToStaticMarkupWithAsyncState(SiteNode({
          side: 'server',
          route: pathname,
          content: component
        }), function(err, template) {
          // TODO 處理錯誤，render component裡有拿非同步資料失敗時...?
          res.send(template);
        });
      });
    }
  });

  router.dispatch('on', pathname);
});

var PORT = process.env.PORT || 80;
app.listen(PORT, function() {
  console.log('start serving @ :' + PORT);
});


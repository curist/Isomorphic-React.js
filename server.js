require('node-jsx').install({
  extension: '.jsx'
});

var express = require('express');
var app = express();
var url = require('url');

app.configure('development', function() {
  app.use(require('connect-livereload')());
});

app.use(express.compress());
app.use(express.static(__dirname + '/public'));


var React = require('react');
var SiteNode = require('app/views/site_node');

// TODO '/p' should also redirect to '/p/'
app.get('/', function(req, res) {
  res.redirect('/p/');
});

app.get('/p/*', function(req, res) {
  var req_path = url.parse(req.url).pathname;
  var route_path = req_path.replace(/^\/p/, '');

  var template = React.renderComponentToString(SiteNode({
    side: 'server',
    route_path: route_path
  }));

  res.end(template);
});

app.listen(3000);

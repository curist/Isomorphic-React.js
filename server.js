require('node-jsx').install({
  extension: '.jsx'
});

var express = require('express');
var app = express();
var url = require('url');

app.use(express.compress());
app.use(express.static(__dirname + '/public'));


var React = require('react');
var SiteNode = require('app/views/site_node');

var template = React.renderComponentToString(SiteNode({
  side: 'server'
}));

app.get('/', function(req, res) {
  res.redirect('/p/');
});

app.get('/p/*', function(req, res) {
  var req_path = url.parse(req.url).pathname;
  console.log(req_path);
  res.end(template);
});

app.listen(3000);

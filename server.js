require('node-jsx').install({
  extension: '.jsx'
});

var express = require('express');
var app = express();

app.use(express.compress());
app.use(express.static(__dirname + '/public'));


var React = require('react');
var SiteNode = require('app/views/site_node');

var template = React.renderComponentToString(SiteNode({
  side: 'server'
}));

app.get('*', function(req, res) {
  res.end(template);
});

app.listen(3000);

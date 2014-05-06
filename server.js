require('node-jsx').install({
  extension: '.jsx'
});

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.listen(3000);

var React = require('react');
var RootNode = require('app/views/root_node');
console.log(
  React.renderComponentToString(RootNode())
);


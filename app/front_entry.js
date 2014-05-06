var React = require('react');
var RootNode = require('app/views/root_node');

React.renderComponent(
  RootNode({side: 'client'}),
  document.getElementById('container')
);




/** @jsx React.DOM */

var React = require('react');

// (function() {
//   var SiteNode = require('app/views/site_node');

//   console.log('很酷內');
//   React.renderComponent(
//     <SiteNode side="client" />,
//     document
//   );

// })();

var RootNode = require('app/views/root_node');
React.renderComponent(
  RootNode({side: 'client'}),
  document.getElementById('container')
);



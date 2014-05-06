/** @jsx React.DOM */

var React = require('react');

var SiteBoilerPlate = require('app/views/_core/SiteBoilerPlate');
var RootNode = require('app/views/root_node');

module.exports = React.createClass({
  render: function() {
    return (
      <SiteBoilerPlate>
        <RootNode side={this.props.side} />
      </SiteBoilerPlate>
    );
  }
});

/** @jsx React.DOM */

var React = require('react');
var ReactAsync = require('react-async');

var SiteBoilerPlate = require('app/views/_core/SiteBoilerPlate');
var RootNode = require('app/views/root_node');

module.exports = React.createClass({
  mixins: [ReactAsync.Mixin],
  getInitialStateAsync: function(cb) {
    cb(null, {});
  },
  render: function() {
    return (
      <SiteBoilerPlate>
        <RootNode
          side={this.props.side}
          route={this.props.route} />
      </SiteBoilerPlate>
    );
  }
});

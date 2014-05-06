/** @jsx React.DOM */

var React = require('react');

var Foo = require('app/views/components/foo');

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        root node from { this.props.side }
        <Foo/>
      </div>
    );
  }
});

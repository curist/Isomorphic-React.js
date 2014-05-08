/** @jsx React.DOM */

var React = require('react');

var Foo = require('app/views/components/foo');

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <a href="/">home</a><br/>
        <p>root node from { this.props.side }</p>
        <p>current route: { this.props.route }</p>
        <a href="#/yohoho">#/yohoho</a><br/>
        <a href="/yohoho">/yohoho</a><br/>
        <a href="/p/yohoho">/p/yohoho</a><br/>
        <a href="/p/kkthx/bye">/p/kkthx/bye</a><br/>
        <Foo/>
      </div>
    );
  }
});

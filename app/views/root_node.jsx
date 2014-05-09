/** @jsx React.DOM */

var React = require('react');

var Foo = require('app/views/components/foo');
var News = require('app/views/components/news');

var style = {
  'float': 'left',
  'border': '1px solid black',
  'margin-left': '15px',
  'padding': '8px'
};

module.exports = React.createClass({
  render: function() {
    // TODO give News some props to determine what to search
    return (
      <div>
        <div className="side-bar" style={style}>
          <a href="/">home</a><br/>
          <p>root node from { this.props.side }</p>
          <p>current route: { this.props.route }</p>
          <a href="#/yohoho">#/yohoho</a><br/>
          <a href="/yohoho">/yohoho</a><br/>
          <a href="/p/yohoho">/p/yohoho</a><br/>
          <a href="/p/kkthx/bye">/p/kkthx/bye</a><br/>
          <Foo/>
          <Foo/>
          <Foo/>
        </div>
        <div className="content" style={style}>
          <News />
        </div>
      </div>
    );
  }
});

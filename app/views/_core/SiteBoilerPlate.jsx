/** @jsx React.DOM */

var React = require('react');

var SiteBoilerPlate = React.createClass({
  render: function() {
    return (
      <html>
        <head>
          <meta charSet="UTF-8" />
          <title>數位印花兒兒兒</title>
        </head>
        <body>
          <div id="container">
            {this.props.children}
          </div>
          <script src="/js/front_entry.js" />
        </body>
      </html>
    );
  }
});

module.exports = SiteBoilerPlate;


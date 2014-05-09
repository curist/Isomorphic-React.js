/** @jsx React.DOM */

var React = require('react');

var SiteBoilerPlate = React.createClass({
  render: function() {
    var preloadedPayload = {
      __html: 'window.__preloadedModelValues = {};'
    };

    return (
      <html>
        <head>
          <meta charSet="UTF-8" />
          <title>數位印花兒兒兒</title>
          <script dangerouslySetInnerHTML={preloadedPayload} />
        </head>
        <body>
          <div id="container">
            {this.props.children}
          </div>
          <script src="/js/bundle.js" />
        </body>
      </html>
    );
  }
});

module.exports = SiteBoilerPlate;


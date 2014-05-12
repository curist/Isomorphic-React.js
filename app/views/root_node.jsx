/** @jsx React.DOM */

var React = require('react');

var NewsList = require('app/views/components/news_list');

var style = {
  'float': 'left',
  'border': '1px solid black',
  'margin-left': '15px',
  'padding': '8px'
};

module.exports = React.createClass({
  render: function() {
    var navBarStyle = {
      position: 'fixed',
      zIndex: '100',
      top: 0,
      left: 0,
      right: 0,
      width: '100%',
      height: '60px',
      border: '1px solid black'
    };

    var contentStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      left: 0,
      paddingTop: '60px'
    };

    var links = [{
      name: 'home',
      path: '/'
    }, {
      name: 'news',
      path: '/news'
    }, {
      name: 'about',
      path: '/about'
    }];

    return (
      <div>
        <div className="nav-bar" style={navBarStyle}>
          {
            links.map(function(link, i) {
              var linkStyle = {
                display: 'inline-block',
                margin: '0 15px'
              };
              return (
                <a href={link.path} key={i} style={linkStyle}>{link.name}</a>
              );
            })
          }
        </div>
        <div className="content" style={contentStyle}>
          {this.props.content}
        </div>
      </div>
    );
  }
});

/** @jsx React.DOM */

var React = require('react');
var ReactAsync = require('react-async');
var _ = require('underscore');

var NewsAgent = require('app/models/news');
var NewsDataInjector = NewsAgent.Injector;

var style = {
  'border-radius': '5px',
  'background-color': '#ccc',
  'margin': '10px 0',
  'padding': '8px'
}

var News = React.createClass({
  mixins: [ReactAsync.Mixin],
  getInitialStateAsync: function(cb) {
    // TODO error 處理
    NewsAgent.getter().then(function(news) {
      console.log('got news data, going to render!');
      cb(null, {
        news: news
      });
    });
  },
  render: function() {
    return (
      <div>
        {_(this.state.news).map(function(news, i) {
          return (
            <div className="news-block" key={i} style={style}>
              <a href={news.url}>{news.title}</a><br/>
              points: {news.points}<br/>
              comments: {news.commentCount}
            </div>
          );
        })}
        <NewsDataInjector />
      </div>
    );
  }
});

module.exports = News;


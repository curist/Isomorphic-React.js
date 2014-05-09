/** @jsx React.DOM */

var request = require('superagent');
var Promise = require('bluebird');
var isServer = (typeof window == 'undefined');

var News = {
  value: null
};

if(!isServer && window.__preloadedModelValues.News) {
  News.value = window.__preloadedModelValues.News;
}

// TODO 短期重覆call，還沒完成上次request時，
// 直接回傳一個新的promise，不重覆作request，
// 之後在第一次送的request完成時對所有這期間的promises
// resolve或reject
News.willGetNews = function() {
  var deferred = Promise.defer();
  if(News.value) {
    // TODO 加cache expiration
    deferred.resolve(News.value);

  } else {
    // TODO url 改為相對於目前host
    request.get('http://localhost:3000/api/news')
      .end(function(err, res) {
        if(err) {
          deferred.reject(err);
        } else {
          // TODO 資料檢查之類的
          News.value = res.body;
          deferred.resolve(News.value);
        }
      });
  }
  return deferred.promise;
};

News.hardReplaceValue = function(value) {
  News.value = JSON.parse(value);
}

var DataInjector = require('app/views/utils/data_injector');
var React = require('react');
News.Injector = React.createClass({
  render: function() {
    return (
      <DataInjector
        data-model={News}
        data-modelName='News'
        data-getterName='willGetNews'
      />
    )
  }
});

module.exports = News;

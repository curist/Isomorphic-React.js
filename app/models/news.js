var request = require('superagent');
var Promise = require('bluebird');

var News = {};

// TODO 加cache
News.willGetNews = function() {
  var deferred = Promise.defer();
  // TODO url 改為相對於目前host
  request.get('http://localhost:3000/api/news')
    .end(function(err, res) {
      if(err) {
        deferred.reject(err);
      } else {
        deferred.resolve(res.body);
      }
    });
  return deferred.promise;
};


module.exports = News;

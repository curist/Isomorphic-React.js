/** @jsx React.DOM */

var React = require('react');
var request = require('superagent');
var Promise = require('bluebird');
var DataInjector = require('app/views/utils/data_injector');
var isServer = (typeof window == 'undefined');

var RegisteredModelNames = {};

var Mado = (function (){
  var model_name;
  var api_url;
  var parse = function(body) {
    return body;
  };

  var cached_value = null;
  var injector = null;

  var NewMado = function(name, obj){
    var context = this;
    // 參數檢查
    if(typeof name != 'string' ||
       typeof obj != 'object' ||
       typeof obj.url != 'string' ||
       (obj.parse && typeof obj.parse != 'function')) {
      var message = "bad parameter to initialize Mado!\n" +
        "example:\n\n" +
        "var books = new Mado('books', {\n" +
        "  url: 'http://api.example.com/books',  // must provide protocol!!\n" +
        "  parse: function(body) {               // callback to parse requested data\n" +
        "    return JSON.parse(body);\n" +
        "  }\n" +
        "});";
      // TODO url 改為相對於目前host
      // TODO throw時帶行號，最好還有stack trace
      throw message;

    } else {
      // 再檢查有無同名的mado
      if(RegisteredModelNames[name]) {
        throw "Mado name conflicted";
      }
      RegisteredModelNames[name] = true;
    }

    context.mado = model_name = name;
    api_url = obj.url;
    parse = obj.parse || parse;

    context.Injector =  React.createClass({
      render: function() {
        return (
          <DataInjector
            data-model={context}
            data-modelName={model_name}
          />
        );
      }
    });

    if(!isServer && window.__preloadedModelValues[model_name]) {
      cached_value = window.__preloadedModelValues[model_name];
    }

    context.getter = function getter(){
      var deferred = Promise.defer();
      if(cached_value) {
        // TODO 加cache expiration
        deferred.resolve(cached_value);

      } else {
        request.get(api_url)
          .end(function(err, res) {
            if(err) {
              deferred.reject(err);
            } else {
              // TODO 資料檢查之類的
              cached_value = parse(res.body);
              deferred.resolve(cached_value);
            }
          });
      }
      return deferred.promise;
    };

  };

  return NewMado;
})();


module.exports = Mado;

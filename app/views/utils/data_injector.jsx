/** @jsx React.DOM */

var React = require('react');
var ReactAsync = require('react-async');
var Promise = require('bluebird');

// take props
// - modelName  String
// - setterName String
// - value      String (JSON.stringified)
var DataInjector = React.createClass({
  mixins: [ReactAsync.Mixin],
  getInitialStateAsync: function(cb) {
    var model = this.props['data-model'];
    var getterName = this.props['data-getterName'];
    model[getterName]().then(function(data) {
      cb(null, {
        payload_data: JSON.stringify(data)
      });
    });
  },
  render: function() {
    var scripts =
      'window.__preloadedModelValues["' + this.props['data-modelName'] + '"] = ' +
      this.state.payload_data + ';';

    var payload = {
      __html: scripts
    };

    return (
      <script dangerouslySetInnerHTML={payload} />
    );
  }
});

module.exports = DataInjector;


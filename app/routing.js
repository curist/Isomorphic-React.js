var director = require('director');

var routes = {
  before: function() {
    console.log('before');
  },
  '/': function() {
    console.log('root?');
  },
  '/p': {
    on: function() {
      console.log('empty..');
    },
    '/.*': function() {
      console.log('all matched');
    }
  }
};

module.exports.routes = routes;


var Router = require('director').Router;
var router = new Router(routes);
module.exports.router = router;


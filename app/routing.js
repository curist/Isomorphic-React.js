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

// TODO function to mount more routing to router
// make a new folder `routes` to contain modular routings?
// PSEUDO CODE here
// function mountMore(router, routes, root_path) {
//   router.mount(routes, root_path);
// }

var Router = require('director').Router;
module.exports.getRouter = function() {
  var router = new Router(routes);
  return router;
}


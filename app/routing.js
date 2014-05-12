var director = require('director');

var routes = {
  before: function() {
  },
  '/': function() {
    var HomePage = require('app/views/pages/home');
    this.deferred.resolve(HomePage({}));
  },
  '/news': function() {
    var NewsList = require('app/views/components/news_list');
    this.deferred.resolve(NewsList({}));
  },
  '/about': function() {
    var AboutPage = require('app/views/pages/about');
    this.deferred.resolve(AboutPage({}));
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


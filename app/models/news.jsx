var Mado = require('app/models/_mado');
var News = new Mado('News', {
  url: 'http://localhost:3000/api/news'
});

module.exports = News;

// Load Controllers
var home = require('./controllers/home_controller')
  , canvas = require('./controllers/canvas_controller');

module.exports = function(app) {
  app.get('/', home.index);

  app.get('/canvas', canvas.index);
  app.get('/canvas/new', canvas.create);
  app.get('/canvas/:public_id', canvas.show);

};
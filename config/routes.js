// Load Controllers
var home = require('../controllers/home_controller')
  , canvas = require('../controllers/canvas_controller');

module.exports = function(app) {
  // Home Routes
  app.get('/', home.index);
  app.get('/about', home.about);
  app.get('/avatar', home.avatar);

  // Canvas Routes
  app.get('/canvas', canvas.create);
  app.get('/canvas/create', canvas.create);
  app.post('/canvas/create', canvas.create);
  app.get('/canvas/:public_id', canvas.show);
  app.get('/canvas/:public_id/fork', canvas.fork);

};
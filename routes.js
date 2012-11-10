// Load Controllers
var home = require('./controllers/home_controller');

module.exports = function(app) {
  app.get('/', home.index);
};
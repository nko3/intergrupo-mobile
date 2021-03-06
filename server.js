
/**
 * Canvas Model Design
 *
 */
var express = require('express')
  , http = require('http')
  , path = require('path')
  , fs = require('fs')
  , ratchet = require('ratchetio');

var app = express()
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);

app.configure(function(){
  var MemoryStore = require('connect').session.MemoryStore;

  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('th4c00k13p4s3r'));
  app.use(express.session({ store: new MemoryStore({ reapInterval: 60000 * 10 }) }));
  app.use(app.router);
  ratchet.handleUncaughtExceptions("969336c0071448bf9892a855ea0d0843");
  app.use(ratchet.errorHandler("969336c0071448bf9892a855ea0d0843"));
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// Load Config
require('./config/config');

// Database
require('./config/db');

// Load Models
var modelPath = __dirname + '/models'
  , models = fs.readdirSync(modelPath);

models.forEach(function(file) {
  require(modelPath + '/' + file);
});

// Load Routes
require('./config/routes')(app);

// Load Socket Server
require('./utils/sockets')(io);

server.listen(app.get('port'), function(){
  console.log("Canvas Model Design server listening on port " + app.get('port'));
});

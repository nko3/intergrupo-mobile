var Canvas = mongoose.model('Canvas')
  , utils = require('../utils/utils');

exports.index = function(req, res) {
  res.redirect('/');
}

exports.create = function(req, res) {
  var title = req.param('title') || 'untitled'
    , type = req.param('type') || 'BMC'
    , canvas = new Canvas({ title: title, type: type, postits: {}});

  // Generate unique ID
  canvas.public_id = utils.generateId(24);

  // Save Canvas
  canvas.save(function(err, c) {
    if(err) {
      throw new Error(err);
    } else {
      res.redirect('/canvas/' + c.public_id);
    }
  });
};

exports.fork = function(req, res) {
  var publicId = req.param('public_id');

  Canvas.findOne({ public_id: publicId }, function(err, canvas) {
    if(err || !canvas) {
      res.render('canvas/notfound', {
        title: 'Canvas not found :('
      });
    } else {
      var newId = utils.generateId(24);

      var forked = new Canvas({
        public_id: newId,
        title: canvas.title,
        type: canvas.type,
        postits: canvas.postits
      });

      forked.save(function(err, f) {
        if(err) {
          throw new Error(err);
        } else {
          res.redirect('/canvas/' + f.public_id);
        }
      });
    }
  });
};

exports.show = function(req, res) {
  var publicId = req.param('public_id');

  Canvas.findOne({ public_id: publicId }, function(err, canvas) {

    if(err || !canvas) {
      res.render('canvas/notfound', {
        title: 'Canvas not found :('
      });
    } else {
      res.render('canvas/canvas', {
        title: canvas.title,
        type: canvas.type,
        canvas: canvas
      });
    }
  });
};
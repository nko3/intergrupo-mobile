var Canvas = mongoose.model('Canvas')
  , utils = require('../utils/utils');

exports.index = function(req, res) {
  res.redirect('/');
}

exports.create = function(req, res) {
  var title = req.param('title') || 'untitled'
    , canvas = new Canvas({ title: title });

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

exports.show = function(req, res) {
  var publicId = req.param('public_id');

  Canvas.findOne({ public_id: publicId }, function(err, canvas) {
    res.render('canvas/canvas', {
      title: canvas.title,
      canvas: canvas
    });
  });
};
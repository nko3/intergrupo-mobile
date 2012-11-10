var Canvas = mongoose.model('Canvas')
  , utils = require('../utils/utils');

exports.index = function(req, res) {
  res.redirect('/');
}

exports.create = function(req, res) {
  var title = req.param('title') || 'untitled'
    , canvas = new Canvas({ title: title });

  canvas.save(function(err, canvas) {
    if(err) throw err;

    res.redirect('/canvas/' + canvas.public_id);
  });
};

exports.show = function(req, res) {
  var publicId = req.param('public_id')
  , userId = req.session.userId = req.session.userId ? req.session.userId : publicId + "_ " + utils.generateId(32);

  Canvas.findOne({ public_id: publicId }, function(err, canvas) {
    res.render('canvas/canvas', {
      title: canvas.title,
      canvas: canvas,
      userId: userId
    });
  });
};
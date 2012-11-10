var Canvas = mongoose.model('Canvas');

exports.index = function(req, res) {
  res.redirect('/');
}

exports.create = function(req, res) {
  var canvas = new Canvas({ title: 'test' });
  canvas.save(function(err, canvas) {
    if(err) throw err;

    res.redirect('/canvas/' + canvas.public_id);
  });
};

exports.show = function(req, res) {
  var public_id = req.param('public_id');

  Canvas.findOne({ public_id: public_id }, function(err, canvas) {
    res.render('canvas/canvas', { title: canvas.title, canvas: canvas });
  });
};
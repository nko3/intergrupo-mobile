

exports.index = function(req, res) {
  res.render('index', { title: "Welcome" });
}

exports.about = function(req, res) {
  res.render('about', { title: "About"});
}
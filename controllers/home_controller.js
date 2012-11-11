var utils = require('../utils/utils');

exports.index = function(req, res) {
  res.render('index', { title: "Welcome" });
}

exports.about = function(req, res) {
  res.render('about', { title: "About"});
}

exports.avatar = function(req, res) {
  var email = req.param('email')
    , url = 'http://gravatar.com/avatar/' + utils.md5(email) + '?s=52';

  res.send(url);
}
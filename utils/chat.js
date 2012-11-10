
var canvas = {};

var User = function(options) {
    this.username = options.username;
};

var Chat = (function() {

  var chat = function() {
    this.users = [];

  };

  chat.prototype = {
    join: function(username) {
      var user = new User({ username: username });

      this.users.push(user);

      console.log(this.users);

    }
  };

  return chat;
})();

exports.join = function(canvasId, username) {
  chat = getChat(canvasId);
  chat.join(username);
}

function getChat(canvasId) {
  if(!canvas.hasOwnProperty(canvasId)) {
    canvas[canvasId] = new Chat();
  }
  return canvas[canvasId];
}
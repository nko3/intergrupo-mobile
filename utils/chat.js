
var canvas = {};

var User = function(options) {
    this.username = options.username;
    this.avatar = options.avatar || '/images/avatar.png';
};

var Chat = (function() {

  var chat = function() {
    this.users = {};

  };

  chat.prototype = {
    join: function(options) {
      var user = new User(options);

      this.users[options.userId] = user;

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
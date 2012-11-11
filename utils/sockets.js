var utils = require('../utils/utils');

module.exports = function(io) {

  // Chat Sockets
  var users = {};

  var chat = io.of('/chat').on('connection', function(socket) {


    socket.on('join', function(canvasId, user, cb) {
      socket.join(canvasId);

      nickname = user.nickname = utils.stripHtml(user.nickname);

      if(users[nickname]) {
        cb(true);
      } else {
        cb(false);
        socket.canvasId = canvasId;

        users[nickname] = socket.user = user;

        chat.in(socket.canvasId).emit('announcement', nickname + ' joined us!');
        chat.in(socket.canvasId).emit('users', users);
      }
    });

    socket.on('message', function(message) {
      message = utils.stripHtml(message);
      socket.broadcast.to(socket.canvasId).emit('message', socket.user, message);
    });

    socket.on('disconnect', function() {
      if(!socket.user) return;

      socket.leave(socket.canvasId);
      delete users[socket.user.nickname];
      socket.broadcast.to(socket.canvasId).emit('announcement', socket.user.nickname + ' has left the building...');
      socket.broadcast.to(socket.canvasId).emit('users', users);
    });

  });

  // Canvas Sockets
  var canvas = io.of('/canvas').on('connection', function(socket) {

    socket.on('add element', function(canvasId, element) {
      socket.join(canvasId);

      socket.broadcast.to(canvasId).emit('element added', element);
    });
  });
}
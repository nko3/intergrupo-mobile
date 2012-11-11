var chat = require('./chat');

module.exports = function(io) {

  io.sockets.on('connection', function(socket) {

    socket.on('join', function(canvasId, user) {
      chat.join(canvasId, user);
      socket.broadcast.emit('join', canvasId, user);
    });

  });
}
var chat = require('./chat');

module.exports = function(io) {

  io.sockets.on('connection', function(socket) {

    socket.on('join', function(canvasId, username) {
      chat.join(canvasId, username);
    });

  });

}
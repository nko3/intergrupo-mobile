var chat = require('./chat');

module.exports = function(io) {

  io.sockets.on('connection', function(socket) {

    socket.on('join', function(canvas, username) {
      console.log(canvas);
      console.log(username);
    });

  });

}
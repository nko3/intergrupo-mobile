module.exports = function(io) {

  var chat = io.of('/chat').on('connection', function(socket) {

    socket.on('join', function(canvasId, user) {
      socket.join(canvasId);
      socket.broadcast.to(canvasId).emit('join', canvasId, user);
    });

  });
}
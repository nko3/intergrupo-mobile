module.exports = function(io) {

  io.sockets.on('connection', function(sockets) {
    sockets.emit('hello', { msg: 'Hello Node' });

    sockets.on('bye', function(data) {
      console.log(data);
    });
  });

}
(function() {

  var socket = io.connect('http://localhost:3000');

  socket.on('hello', function(data) {
    console.log(data);
    socket.emit('bye', { msg: 'Bye bye' });
  });


})();
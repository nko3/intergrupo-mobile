
$(document).ready(function() {

  var chat = $("#chat");
  var canvasId = $('#canvas').data('canvasId');

  var username = 'Anonymous_' + Math.floor(Math.random()*100);

  if(chat.length !=0 ) {
    var socket = io.connect('http://localhost:3000');

    socket.on('connect', function() {

      // do the join
      socket.emit('join', canvasId, username);

    });

  }

});
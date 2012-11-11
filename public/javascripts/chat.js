
$(document).ready(function() {

  var chat = $("#chat")
    , canvasId = $('#canvas').data('canvasId')
    , userId = $('#canvas').data('userId');

  var username = 'Anonymous_' + Math.floor(Math.random()*1000);

  if(chat.length !=0 ) {
    var socket = io.connect('http://localhost:3000');

    socket.on('connect', function() {
      var user = {
        userId: userId,
        username: username
      }
      // do the join
      socket.emit('join', canvasId, user);
    });


    socket.on('join', function(cId, user) {
      if(canvasId == cId) {
        console.log(user);
      }
    });
  }

});
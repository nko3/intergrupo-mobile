
$(document).ready(function() {

  var chat = $("#chat")
    , canvasId = $('#canvas').data('canvasId');

  // Check if chat exists!
  if(chat.length !=0 ) {

    var socket = io.connect('http://localhost:3000/chat');

    socket.on('connect', function() {
        // do something
    });

    socket.on('users', users);
    socket.on('message', message);
    socket.on('announcement', announce);


    // Error announces
    socket.on('reconnect', function () {
      $('#chat-messages').empty();
      message('System', 'Reconnected to the server');
    });

    socket.on('reconnecting', function () {
      message('System', 'Attempting to re-connect to the server');
    });

    socket.on('error', function (e) {
      message('System', e ? e : 'A unknown error occurred');
    });

    $('#chat-user-modal').modal('show');

    $('#chat-join').click(function(e) {
      e.preventDefault();

      var nickname = $('#nickname').val()
        , email = $('#email').val();

      socket.emit('join', canvasId, { nickname: nickname, email: email }, function(exists) {
        console.log(canvasId);

        if(!exists) {
          return $('#chat-user-modal').modal('hide');
        }

        $('#chat-nickname-err').show();

      });


    });
  }

  function announce(message) {
    console.log(message);
    var source = $('#chat-announce-template').html()
      , template = Handlebars.compile(source)
      , content = template({ announce: message });

      $('#chat-messages').append(content);
  }

  function message(user, message) {
    console.log(user);
    console.log(message);
    var source = $('#chat-message-template').html()
      , template = Handlebars.compile(source)
      , content = template({ user: user, message: message });

      $('#chat-messages').append(content);
  }

  function users(users) {
    console.log(users);
  }

});
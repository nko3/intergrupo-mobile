
$(document).ready(function() {

  var chat = $("#chat")
    , canvasId = $('#canvas').data('canvasId');

  // Check if chat exists!
  if(chat.length != 0) {

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
      announce('Reconnected to the server');
    });

    socket.on('reconnecting', function () {
      announce('Attempting to re-connect to the server');
    });

    socket.on('error', function (e) {
      announce(e ? e : 'A unknown error occurred');
    });

    $('#chat-user-modal').modal('show');

    $('#chat-join').click(function(e) {
      e.preventDefault();

      var nickname = $('#nickname').val()
        , email = $('#email').val();

      socket.emit('join', canvasId, { nickname: nickname, email: email } , function(exists) {

        if(!exists) {
          clear();
          return $('#chat-user-modal').modal('hide');
        }

        $('#chat-nickname-err').show();
      });

    });

    $('#message-send').click(function(e) {
      e.preventDefault();

      var msg = $('#message').val();

      if(message) {
        socket.emit('message', msg);
        clear();

        $('#chat-messages').get(0).scrollTop = 1000000000;
      }
    });

  }

  function clear() {
    $('#message').val('').focus();
  }

  function announce(message) {
    var source = $('#chat-announce-template').html()
      , template = Handlebars.compile(source)
      , content = template({ announce: message });

      $('#chat-messages').append(content);
  }

  function message(user, msg) {
    var source = $('#chat-message-template').html()
      , template = Handlebars.compile(source)
      , content = template({ user: user, message: msg });

      $('#chat-messages').append(content);
  }

  function users(users) {
    console.log(users);
  }

});
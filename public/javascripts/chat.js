
$(document).ready(function() {

  var chat = $("#chat")
    , canvasId = $('#canvas').data('canvasId');

  // Check if chat exists!
  if(chat.length != 0) {

    // var socket = io.connect('http://intergrupo-mobile.nko3.jit.su/chat');
    var socket = io.connect('http://localhost:3000/chat');

    socket.on('connect', function() {
      waiting();
    });

    socket.on('users', users);
    socket.on('message', message);
    socket.on('announcement', announce);

    // Error announces
    socket.on('reconnect', function () {
      $('#chat-messages').empty();
      announce('Reconnected to the server');
      ok();
    });

    socket.on('reconnecting', function () {
      announce('Attempting to re-connect to the server');
      waiting();
    });

    socket.on('error', function (e) {
      announce(e ? e : 'A unknown error occurred');
      off();
    });

    $('#chat-user-modal').modal('show');

    $('#chat-join').click(function(e) {
      e.preventDefault();

      var nickname = $('#nickname').val()
        , email = $('#email').val();

      socket.emit('join', canvasId, { nickname: nickname, email: email } , function(exists) {

        if(!exists) {
          clear();
          ok();
          return $('#chat-user-modal').modal('hide');
        }

        $('#chat-nickname-err').show();
      });

    });

    $('#message-send').click(function(e) {
      e.preventDefault();
      sendMessage(socket);
    });

    $('#message').keydown(function(e) {
      var code = (e.keyCode ? e.keyCode : e.which);
      if(code == 13) {
        sendMessage(socket);
      }
    });
  }

  function ok() {
    $("#status-ok").removeClass('hide');
    $("#status-off").addClass('hide');
    $("#status-waiting").addClass('hide');
  }

  function off() {
    $("#status-ok").addClass('hide');
    $("#status-off").removeClass('hide');
    $("#status-waiting").addClass('hide');
  }

  function waiting() {
    $("#status-ok").addClass('hide');
    $("#status-off").addClass('hide');
    $("#status-waiting").removeClass('hide');
  }

  function sendMessage(socket) {
    var msg = $('#message').val();

    if(msg) {
      socket.emit('message', msg);
      clear();
    }
  }

  function clear() {
    $('#message').val('').focus();
  }

  function announce(message) {
    var source = $('#chat-announce-template').html()
      , template = Handlebars.compile(source)
      , content = template({ announce: message });

    $('#chat-messages').append(content);
    $('#chat-messages').animate({ scrollTop: $('#chat-messages').height() }, 'slow');
  }

  function message(user, msg) {
    var source = $('#chat-message-template').html()
      , template = Handlebars.compile(source)
      , content = template({ user: user, message: msg });

    $('#chat-messages').append(content);
    $('#chat-messages').animate({ scrollTop: $('#chat-messages').height() }, 'slow');
  }

  function users(users) {
    $('#user-count').html(users.count);
  }

});
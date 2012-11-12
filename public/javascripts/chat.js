
$(document).ready(function() {

  var chat = $("#chat")
    , canvasId = $('#canvas').data('canvasId');

  // Check if chat exists!
  if(chat.length != 0) {

    var socket = io.connect('http://intergrupo-mobile.nko3.jit.su/chat');
    //var socket = io.connect('http://localhost:3000/chat');

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

      if(nickname === '' || email === '') {
        $('#chat-validation-err').show();
      } else {
       join({ nickname: nickname, email: email });
      }
    });

    $('#chat-anonymous').click(function(e) {
      e.preventDefault();

      join({ nickname: '', email: '' });
    });

    $('#message-send').click(function(e) {
      e.preventDefault();
      sendMessage();
    });

    $('#message').keydown(function(e) {
      var code = (e.keyCode ? e.keyCode : e.which);
      if(code == 13) {
        sendMessage();
      }
    });

    $('#email').keyup(function(e) {
      var email = $('#email').val()
        , regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if(regex.test(email)) {
        $.get('/avatar', { email: email }, function(url) {
          $('#avatar').attr('src', url);
        });
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

  function sendMessage() {
    var msg = $('#message').val();

    if(msg) {
      socket.emit('message', msg);
      clear();
    }
  }

  function clear() {
    $('#message').val('').focus();
  }

  function join(user) {
    socket.emit('join', canvasId, user, function(exists) {

      if(!exists) {
        clear();
        ok();
        return $('#chat-user-modal').modal('hide');
      }

      $('#chat-nickname-err').show();
    });
  }

  function announce(message) {
    var source = $('#chat-announce-template').html()
      , template = Handlebars.compile(source)
      , content = template({ announce: message });

    $('#chat-messages').append(content);
    $("#chat-messages").get(0).scrollTop = 10000000;
  }

  function message(user, msg) {
    var source = $('#chat-message-template').html()
      , template = Handlebars.compile(source)
      , content = template({ user: user, message: msg });

    // Add avatar :)
    content = content.replace('src=""',"src='" + user.avatar + "'");

    $('#chat-messages').append(content);
    $("#chat-messages").get(0).scrollTop = 10000000;
  }

  function users(users) {
    $('#user-count').html(users.count);
  }

});
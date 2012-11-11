var utils = require('../utils/utils');

module.exports = function(io) {

  // Chat Sockets

  var users = {};
  var userCount = {};

  var chat = io.of('/chat').on('connection', function(socket) {

    socket.on('join', function(canvasId, user, cb) {
      socket.join(canvasId);

      nickname = utils.stripHtml(user.nickname);

      if(nickname === "") {
        nickname = 'anonymous_' + utils.generateId(2);
      }

      user.nickname = nickname;
      userId = socket.userId = canvasId + '_' + nickname;

      if(users[userId]) {
        cb(true);
      } else {
        cb(false);

        user.avatar = user.email ? 'http://gravatar.com/avatar/' + utils.md5(user.email) + '?s=32' : '/images/avatar.png';

        socket.canvasId = canvasId;
        canvas[userId] = socket.user = user;

        if(!userCount[canvasId]) {
          userCount[canvasId] = { count: 0 };
        }
        userCount[canvasId].count = userCount[canvasId].count + 1;

        chat.in(socket.canvasId).emit('announcement', nickname + ' joined us!');
        chat.in(socket.canvasId).emit('users', userCount[canvasId]);
      }
    });

    socket.on('message', function(message) {
      message = utils.stripHtml(message);
      chat.in(socket.canvasId).emit('message', socket.user, message);
    });

    socket.on('disconnect', function() {
      if(!socket.user) return;

      if(!userCount[socket.canvasId]) return;

      userCount[socket.canvasId].count = userCount[socket.canvasId].count - 1;

      socket.leave(socket.canvasId);
      delete users[socket.userId];

      socket.broadcast.to(socket.canvasId).emit('announcement', socket.user.nickname + ' has left the building...');
      socket.broadcast.to(socket.canvasId).emit('users', userCount[socket.canvasId]);
    });

  });

  // Canvas Sockets

  var postits = {};
  var canvas = io.of('/canvas').on('connection', function(socket) {

    socket.on('join', function(canvasId) {
      socket.join(canvasId);
      console.log("joined to: " + canvasId);
      socket.canvasId = canvasId;
    });

    socket.on('add_element', function(element) {
      postits[element.name] = element;
      console.log("postits: ");
      console.log(postits);

      socket.broadcast.to(socket.canvasId).emit('element_added', element);
    });

    socket.on('remove_element', function(element) {
      delete postits[element.name];

      socket.broadcast.to(socket.canvasId).emit('element_removed', element);
    });

    socket.on('lock', function(element) {
      socket.broadcast.to(socket.canvasId).emit('lock_element', element);
    });

    socket.on('release', function(element) {
      socket.broadcast.to(socket.canvasId).emit('release_element', element);
    });

    socket.on('change_text', function(element) {
      socket.broadcast.to(socket.canvasId).emit('text_changed', element);
    });

  });
}
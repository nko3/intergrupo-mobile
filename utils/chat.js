
var canvas = {};


exports.createChat = function(canvasId) {
  console.log(canvasId);

  if(!canvas.hasOwnProperty(canvasId)) {
    canvas[canvasId] = {
      name: 'Hola'
    }
  }
}
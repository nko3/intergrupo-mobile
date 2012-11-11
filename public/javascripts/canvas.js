
$(document).ready(function() {

  var c = $('canvas')
    , canvasId = c.data('canvasId');

  //Socket conf
  var socket = io.connect('http://localhost:3000/canvas');

  socket.on('connect', function() {
    console.log("connected");

    socket.emit('join', canvasId);
  });

  socket.on('element_added', function(element) {
    console.log("on element added element: ");
    console.log(element);
    drawPostit(c, { fillStyle: "#909", strokeStyle: "#F99", size: 100, 
      name: element.name, text: element.text, close: element.close, group: element.group });
    // c.drawRect(element);
  });

  socket.on('element_removed', function(layer) {
    console.log("on element added element: ");
    console.log(layer);
    c.removeLayerGroup(layer.group);
    c.removeLayer(layer.text);
    c.drawLayers();
  });

  socket.on('lock_element', function(layer) {
    console.log("on lock: ");
    console.log(layer);

    // c.getLayer(layer.name).draggable = false;
    console.log("remote locking for " + layer.name);
    console.log(c.getLayer(layer.name));
  });

  socket.on('release_element', function(layer) {
    console.log("on Release: " + layer);
    console.log(layer);

    moveGroup(layer);
    // dragStopped(postit);
  });

  $("#add_postit").click(function (e) {
    e.preventDefault();

    var element = drawPostit(c, {fillStyle: "#909", strokeStyle: "#F99", size: 100});
    socket.emit("add_element", element);
  });

  c.hover(function() {
    $(this).css('cursor','auto');
  });

  //Make canvas of variable width
  var ct = c.get(0).getContext('2d');
  var container = $(c).parent();
  //Run function when browser resizes
  $(window).resize( respondCanvas );
  function respondCanvas(){
    c.attr('width', $(container).width() );
    //max width
    c.attr('height', $(container).height() );
    //max height
    //Call a function to redraw other content (texts, images etc)
    c.drawLayers();
    RenderCanvas("", c);
  }
    //Initial call
  respondCanvas();

  var moveGroup = function(layer) {
    var postit = c.getLayer(layer.name);
    var text_layer = c.getLayer(layer.text);
    var close_layer = c.getLayer(layer.close);


    console.log("remote releasing for " + layer.name);
    console.log(postit);
    postit.draggable = true;
    postit.x = layer.x;
    postit.y = layer.y;

    text_layer.x = layer.x + 5;
    text_layer.y = layer.y + 10;
    text_layer.opacity = 1;
    // text_layer.rotate = layer.degrees;

    close_layer.x = layer.x - 35;
    close_layer.y = layer.y - 35;
    close_layer.opacity = 1;
    // close_layer.rotate = layer.degrees;
    c.drawLayers();

  };
  var drawTemplate = function (canvas, metadata){
    console.log(metadata);
  };

  var dragStarted = function(layer){
    var canvas = $('canvas');
    var text_layer = canvas.getLayer(layer.text);
    var close_layer = canvas.getLayer(layer.close);
    text_layer.opacity = 0;
    close_layer.opacity = 0;

    //Emit for lock
    console.log("locking " + layer.name);
    socket.emit('lock', layer);
  };

  var dragStopped = function(layer){
    //Emit for unlock and update
    // console.log(object.id);
    var canvas = $('canvas');
    var degrees = Math.floor(Math.random() * 12) - 6;
    var text_layer = canvas.getLayer(layer.text);
    var close_layer = canvas.getLayer(layer.close);

    text_layer.x = layer.x + 5;
    text_layer.y = layer.y + 10;
    text_layer.opacity = 1;
    text_layer.rotate = degrees;

    close_layer.x = layer.x - 35;
    close_layer.y = layer.y - 35;
    close_layer.opacity = 1;
    close_layer.rotate = degrees;

    layer.rotate = degrees;

    layer.degrees = degrees;

    console.log("releasing " + layer.name);
    socket.emit('release', layer);
  };

  var generateId = function (bits) {
    var chars, rand, i, ret;

    chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';
    ret = '';

    // in v8, Math.random() yields 32 pseudo-random bits (in spidermonkey it gives 53)
    while (bits > 0) {
      // 32-bit integer
      rand = Math.floor(Math.random() * 0x100000000);
      // base 64 means 6 bits per character, so we use the top 30 bits from rand to give 30/6=5 characters.
      for (i = 26; i > 0 && bits > 0; i -= 6, bits -= 6) {
        ret += chars[0x3F & rand >>> i];
      }
    }

    return ret;
  };

  var drawPostit = function(canvas, metadata){
    var post_name = metadata.name? metadata.name : generateId(32);
    var text_name = metadata.text? metadata.text : generateId(32);
    var close_name = metadata.close? metadata.close : generateId(32);
    var group_name = metadata.group? metadata.group : generateId(32);

    var postData = {
        layer: true,
        id: post_name,
        name: post_name,
        text: text_name,
        close: close_name,
        group: group_name,
        fillStyle: metadata.fillStyle,
        strokeStyle: metadata.strokeStyle,
        strokeWidth: 2,
        x: (parseInt(canvas.attr("width")) / 2), y: (parseInt(canvas.attr("height")) / 2),
        width: metadata.size, height: metadata.size,
        draggable: true,
        bringToFront: false,
        dragstop: dragStopped,
        dragstart: dragStarted,
        click: function (layer){
          //console.log(layer.group);
        },
        mouseover: function (layer){
          $(this).css('cursor','move');
        },
        mouseout: function (layer){
          $(this).css('cursor','auto');
        }
      };
    canvas.drawRect(postData).drawText({
      layer: true,
      name: text_name,
      id: text_name,
      group: group_name,
      fillStyle: "#000",
      strokeWidth: 2,
      draggable: false,
      bringToFront: true,
      x: postData.x + 5, y: postData.y + 10,
      height: postData.height,
      maxWidth: postData.width - 10,//Beta
      font: "bold 14pt Trebuchet MS",
      text: "Add text here bla bla bla",
      click: function(layer){
        var textPrompted = prompt("Edit the text", layer.text);
        if (textPrompted) {
          layer.text = textPrompted;
        }

      },
      mouseover: function (layer){
        $(this).css('cursor','text');
      },
      mouseout: function (layer){
        $(this).css('cursor','move');
      }
    }).drawText({
      layer: true,
      name: close_name,
      text_layer: text_name,
      post_name: post_name,
      group: group_name,
      fillStyle: "#000",
      strokeWidth: 2,
      draggable: false,
      bringToFront: true,
      x: postData.x - 35, y: postData.y - 35,
      height: 10,
      maxWidth: 10,//Beta
      font: "bold 14pt Trebuchet MS",
      text: "X",
      click: function(layer){
        socket.emit('remove_element', canvas.getLayer(layer.post_name));
        canvas.removeLayerGroup(layer.group);
        canvas.removeLayer(layer.text_layer);
        canvas.drawLayers();
      },
      mouseover: function (layer){
        $(this).css('cursor','pointer');
      },
      mouseout: function (layer){
        $(this).css('cursor','auto');
      }
    });


    return postData;
  };

});



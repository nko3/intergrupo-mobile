var drawTemplate = function (canvas, metadata){
  console.log(metadata);
};

var dragStopped = function(layer){
  //Emit for unlock and update
  // console.log(object.id);
  var canvas = $('canvas');
  var text_layer = canvas.getLayer(layer.text);
  text_layer.x = layer.x + 5;
  text_layer.y = layer.y + 20;
  text_layer.opacity = 1;
  var degrees = Math.floor(Math.random() * 7) - 6
  text_layer.rotate = degrees;
  layer.rotate = degrees;
};

var dragStarted = function(layer){
  var canvas = $('canvas');
  var text_layer = canvas.getLayer(layer.text);
  text_layer.opacity = 0;

  //Emit for lock
  // console.log(object.id);
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
  var post_name = generateId(32);
  var text_name = generateId(32);
  var group_name = generateId(32);

  var postData = {
      layer: true,
      id: post_name,
      name: post_name,
      text: text_name,
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
        console.log(layer.group);
      }
    };
  canvas.drawRect(postData);
  canvas.drawText({
    layer: true,
    name: text_name,
    id: text_name,
    group: group_name,
    fillStyle: "#000",
    strokeWidth: 2,
    draggable: true,
    bringToFront: true,
    x: postData.x + 5, y: postData.y + 20,
    height: postData.height,
    maxWidth: postData.width - 10,//Beta
    font: "bold 14pt Trebuchet MS",
    text: "Add text here bla bla bla",
    click: function(layer){
      var textPrompted = prompt("Edit the text", layer.text);
      layer.text = textPrompted;
    }
  });
};

(function() {

  var c = $('canvas'); 


  $("#add_postit").click(function (e) {
    e.preventDefault();

    drawPostit(c, {fillStyle: "#909", strokeStyle: "#F99", size: 100});

  });


  drawTemplate(c, {});


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
  } 
    //Initial call 
  respondCanvas();
  

})();



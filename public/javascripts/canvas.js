var drawTemplate = function (canvas, metadata){
  console.log(metadata);
};

var dragStopped = function(object){
  //Emit
  // console.log(object.id);
};

var dragStarted = function(object){
  //Emit
  // console.log(object.id);
};

(function() {

  var c = $('canvas'); 




  c.drawArc({
    layer: true,
    fillStyle: "#36b",
    strokeStyle: '#36b',
    strokeWidth: 2,
    x: 150, y: 150,
    radius: 50,
    ccw: true,
    draggable: true,
    bringToFront: true,
    id: "ootro",
    dragstop: dragStopped,
    dragstart: dragStarted
  })
  .drawRect({
    layer: true,
    fillStyle: "#6c1",
    strokeStyle: '#6c1',
    strokeWidth: 2,
    x: 100, y: 100,
    width: 100, height: 100,
    draggable: true,
    bringToFront: true,
    id: "algun_id",
    dragstop: dragStopped,
    dragstart: dragStarted
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



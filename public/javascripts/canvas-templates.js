

function RenderCanvas(type, canvas) {
  width = canvas.width();
  height = canvas.height();
  switch (type) {
    case 'BMY':
    case ' BMY':
      template = getPBMCTemplate;
      break;
    case 'LC':
    case ' LC':
      template = getLCTemplate;
      break;
    default:
      template = getBMCTemplate;
  }
  canvas.removeLayerGroup("canvas-template");
  renderPoints(canvas, template(width, height));
  //$('#canvas').css('background-image', 'url(' + canvas.getCanvasImage("png") + ')');
}

function getBMCTemplate(width, height) {

  return getBMTemplate(
        width,
        height,
        "Key Partners",
        "Key Activities",
        "Value Propositions",
        "Customer Relationships",
        "Customer Segments",
        "Key Resources",
        "Channels",
        "Cost Structure",
        "Revenue Streams"
    );
}
function getLCTemplate(width, height) {
  return getBMTemplate(
        width,
        height,
        "Problem",
        "Solution",
        "Unique Value Proposition",
        "Unfair Advantage",
        "Customer Segments",
        "Key Metrics",
        "Channels",
        "Cost Structure",
        "Revenue Streams"
    );
}
function getPBMCTemplate(width, height) {
  return getBMTemplate(
        width,
        height,
        "Who helps you",
        "What you do",
        "How you help",
        "How you interest",
        "Who you help",
        "Key Resources",
        "How they know you & how you deliver",
        "What you give",
        "What you get"
    );
}
function getBMTemplate(width, height, t1, t2, t3, t4, t5, t6, t7, t8, t9) {
  vX = width / 5;
  vY = height / 4;
  tP = 3;

  return [
      [t1, tP, tP],
      [t2, vX + tP, tP],
      [t3, vX * 2 + tP, tP],
      [t4, vX * 3 + tP, tP],
      [t5, vX * 4 + tP, tP],
      [t6, vX + tP, vY * 1.5 + tP],
      [t7, vX * 3 + tP, vY * 1.5 + tP],
      [t8, tP, vY * 3 + tP],
      [t9, vX * 2.5 + tP, vY * 3 + tP],
      [vX, 0, vX, vY * 3],
      [vX * 2, 0, vX * 2, vY * 3],
      [vX * 3, 0, vX * 3, vY * 3],
      [vX * 4, 0, vX * 4, vY * 3],
      [vX * 2.5, vY * 3, vX * 2.5, vY * 4],
      [vX, vY * 1.5, vX * 2, vY * 1.5],
      [vX * 3, vY * 1.5, vX * 4, vY * 1.5],
      [0, vY * 3, vX * 5, vY * 3]
    ];
}

function renderPoints(canvas, points) {
  // Add the points from the array to the object
  for (var p = 0; p < points.length; p += 1) {
    if (points[p].length == 3) {

      obj = {
        layer: true,
        index: 0,
        name:"canvas-template",
        group: "canvas-template",
        fillStyle: "#000",
        strokeWidth: 1,
        font: "bold 9pt Verdana, sans-serif",
        fromCenter: false
      };
      obj['text'] = points[p][0];
      obj['x'] = points[p][1];
      obj['y'] = points[p][2];
      canvas.drawText(obj);

    } else {
      obj = {
        layer: true,
        name: "canvas-template",
        index: 0,
        group: "canvas-template",
        strokeStyle: "#000",
        strokeWidth: 4
      };
      obj['x1'] = points[p][0];
      obj['y1'] = points[p][1];
      obj['x2'] = points[p][2];
      obj['y2'] = points[p][3];
      canvas.drawLine(obj);
    }
  }
}
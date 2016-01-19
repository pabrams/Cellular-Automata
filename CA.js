
// page-level variables
var cellSizeX = 10;
var cellSizeY = 10;
var mouseIsDown = false;



function loadPage(){
    
  drawGrid();
  
  // add click event listener to canvas element
  document.getElementById("myCanvas").addEventListener('click', canvasClick, false);
  
  
  // add mouseDown event listener to canvas element
  document.getElementById("myCanvas").addEventListener('mousedown', canvasDown, false);
  
  // add mouseup event listener
  document.addEventListener('mouseup', mouseUp, false);
  
  // add mouseMove event listener to canvas element
  document.getElementById("myCanvas").addEventListener('mousemove', canvasMove, false);
  
};

function getCtx(){
  return document.getElementById("myCanvas").getContext("2d");
};

function drawGrid(){
  var ctx = getCtx();

  // draw vertical lines
  for (i=0; i<ctx.canvas.width / cellSizeX; i++){
    ctx.beginPath();
    ctx.moveTo(i*cellSizeX - 0.5,0);
    ctx.lineTo(i*cellSizeX -0.5, ctx.canvas.height);
    ctx.stroke();
  }

  // draw horizontal lines
  for (j=0; j<ctx.canvas.height / cellSizeY; j++){
    ctx.beginPath();
    ctx.moveTo(0,j*cellSizeY - 0.5);
    ctx.lineTo(ctx.canvas.width, j*cellSizeY - 0.5);
    ctx.stroke();
  }
};

// fill the cell located at the coordinates x, y
function fillCell(x, y, color){
  var ctx = getCtx();
     
  // set color to black if null
  if ((color === null) || (color === 'undefined')){
    color = "#000000";
  }
  
  ctx.fillStyle = color;
  
  var xstart = Math.floor(x / cellSizeX) * cellSizeX;
  var ystart = Math.floor(y / cellSizeY) * cellSizeY;
  ctx.fillRect(xstart, ystart, cellSizeX, cellSizeY);
  
};

// this is needed for when user clicks without moving mouse
function canvasClick(event){
  var ctx=getCtx();
  var x = event.offsetX;
  var y = event.offsetY;
  
  
  fillCell(x,y);
};

function canvasMove(event){
  var ctx=getCtx();
  
  var x = event.offsetX;
  var y = event.offsetY;
  
  document.getElementById("mouseCoords").innerHTML = x + ',' + y;
  
  // if mouse is down, fill cells
  if (mouseIsDown){
    fillCell(x, y);
  }
  
};


function canvasDown(event){
  mouseIsDown = true;
};


function mouseUp(event){
  mouseIsDown = false;
};


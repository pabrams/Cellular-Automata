"use strict";

// TODO:  the stuff before the declaration of CA should probably be cleaned up or reorganized.
var num_Cells_X = 100;
var num_Cells_Y = 80;
var cell_Size = 10;


var CA = CA || {};
// returns width in pixels based on cell size and number of cells
CA.getWidth = function(){
  return CA.numCellsX * CA.cellSize;
};

// returns width in pixels based on cell size and number of cells
CA.getHeight = function(){
  return CA.numCellsY * CA.cellSize;
};

CA.canvas = document.querySelector('canvas');
CA.context = CA.canvas.getContext('2d');

CA.canvas.style.background = 'Black';
CA.context.fillStyle = '#f00'; 

CA.numCellsX = num_Cells_X;
CA.numCellsY = num_Cells_Y;

CA.cellSize = cell_Size;

// set width/height of canvas
CA.canvas.width = CA.getWidth();
CA.canvas.height = CA.getHeight();

CA.clearGrid = function(){
  CA.context.clearRect(0,0, CA.canvas.width, CA.canvas.height);
  CA.drawGrid();
};

CA.drawGrid = function(){
  var w = CA.getWidth();
  var h = CA.getHeight();
  for(var i = .5; i < w || i < h; i += CA.cellSize) {
    // draw horizontal lines
    CA.context.moveTo( i, 0 );
    CA.context.lineTo( i, h);
    // draw vertical lines
    CA.context.moveTo( 0, i );
    CA.context.lineTo( w, i);
  }
  CA.context.strokeStyle = 'hsla(0, 0%, 40%, .5)';
  CA.context.stroke();
};

CA.canvasClick = function(evt){
  var eventX = evt.offsetX;
  var eventY = evt.offsetY;
  
  // set fill style based on colour of clicked pixel
  var imgData = CA.context.getImageData(eventX, eventY, 1, 1).data;
  
  if (imgData[0] == 0 && imgData[1] == 0 && imgData[2] == 0){
    CA.context.fillStyle = "White";
  }else{
    CA.context.fillStyle = "Black";
  }
  
  var x = Math.floor(eventX / CA.cellSize) * CA.cellSize + 1;
  var y = Math.floor(eventY / CA.cellSize) * CA.cellSize + 1;
  var w = CA.cellSize - 2;
  var h = CA.cellSize - 2;   
  CA.context.fillRect(x, y, w, h);
};

CA.runButtonClick = function(){
  alert('Not yet implemented');
};
CA.stepButtonClick = function(){
  alert('Not yet implemented');
};
CA.clearButtonClick = function(){
  CA.clearGrid();
};

function loadPage(){
  // add event listeners
  CA.canvas.addEventListener('click', CA.canvasClick, false);
  document.getElementById("RunButton").addEventListener('click', CA.runButtonClick);
  document.getElementById("StepButton").addEventListener('click', CA.stepButtonClick);
  document.getElementById("ClearButton").addEventListener('click', CA.clearButtonClick);
  
  //create then draw grid
  CA.drawGrid();
};


"use strict";

var num_Cells_X = 100;
var num_Cells_Y = 60;
var cell_Size = 10;

var CA = CA || {};
// returns width in pixels based on cell size and number of cells
CA.getWidth = function(){
  return CA.numCellsX * CA.cellSize;
};

// returns height in pixels based on cell size and number of cells
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
  CA.context.clearRect(0, 0, CA.canvas.width, CA.canvas.height);
  CA.drawGrid();
};

CA.drawGrid = function(){
  var w = CA.getWidth();
  var h = CA.getHeight();
  
  for ( var i = 0.5; i < w || i < h; i += CA.cellSize) {
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
  var cell = CA.pointToCell(eventX, eventY);
  
  var color = null;
  // set fill style based on colour of clicked pixel
  var full = CA.cellIsFull(cell.cellX, cell.cellY);
  if (full){
    color = "Black";
  }else{
    color = "White";
  }
  
  console.log("clicked: " + eventX + "," + eventY + "; corresponding cell: " + cell.cellX + "," + cell.cellY + "; status of that cell: " + full);

  CA.paintCell(cell.cellX, cell.cellY, color);
};

CA.paintCell = function(cellX, cellY, color){  
  var point = CA.cellToPoint(cellX, cellY);
  
  var x = Math.floor(point.x / CA.cellSize) * CA.cellSize + 1;
  var y = Math.floor(point.y / CA.cellSize) * CA.cellSize + 1;
  var w = CA.cellSize-2;
  var h = CA.cellSize-2;
  
  CA.context.fillStyle = color;
  CA.context.fillRect(x, y, w, h);
};

// returns 0 if cell is empty, 1 if cell is full.
CA.cellIsFull = function(cellX, cellY){
  var point = CA.cellToPoint(cellX, cellY);
    // set fill style based on colour of clicked pixel
  var imgData = CA.context.getImageData(point.x, point.y, 1, 1).data;
  if (imgData[0] == 0 && imgData[1] == 0 && imgData[2] == 0){
    return 0;
  }else{
    return 1;
  }
};

CA.runButtonClick = function(){
  alert('Not yet implemented');
};
CA.stepButtonClick = function(){
  CA.step_GameOfLife();
};
CA.clearButtonClick = function(){
  CA.clearGrid();
};

CA.step_GameOfLife =  function(){
  // declare and initialize 2d array
  var colorToPaint = [];
  for(var x = 0; x < CA.numCellsX; x++){
    colorToPaint[x] = [];    
    for(var y = 0; y < CA.numCellsY; y++){ 
        colorToPaint[x][y] = null;    
    }    
  }
  
  // determine what color to paint each cell
  for(var i = 0; i < CA.numCellsX; i++) {
    for (var j=0; j < CA.numCellsY; j++){
      // colorToPaint[i][j] = null;
      
      var numNeighbors = CA.getNumberOfNeighbors(i, j);
      var cellIsFull = CA.cellIsFull(i, j);
      if (cellIsFull){
        // For a space that is 'populated':
          // Each cell with one or no neighbors dies, as if by solitude.
          // Each cell with four or more neighbors dies, as if by overpopulation.
          // Each cell with two or three neighbors survives.
        if (numNeighbors <= 0 || numNeighbors == 1 || numNeighbors >= 4){
          colorToPaint[i][j] = "Black";
        }
      }else{
        // For a space that is 'empty' or 'unpopulated'
          // Each cell with three neighbors becomes populated.
        if (numNeighbors == 3){
          colorToPaint[i][j] = "White";
        }
      }
    }
  }
  
  // paint each cell
  for(var i = 0; i < CA.numCellsX; i++) {
    for (var j=0; j < CA.numCellsY; j++){
      
      if (colorToPaint[i][j]){
        CA.paintCell(i, j, colorToPaint[i][j]);
      }
    }
  }
  

};

CA.getNumberOfNeighbors = function(cellX, cellY){
  var numNeighbors = 0;
  for (var i=cellX-1; i<=cellX+1; i++){
    for (var j=cellY-1; j<=cellY+1; j++){
      if (i==cellX && j==cellY){
        // don't count self as neighbour
        continue;
      }
      if (CA.cellIsFull(i, j)){
        numNeighbors += 1;
      }
    }
  }
  return numNeighbors;
};

CA.cellToPoint = function(cellX, cellY){
  var x = cellX*CA.cellSize + (CA.cellSize /2);
  var y = cellY*CA.cellSize + (CA.cellSize /2);
  return {'x': x , 'y': y};
};

CA.pointToCell = function(x, y){
  var cellX = Math.floor (x / CA.cellSize);
  var cellY = Math.floor (y / CA.cellSize);
  return {'cellX': cellX, 'cellY': cellY };
};

var loadPage = function(){
  // add event listeners
  CA.canvas.addEventListener('click', CA.canvasClick, false);
  document.getElementById("RunButton").addEventListener('click', CA.runButtonClick);
  document.getElementById("StepButton").addEventListener('click', CA.stepButtonClick);
  document.getElementById("ClearButton").addEventListener('click', CA.clearButtonClick);
  //create then draw grid
  CA.drawGrid();
};

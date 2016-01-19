"use strict";

// Create global namespace object
var CA = CA || {};

// Function to help with Adding event listener to appropriate object
// Got this idea from http://stackoverflow.com/questions/15356936/object-oriented-javascript-event-handling
CA.bind = function(scope, fn){
  return function() {
    return fn.apply(scope, arguments);
  }
}

// Create variable under CA scope to indicate whether mouse is down.
CA.mouseIsDown = false;

// mouseUp function
CA.mouseUp = function(event){
  CA.mouseIsDown = false;
};

  
// todo: add grid cells
// // GridCell constructor
// var GridCell = function(){
  // this.status = 0; // by default, a cell is empty.
// };

// Grid constructor
var Grid = function(canvasId, width, height, cellSizeX, cellSizeY){

  this.cellSizeX = cellSizeX;
  this.cellSizeY = cellSizeY;
  
  this.canvas = document.getElementById(canvasId);
  this.canvas.width = width;
  this.canvas.height = height;
  
  this.context = this.canvas.getContext("2d");
  
  this.drawGrid = function(){
    // draw vertical lines
    for (var i=0; i<this.canvas.width / this.cellSizeX; i++){
      this.context.beginPath();
      this.context.moveTo(i*this.cellSizeX - 0.5,0);
      this.context.lineTo(i*this.cellSizeX -0.5, this.canvas.height);
      this.context.stroke();
    }

    // draw horizontal lines
    for (var j=0; j<this.canvas.height / this.cellSizeY; j++){
      this.context.beginPath();
      this.context.moveTo(0,j*this.cellSizeY - 0.5);
      this.context.lineTo(this.canvas.width, j*this.cellSizeY - 0.5);
      this.context.stroke();
    }
  };
  
  this.fillCell = function(x, y, color){  
    // set color to black if null
    if ((color === null) || (color === 'undefined')){
      color = "#000000";
    }
    
    this.context.fillStyle = color;

    var xstart = Math.floor(x / this.cellSizeX) * this.cellSizeX;
    var ystart = Math.floor(y / this.cellSizeY) * this.cellSizeY;
    this.context.fillRect(xstart, ystart, this.cellSizeX, this.cellSizeY);
  };
  
  
  // needed for when user clicks without moving mouse
  this.click = function(event){
    var x = event.offsetX;
    var y = event.offsetY;
    this.fillCell(x,y);
  };

  this.mouseMove = function(event){
    var x = event.offsetX;
    var y = event.offsetY;
    
    // document.getElementById("mouseCoords").innerHTML = x + ',' + y;
    
    // if mouse is down, fill cells
    if (CA.mouseIsDown){
      this.fillCell(x, y);
    }
  };
  
  this.mouseDown = function(event){
    CA.mouseIsDown = true;
  };
  
  // add click event listener to canvas element
  this.canvas.addEventListener('click', CA.bind(this, this.click), false);
  
  // add mouseDown event listener to canvas element
  this.canvas.addEventListener('mousedown', CA.bind(this, this.mouseDown), false);
  
  // add mouseMove event listener to canvas element
  this.canvas.addEventListener('mousemove', CA.bind(this, this.mouseMove), false);
  
};


function loadPage(){
  // add mouseup event listener to document
  document.addEventListener('mouseup', CA.mouseUp, false);
  
  CA.grid = new Grid("myCanvas", 800, 800, 10, 10);
  CA.grid.drawGrid();
};


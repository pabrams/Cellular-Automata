"use strict";

var CA = CA || {};

CA.cellSizeX = 10;
CA.cellSizeY = 10;

CA.gridOutline = document.getElementById("gridOutline");
CA.gridOutline.setAttribute("style", "border:1px solid Blue;");
CA.gridOutline.style.width = '80px';
CA.gridOutline.style.height = '80px';

CA.widthInCells = function(){ return CA.gridOutline.offsetWidth / CA.cellSizeX; };
CA.heightInCells = function(){ return CA.gridOutline.offsetHeight / CA.cellSizeY; };

// Function to help with Adding event listener to appropriate object
// Got this idea from http://stackoverflow.com/questions/15356936/object-oriented-javascript-event-handling
CA.bind = function(scope, fn){
  return function() {
    return fn.apply(scope, arguments);
  }
};

// TODO: Create variable under CA scope to indicate whether mouse is down, and create functions toggle it.
// CA.mouseIsDown = false;
// CA.mouseUp = function(event){CA.mouseIsDown = false;};
// CA.mouseDown = function(event){CA.mouseIsDown = true;};
    
// GridCell constructor
var GridCell = function(x, y){
  this.fill = "#ffffff";
  this.div = document.createElement('div');
  var divStyle = "left: " + (CA.gridOutline.offsetLeft + x*CA.cellSizeX) + "px; top: " + (CA.gridOutline.offsetTop + y*CA.cellSizeY) + "px; width:" + CA.cellSizeX + "px; " + " height:" + CA.cellSizeY + "px;";
  this.div.setAttribute("style", divStyle);
  this.div.className = 'cellEmpty';
  this.div.id = 'cell_' + x + '_' + y;
  
  this.mouseClick = function(){
    if (this.div.className === 'cellEmpty'){
      this.div.className = 'cellFull';
    }else{
      this.div.className = 'cellEmpty';
    }
  };
  
  this.div.addEventListener('click', CA.bind(this, this.mouseClick));
};

// Grid constructor
var Grid = function(){  
  this.drawGrid = function(){ 
    for (var i=0;i<CA.widthInCells(); i++){
      for (var j=0; j<CA.heightInCells(); j++){
        var cell = new GridCell(i, j);
        CA.gridOutline.appendChild(cell.div);  
      }
    }
  };
};


function loadPage(){
  // // TODO:  add mouse up/down event listeners to document
  // document.addEventListener('mouseup', CA.mouseUp, false);
  // document.addEventListener('mousedown', CA.mouseDown, false);
  
  //create then draw grid
  CA.grid = new Grid();
  CA.grid.drawGrid();
};


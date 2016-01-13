var cellSizeX = 10;
var cellSizeY = 10;

function loadPage(){
		
	drawGrid();
	
	// add click event listener to canvas element
	document.getElementById("myCanvas").addEventListener('click', canvasClick, false);
	
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

function fillCell(x, y, color){
	var ctx = getCtx();
	
	// set color to black if null
	if ((color === null) || (color === 'undefined')){
		color = "#000000";
	}
	
	ctx.fillStyle = color;
	ctx.fillRect(x, y, cellSizeX, cellSizeY);
	
};


function canvasClick(event){
	var ctx=getCtx();
	var x = event.offsetX;
	var y = event.offsetY;
	
	var xstart = Math.floor(x / cellSizeX) * cellSizeX;
	var ystart = Math.floor(y / cellSizeY) * cellSizeY;
	
	fillCell(xstart,ystart);
};

function canvasMove(event){
	
	var ctx=getCtx();
	
	var x = event.offsetX;
	var y = event.offsetY;
	
	
	document.getElementById("mouseCoords").innerHTML = x + ',' + y;
};

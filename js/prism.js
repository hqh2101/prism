//TODO:
//Responsive
//ControlZ + array implementaton + redraw everytime
//mouse circle
//
var brushSize;
var strokes = [];

function setup(){
	createCanvas(windowWidth, windowHeight);
	background('black');
	noLoop();
  brushSize = 30;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background('black');
}

function drawTri(){
  //random triangle vertices
	let x1 = mouseX + Math.floor((0.5-Math.random())*brushSize);
	let x2 = mouseX + Math.floor((0.5-Math.random())*brushSize);
	let x3 = mouseX + Math.floor((0.5-Math.random())*brushSize);
	let y1 = mouseY + Math.floor((0.5-Math.random())*brushSize);
	let y2 = mouseY + Math.floor((0.5-Math.random())*brushSize);
	let y3 = mouseY + Math.floor((0.5-Math.random())*brushSize);
	noStroke();

	fill('rgba('+rndColor()+','+rndColor()+','+rndColor()+',0.1)');
  //draw triangle
	triangle(x1, y1, x2, y2, x3, y3);
}

function drawMultipleTriangles(x){
	for(let i = 0; i < x; i++)
		drawTri();
}

function rndColor(){
	return Math.floor(Math.random()*255);
}

function draw(){
  //TODO allow user to change this number somehow
	drawMultipleTriangles(5);
}

function mousePressed(){
  draw();
}

function mouseDragged(){
  draw();
}


//change brush weight
function mouseWheel(){
  if(event.delta<0)
    brushSize += 10;
  else{
    if(brushSize>10)
      brushSize -=10;
  }
}

//save image
var saveButton = document.getElementById("save-button");

saveButton.onclick = function(){
  saveCanvas('myPrism', 'jpg');
};
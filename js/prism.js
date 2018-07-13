//TODO:
//Responsive
//ControlZ + array implementaton + redraw everytime
//mouse circle
var brushSize;
var strokes = [];

function setup(){
	createCanvas(windowWidth, windowHeight);
	background('black');
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

	var color = 'rgba('+rndColor()+','+rndColor()+','+rndColor()+',0.1)';
  //draw triangle
	return [x1,x2,x3,y1,y2,y3,color];
}

function rndColor(){
	return Math.floor(Math.random()*255);
}

function draw(){
  background(0);
  //draw background
  //draw all triangles in array
  //draw circle around mouse
  mouseCircle();
}

// function mousePressed(){
//   draw();
// }

// function mouseDragged(){
//   draw();
// }

function handleStroke(){
  var stroke = [];
  if(mouseIsPressed === true){
    stroke.push()
  }
  strokes.push(stroke);
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

//circle around mouse
function mouseCircle(){
  push();
    stroke('white');
    strokeWeight(1);
    noFill();
    ellipse(mouseX,mouseY,brushSize,brushSize);
  pop();
  console.log("drawing mouse circle");
}
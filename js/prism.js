//TODO:
//Responsive
//ControlZ + array implementaton + redraw everytime
//mouse circle
//change color
//resize but canvas is still ok
//Hide mouse while exporting
//Performance: create a jpeg every few strokes to limt ctrl z and limit speed, then replace background image
var brushSize,currentStroke;
var strokes = [];


function setup(){
	createCanvas(windowWidth, windowHeight);
	background('black');
  brushSize = 30;
  currentStroke = 0;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background('black');
}

function tri(){
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
  drawStrokes();
  //draw background
  //draw all triangles in array
  //draw circle around mouse
  mouseCircle();
}

//_______________________________________________draw code

function drawStrokes(){
  for(let i = 0; i < strokes.length;i++){
    for(let j = 0; j < strokes[i].length;j++){
      fill(strokes[i][j][6]);
      triangle(strokes[i][j][0],
        strokes[i][j][1],
        strokes[i][j][2],
        strokes[i][j][3],
        strokes[i][j][4],
        strokes[i][j][5],);
    }
  }
}

function mousePressed(){
  var newStroke = [];
  strokes.push(newStroke);
  if(strokes.length !== currentStroke)
    console.log("Stroke error");
}

function mouseDragged(){
  strokes[currentStroke].push(tri());
}

function mouseReleased(){
  currentStroke++;
}

function handleStroke(){
  var stroke = [];
  if(mouseIsPressed === true){
    stroke.push()
  }
  strokes.push(stroke);
}

//_____________________________________________end of draw code

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
}
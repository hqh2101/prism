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
  
  // console.log(x1,x2,x3,y1,y2,y3,color);
	return [x1,x2,x3,y1,y2,y3,color];
}

function rndColor(){
	return Math.floor(Math.random()*255);
}

function draw(){
  background(0);
  drawStrokes();
  mouseCircle();
}

//_______________________________________________draw code

function drawStrokes(){
  for(let i = 0; i < currentStroke;i++){
    for(let j = 0; j < strokes[i].length;j++){
      fill(strokes[i][j][6]);
      triangle(strokes[i][j][0],strokes[i][j][1],strokes[i][j][2],strokes[i][j][3],strokes[i][j][4],strokes[i][j][5]);
    }
  }
}

function mousePressed(){
  var newStroke = [];
  if(currentStroke === strokes.length)
    strokes.push(newStroke);
  else if (currentStroke < strokes.length){
    strokes[currentStroke] = newStroke;
  }
  currentStroke++;
  strokes[currentStroke-1].push(tri());
}

function mouseDragged(){
  strokes[currentStroke-1].push(tri());
}


function handleStroke(){
  var stroke = [];
  if(mouseIsPressed === true){
    stroke.push()
  }
  strokes.push(stroke);
}

//_____________________________________________end of draw code

//undo

function keyTyped(){
  if(key === 'z' && currentStroke > 0){
      currentStroke--;
  }else if (key === 'y' && currentStroke < strokes.length){
    
  }
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
}
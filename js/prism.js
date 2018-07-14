//TODO:
//OPTIMIZE + connect to button + automatic
//opacity with keyboard 
//ControlZ
//change color
//Performance: create a jpeg every few strokes to limt ctrl z and limit speed, then replace background image
//Usability: show user how to use software (undo redo)

var brushSize,currentStroke,strokes,density,opacity,saving,counter,validStroke,changingBrush;

var helpContainer = document.getElementById("help-container");
var info = document.getElementById("info");

function setup(){
	createCanvas(windowWidth, windowHeight);
	background('black');
  brushSize = 60;
  currentStroke = 0;
  density = 5;
  strokes = [];
  opacity = 20;
  counter = 0;
  saving = false;
  validStroke = false;
  // changingBrush = false;
  updateInfo();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background('black');
}

function tri(){
  //random triangle vertices
	let x1 = mouseX + Math.floor( (0.5-Math.random())*brushSize);
	let x2 = mouseX + Math.floor( (0.5-Math.random())*brushSize);
	let x3 = mouseX + Math.floor((0.5-Math.random())*brushSize);
	let y1 = mouseY + Math.floor((0.5-Math.random())*brushSize);
	let y2 = mouseY + Math.floor((0.5-Math.random())*brushSize);
	let y3 = mouseY + Math.floor((0.5-Math.random())*brushSize);
	noStroke();

	var color = 'rgba('+rndColor()+','+rndColor()+','+rndColor()+',' + (opacity/100) + ')';
  
  // console.log(x1,x2,x3,y1,y2,y3,color);
	return [x1,y1,x2,y2,x3,y3,color];
}

function rndColor(){
	return Math.floor(Math.random()*255);
}

function draw(){
  background(0);
  drawStrokes();

  if(!saving)
    mouseCircle();
  else if(saving && counter > 1){
    saveCanvas('myPrism', 'jpg');
    saving = false;
    counter = 0;
  } else
     counter++;

  // //old way of changing opacity
  // if(keyIsDown(SHIFT)){
  //   opacity = Math.ceil((1 - mouseY/windowHeight)*100);
  //   changingBrush = true;
  // } else
  //   changingBrush = false;

  updateInfo();
}

function updateInfo(){
  info.innerHTML = "opacity: " + opacity + "    brush size: " + brushSize;
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
  //this is for if there is an area on the screen the user can't click on 
  if(true){
    validStroke = true;
    var newStroke = [];
    if(currentStroke === strokes.length)
      strokes.push(newStroke);
    else if (currentStroke < strokes.length){
      strokes[currentStroke] = newStroke;
    }
    currentStroke++;
    strokes[currentStroke-1].push(tri());
  }
}

function mouseDragged(){
  if(validStroke){
    for(let i = 0; i < density; i++)
    strokes[currentStroke-1].push(tri());
  }
 }

function mouseReleased(){
  validStroke = false;
}

function handleStroke(){
  var stroke = [];
  if(mouseIsPressed === true){
    stroke.push()
  }
  strokes.push(stroke);
}

//_____________________________________________end of draw code

//undo + redo + change opacity
function keyTyped(){
  if(key === 'z' && currentStroke > 0){
      currentStroke--;
  }else if (key === 'y' && currentStroke < strokes.length){
    currentStroke++;
  }else if (!isNaN(parseInt(key,10))){
    var number = parseInt(key,10)*10;
    if(number !== 0)
      opacity = number;
    else
      opacity = 100;
  }
}

//change brush weight
function mouseWheel(){
  if(event.delta<0 && brushSize < 500)
    brushSize += 4;
  else if(brushSize > 10){
      brushSize -=4;
  }
}

//save image
var saveButton = document.getElementById("save-button");

saveButton.onclick = function(){
  saving = true;
  currentStroke--;
};

//reset canvas
document.getElementById("reset-button").onclick = function(){
  clear();
  background(0);
  strokes = [];
  currentStroke = 0;
};

//show help
function hover(element){
  helpContainer.style.display = "block";
}

function unhover(element){
  helpContainer.style.display = "none";
}

//circle around mouse
function mouseCircle(){
  push();
    stroke('white');
    strokeWeight(1);
    // if(!changingBrush){
      noFill();
      ellipse(mouseX,mouseY,brushSize,brushSize);
    // }else{
    //   fill('rgba(255,255,255,' + opacity/100 + ')');
    //   ellipse(windowWidth/2,windowHeight/2,brushSize,brushSize);
    // }
  pop();
}
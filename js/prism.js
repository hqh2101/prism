var width,height;

function setup(){
	createCanvas(windowWidth, windowHeight);
	background('black');
	console.log("created canvas");
	noLoop();
	width = windowWidth;
	height = windowHeight;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function drawTri(){
	let x1 = Math.floor(Math.random()*width);
	let x2 = Math.floor(Math.random()*width);
	let x3 = Math.floor(Math.random()*width);
	let y1 = Math.floor(Math.random()*height);
	let y2 = Math.floor(Math.random()*height);
	let y3 = Math.floor(Math.random()*height);
	noStroke();
	fill('rgba('+rndColor()+','+rndColor()+','+rndColor()+',0.1)');
	triangle(x1, y1, x2, y2, x3, y3);
}

function drawMultipleTriangles(x){
	for(let i = 0; i < x; i++)
		drawTri();
}

function rndColor(){
	return Math.floor(Math.random()*255);
}

function keyTyped(){
	if(key === ' ')
		draw();
}

function draw(){
	drawMultipleTriangles(100);
}
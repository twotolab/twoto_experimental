var fps = 100;
var timeframe =30000; // in seconds//
var earth;
var moon;
var moon2;
var drawingLine;
var drawingLine2;
var strokestyleLine = 1;
var strokestyleLine2 = 1;
var stage;
var tweenearth;
var stageHandler;
var lastX;
var lastY;
var last2X;
var last2Y;
var luck;
var containerHandDrawing;
var fpsLabel;

var colorLines;
var actualColor;
var colorOne;
var colorTwo;
var colorCounter;
var timer;

var paused;

function init() {
	
	colorCounter =1;
	colorOne =randomColor();
	colorTwo =randomColor();
	//
	stage = new createjs.Stage("canvasObject");
	stage.enableMouseOver();
	//
	setUpFpsCounter();
	//
		
	stageHandler = new StageHandlder(stage);
	stageHandler.addEventListener("setupReady", setupMain);
	stageHandler.setup();
	stageHandler.handleFullScreenWithKey(13);
	// stage.addChild(new createjs.Shape()).setTransform(100,100).graphics.f("red").dc(0,0,50);
	stageHandler.addEventListener("update", resizeUpdate);
	//
	
	createjs.Ticker.setFPS(fps);
	//
}
function setUpFpsCounter(){
	// add a text object to output the current FPS:
            fpsLabel = new createjs.Text("-- fps", "bold 18px BebasNeueRegular", "#FFF");
            stage.addChild(fpsLabel);
            fpsLabel.x = 20;
            fpsLabel.y = 10;
	
}

            
function handleComplete(tween) {
	//Tween complete
	console.log("fini");
}

function resizeUpdate(event) {
	createjs.Tween.removeTweens(earth);
	centerearth();
}

function setupMain(event) {
	drawElements();
}

function tick(event) {

	gravitate(earth, moon);
	gravitate(earth, moon2);
	
	moon.x += moon.vx;
	moon.y += moon.vy;
	
	moon2.x += moon2.vx;
	moon2.y += moon2.vy;

	drawLine();

	var luck = randomBetween(1, 200);
	if (luck > 190) {
		//console.log("luck!");
		if (Math.abs(moon.vx) < 2) {
			moon.vx += randomBetween(-5, 5);
		}
		if (Math.abs(moon.vy) < 2) {
			moon.vy += randomBetween(-5, 5);
		}
		if (Math.abs(moon2.vx) < 2) {
			moon2.vx += randomBetween(-5, 5);
		}
		if (Math.abs(moon2.vy) < 2) {
			moon2.vy += randomBetween(-5, 5);
		}
	}
	/*
	if (luck > 20) {
		
		if(strokestyleLine>=1){
			//console.log("strokestyleLine luck! strokestyleLine: "+strokestyleLine);
			strokestyleLine +=randomBetween(-1, 1);
		}
		if(strokestyleLine <1 ){
			
			strokestyleLine =1;
		}
		if(strokestyleLine >20){
			
			strokestyleLine -=1;
		}
				if(strokestyleLine2>=1){
			//console.log("strokestyleLine luck! strokestyleLine: "+strokestyleLine);
			strokestyleLine2 +=randomBetween(-1, 1);
		}
		if(strokestyleLine2 <1 ){
			
			strokestyleLine2 =1;
		}
		if(strokestyleLine2 >20){
			
			strokestyleLine2 -=1;
		}
	}
//	*/

	stage.update();
	timer =createjs.Ticker.getTime();
	fpsLabel.text = Math.round(createjs.Ticker.getMeasuredFPS()) + " fps - "+Math.round((timeframe-timer)*0.001)+" sec left";
	
	//paused = createjs.Ticker.getPaused();
	
	if( timer >= timeframe){
		console.log("--------------------timer End: "+timer);
		//createjs.Ticker.setPaused(true);
		
		togglePause();
		fpsLabel.text ="end";
		stage.update();
		//createjs.Ticker.setPaused(true);
	}
	}
	function togglePause() {
		
		paused = !createjs.Ticker.getPaused();
		createjs.Ticker.setPaused(true);
		//document.getElementById("pauseBtn").value = paused ? "unpause" : "pause";
}
function drawLine() {

	actualColor = makeGradientColor(colorOne,colorTwo,colorCounter);
	//console.log("actualColor.cssColor :"+actualColor.cssColor);
	colorCounter +=0.1;
	if(colorCounter >= 100){	
		colorTwo =colorOne;
		colorOne =randomColor();
		colorCounter =1;
	}	

		

	if (drawingLine == null) {
		drawingLine = new createjs.Shape();
		containerHandDrawing.addChild(drawingLine);
		drawingLine.cache(0,0,stageHandler.getWidth(),stageHandler.getHeight());
		console.log("drawingLine!: ");
	}
	drawingLine.graphics.setStrokeStyle(strokestyleLine,1);
	drawingLine.graphics.beginStroke(colorOne);
	/*
		drawingLine.graphics.beginStroke(actualColor.cssColor);
	drawingLine.graphics.moveTo(lastX, lastY);
	drawingLine.graphics.lineTo(moon.x, moon.y);
	*/

	drawingLine.alpha=0.2;
	drawingLine.graphics.beginFill( "rgba("+actualColor.r+","+actualColor.g+","+actualColor.b+",0.1)").drawCircle(moon.x,moon.y, 20);
	//
	drawingLine.updateCache("source-overlay");
	drawingLine.graphics.clear();
	
	
	if (drawingLine2 == null) {
		drawingLine2 = new createjs.Shape();
		containerHandDrawing.addChild(drawingLine2);
		drawingLine2.cache(0,0,stageHandler.getWidth(),stageHandler.getHeight());
		console.log("drawingLine2!: ");
	}
	drawingLine2.graphics.setStrokeStyle(strokestyleLine2,1);
	/*
	drawingLine2.graphics.beginStroke(colorTwo);
	drawingLine2.alpha=0.2;
	drawingLine2.graphics.beginFill("rgba("+actualColor.r+","+actualColor.g+","+actualColor.b+",0.1)").drawCircle(moon2.x,moon2.y, 100);
	*////*
	drawingLine2.graphics.beginStroke(actualColor.cssColor);
	drawingLine2.graphics.moveTo(last2X, last2Y);
	drawingLine2.graphics.lineTo(moon2.x, moon2.y);
	//*/
	
	drawingLine2.updateCache("source-overlay");
	drawingLine2.graphics.clear();
	//drawingLine2.graphics.clear();
	//*/
	lastX = moon2.x;
	lastY = moon2.y;
	
	last2X = moon.x;
	last2Y = moon.y;
}

function gravitate(_attractor, _satellit) {
	var attractor = _attractor;
	var satellit = _satellit;
	var dx = attractor.x - satellit.x;
	var dy = attractor.y - satellit.y;
	var distSQ = dx * dx + dy * dy;
	var dist = Math.sqrt(distSQ);
	var force = attractor.mass * satellit.mass;
	var ax = force * dx / dist;
	var ay = force * dy / dist;
	satellit.vx += ax / attractor.mass;
	satellit.vy += ay / attractor.mass;
}

function drawElements() {
	earth = new Particle("blue", 20, 0, 0, 1000);
	earth.alpha=0;
	
	containerHandDrawing = new createjs.Container();
	stage.addChild(containerHandDrawing);
	//
	var earthX = stageHandler.getCenterX() - earth.width / 2;
	var earthY = stageHandler.getCenterY() - earth.height / 2;
	//
	earth.x = earthX;
	earth.y = earthY;
	stage.addChild(earth);
	
	moon = new Particle("black", 1, randomBetween(-20, 20), randomBetween(-20, 20), 1);
	moon.x = stageHandler.getWidth() / 2 + randomBetween(-20, 20);
	moon.y = stageHandler.getHeight() / 2 + randomBetween(-20, 20);
	console.log("moon.vx :" + moon.vx);
	stage.addChild(moon);
	
	moon2 = new Particle("black", 1, randomBetween(-20, 20), randomBetween(-20, 20), 1);
	moon2.x = stageHandler.getWidth() / 2 + randomBetween(-20, 20);
	moon2.y = stageHandler.getHeight() / 2 + randomBetween(-20, 20);
	console.log("moon2.vx :" + moon2.vx);
	stage.addChild(moon2);
	//
/*
	tweenearth = createjs.Tween.get(earth, {
		override: true
	}).to({
		scaleX: 1,
		scaleY: 1
	}, 2000, createjs.Ease.elasticOut).call(handleComplete);
	*/
	//
	//	createjs.Ticker.addEventListener("tick", stage);
	//createjs.Ticker.addEventListener("tick", tick);
	createjs.Ticker.addListener(tick, true);
}

function centerearth() {
	var earthX = stageHandler.getCenterX() - earth.width / 2;
	var earthY = stageHandler.getCenterY() - earth.height / 2;
	tweenearth = createjs.Tween.get(earth, {
		override: false
	}).to({
		x: earthX,
		y: earthY
	}, 1000, createjs.Ease.cubicOut);
}


window.onload = init;
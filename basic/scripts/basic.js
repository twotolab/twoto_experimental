var fps = 50;
var timeframe = 10000; // in seconds//
var totalMoons = 3; // in seconds//
var stage;
var earth;
var tweenearth;
var moonArray;
var linesArray;
var fpsLabel;

var drawingLine;

function init() {
	//
	stage = new createjs.Stage("canvasObject");
	stage.enableMouseOver();
	//
	stageHandler = new StageHandlder(stage);
	//
	stageHandler.addEventListener("setupReady", setupMain);
	//
	stageHandler.setup();
	//
	stageHandler.addEventListener("focus", focusHandler);
	stageHandler.addEventListener("update", resizeHandler);
	stageHandler.handleFullScreenWithKey(13);
	//
	createjs.Ticker.setFPS(fps);
	//
	setUpFpsCounter();
}

function setupMain(event) {
	drawElements();
	createjs.Ticker.addListener(tick, true);
}

function focusHandler(event) {
	console.log("focusHandler: " + document.body.focusInfo)
}

function resizeHandler(event) {
	createjs.Tween.removeTweens(earth);
	centerearth();
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

function drawElements() {
	//
	earth = new Particle("blue", 20, 0, 0, 1000);
	earth.alpha = 0;
	//
	var earthX = stageHandler.getCenterX() - earth.width / 2;
	var earthY = stageHandler.getCenterY() - earth.height / 2;
	//
	earth.x = earthX;
	earth.y = earthY;
	stage.addChild(earth);
	containerHandDrawing = new createjs.Container();
	stage.addChild(containerHandDrawing);
	//
	createMoons(totalMoons, stage);
}

function createMoons(_totalMoons, _target) {
	moonArray = new Array();
	var moonelt;
	for (var i = 0; i < _totalMoons; i++) {
		moonelt = new Particle("black", randomBetween(5,10), randomBetween(-1, 1), randomBetween(-1, 1), randomBetween(1, 8));
		moonelt.x = stageHandler.getWidth() / 2 + randomBetween(-300,300);
		moonelt.y = stageHandler.getHeight() / 2 + randomBetween(-300,300);
		_target.addChild(moonelt);
		moonArray.push(moonelt);
	}
	//*/
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
function drawLine() {

	if (drawingLine == null) {
		drawingLine = new createjs.Shape();
		containerHandDrawing.addChild(drawingLine);
		drawingLine.cache(0,0,stageHandler.getWidth(),stageHandler.getHeight());
		console.log("drawingLine!: ");
	}
	
	drawingLine.alpha=0.5;
		drawingLine.graphics.setStrokeStyle(1,1);
		drawingLine.graphics.beginStroke("#000");
		//drawingLine.graphics.moveTo(moonelt.x, moonelt.y);
		drawingLine.graphics.moveTo(10, 10);
		//drawingLine.graphics.lineTo(moonelt2.x, moonelt2.y);
		drawingLine.graphics.lineTo(100, 100);
	var moonelt;
	var moonelt2;
	var l = moonArray.length;
	actualColor =randomColor();
	for (var i = 0; i < l-1; i++) {
		moonelt = moonArray[i];
		moonelt2 = moonArray[i+1];
		drawingLine.graphics.setStrokeStyle(1,1);
		drawingLine.graphics.beginStroke("#000");
		//drawingLine.graphics.moveTo(moonelt.x, moonelt.y);
		drawingLine.graphics.moveTo(10, 10);
		//drawingLine.graphics.lineTo(moonelt2.x, moonelt2.y);
		drawingLine.graphics.lineTo(100, 100);
		//drawingLine.graphics.beginFill( "rgba("+actualColor.r+","+actualColor.g+","+actualColor.b+",0.1)").drawCircle(moonelt.x,moonelt.y, 0.1*moonelt.x);
	}
	//drawingLine.updateCache("source-overlay");
	//drawingLine.graphics.clear();
}
function tick(event) {
	var l = moonArray.length;
	var moonelt;
	for (var i = 0; i < l; i++) {
		moonelt = moonArray[i];
		gravitate(earth, moonelt);
		moonelt.x += moonelt.vx;
		moonelt.y += moonelt.vy;
	}
	drawLine();

	stage.update();
	//
	timer = createjs.Ticker.getTime();
	fpsLabel.text = Math.round(createjs.Ticker.getMeasuredFPS()) + " fps - " + Math.round((timeframe - timer) * 0.001) + " sec left";
	if (timer >= timeframe) {
		console.log("--------------------timer End: " + timer);
		togglePause();
		fpsLabel.text = "end";
		stage.update();
	}
}

function togglePause() {
	paused = !createjs.Ticker.getPaused();
	createjs.Ticker.setPaused(true);
	//document.getElementById("pauseBtn").value = paused ? "unpause" : "pause";
}
window.onload = init;
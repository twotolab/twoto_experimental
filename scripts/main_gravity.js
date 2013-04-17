var fps = 70;
var earth;
var moon;
var moon2;
var drawingLine;
var drawingLine2;
var strokestyleLine = 10;
var strokestyleLine2 = 10;
var stage;
var tweenearth;
var stageHandler;
var lastX;
var lastY;
var luck;
var containerHandDrawing;

function init() {
	stage = new createjs.Stage("canvasObject");
	stage.enableMouseOver();
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
	containerHandDrawing.cache(0,0,w,h);
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
		console.log("luck!");
		if (Math.abs(moon.vx) < 2) {
			moon.vx += randomBetween(-10, 10);
		}
		if (Math.abs(moon.vy) < 2) {
			moon.vy += randomBetween(-10, 10);
		}
		if (Math.abs(moon2.vx) < 2) {
			moon2.vx += randomBetween(-10, 10);
		}
		if (Math.abs(moon2.vy) < 2) {
			moon2.vy += randomBetween(-10, 10);
		}
	}
	

	stage.update();
	containerHandDrawing.updateCache("source-overlay");	}

function drawLine() {
	
	if (drawingLine == null) {
		drawingLine = new createjs.Shape();
		containerHandDrawing.addChild(drawingLine);
		drawingLine.graphics.setStrokeStyle(strokestyleLine);
		drawingLine.graphics.beginStroke("black");
		drawingLine.graphics.moveTo(moon.x, moon.y);
		console.log("drawingLine!: ");
	}

	drawingLine.graphics.lineTo(moon.x, moon.y);
	
	
	if (drawingLine2 == null) {
		drawingLine2 = new createjs.Shape();
		containerHandDrawing.addChild(drawingLine2);
		drawingLine2.graphics.setStrokeStyle(strokestyleLine2);
		drawingLine2.graphics.beginStroke("black");
		drawingLine2.graphics.moveTo(moon2.x, moon2.y);
		console.log("drawingLine2!: ");
	}
	drawingLine2.graphics.lineTo(moon2.x, moon2.y);
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
	
	moon = new Particle("black", 5, randomBetween(-20, 20), randomBetween(-20, 20), 1);
	moon.x = stageHandler.getWidth() / 2 + randomBetween(-20, 20);
	moon.y = stageHandler.getHeight() / 2 + randomBetween(-20, 20);
	console.log("moon.vx :" + moon.vx);
	stage.addChild(moon);
	
	moon2 = new Particle("black", 5, randomBetween(-20, 20), randomBetween(-20, 20), 1);
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
	createjs.Ticker.addEventListener("tick", tick);
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

function randomBetween(min, max) {
	if (min < 0) {
		return min + Math.random() * (Math.abs(min) + max);
	} else {
		return min + Math.random() * max;
	}
}
window.onload = init;
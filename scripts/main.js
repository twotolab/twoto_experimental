var fps = 50;
var circle;
var stage;
var tweenCircle;
var stageHandler;

function init() {
	stage = new createjs.Stage("canvasObject");
	stage.enableMouseOver();
	stageHandler = new StageHandlder(stage);
	stageHandler.addEventListener("setupReady", drawElements);
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
	createjs.Tween.removeTweens(circle);
	centerCircle();
}

function drawElements(event) {
	circle = new Circle("black", 200);
	//
	var circleX = stageHandler.getCenterX() - circle.width / 2;
	var circleY = stageHandler.getCenterY() - circle.height / 2;
	//
	circle.x = circleX;
	circle.y = circleY;
	stage.addChild(circle);
	circle.scaleX = 0.1;
	circle.scaleY = 0.1;
	//
	tweenCircle = createjs.Tween.get(circle, {
		override: true
	}).to({
		scaleX: 1,
		scaleY: 1
	}, 2000, createjs.Ease.elasticOut).call(handleComplete);
	//
	circle.onMouseOver = function() {
		console.log("mouseOver ");
		tweenCircle = createjs.Tween.get(circle, {
			override: true
		}).to({
			scaleX: 1.2,
			scaleY: 1.2
		}, 2000, createjs.Ease.elasticOut)
	}
	circle.onMouseOut = function() {
		console.log("mouseOut ");
		tweenCircle = createjs.Tween.get(circle, {
			override: true
		}).to({
			scaleX: 1,
			scaleY: 1
		}, 2000, createjs.Ease.elasticOut)
	}
	createjs.Ticker.addEventListener("tick", stage);
}

function centerCircle() {
	var circleX = stageHandler.getCenterX() - circle.width / 2;
	var circleY = stageHandler.getCenterY() - circle.height / 2;
	tweenCircle = createjs.Tween.get(circle, {
		override: false
	}).to({
		x: circleX,
		y: circleY
	}, 1000, createjs.Ease.cubicOut);
}
window.onload = init;
(function(window) {
	var localInstanceRef;
	var Localcanvas;

	function StageHandlder(_stage) {
		localInstanceRef = this;
		this.stage = _stage;
		//this.name = (_stage == undefined) ? error("no stage name") : _stage;
		this.name = "stageHandlder";
		createjs.EventDispatcher.initialize(StageHandlder.prototype);
	}

	function error(value) {
		console.log("error!!:" + value);
		return undefined;
	}
	StageHandlder.prototype.getName = function() {
		return this.name;
	}
	StageHandlder.prototype.getCenterX = function() {
		return Localcanvas.width / 2;
	}
	StageHandlder.prototype.getCenterY = function() {
		return Localcanvas.height / 2;
	}
	StageHandlder.prototype.getWidth = function() {
		return Localcanvas.width;
	}
	StageHandlder.prototype.getHeight = function() {
		return Localcanvas.height;
	}
	StageHandlder.prototype.update = function() {
		this.dispatchEvent('update');
	}
	StageHandlder.prototype.setup = function() {
		var stage = this.stage;
		//console.log("this.stage: "+this.stage);
		Localcanvas = stage.canvas;
		// resize the canvas to fill browser window dynamically
		window.addEventListener('resize', resizeCanvas, true);
		createjs.EventDispatcher.initialize(StageHandlder.prototype);
		resizeCanvas();
		stage.width = window.innerWidth;
		stage.height =window.innerHeight;

		function resizeCanvas() {
			Localcanvas.width = window.innerWidth;
			Localcanvas.height = window.innerHeight;
			localInstanceRef.update();
		}
		console.log("setup fini: ");
		this.dispatchEvent('setupReady');
	}
	StageHandlder.prototype.handleFullScreenWithKey = function(_keyTargetNumber) {
		document.addEventListener("keydown", function(e) {
			if (e.keyCode == _keyTargetNumber) { /* enter is 13*/
				handleFullScreen();
			}
		}, false);
	}
	// basic functions

	function handleFullScreen() {
		if (!document.fullscreenElement && // alternative standard method
		!document.mozFullScreenElement && !document.webkitFullscreenElement) { // current working methods
			if (document.documentElement.requestFullscreen) {
				document.documentElement.requestFullscreen();
			} else if (document.documentElement.mozRequestFullScreen) {
				document.documentElement.mozRequestFullScreen();
			} else if (document.documentElement.webkitRequestFullscreen) {
				document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
			}
		} else {
			if (document.cancelFullScreen) {
				document.cancelFullScreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.webkitCancelFullScreen) {
				document.webkitCancelFullScreen();
			}
		}
	}
	window.StageHandlder = StageHandlder;
}(window));
(function(window) {
	var localInstanceRef;
	var Localcanvas;
	var localFocus = "hidden";

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

	function resizeCanvas() {
		Localcanvas.width = window.innerWidth;
		Localcanvas.height = window.innerHeight;
		localInstanceRef.update();
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
	StageHandlder.prototype.focus = function() {
		this.dispatchEvent('focus');
	}
	StageHandlder.prototype.localFocusStatus = function() {
		return localFocus;
	}
	StageHandlder.prototype.setup = function() {
		var stage = this.stage;
		//console.log("this.stage: "+this.stage);
		Localcanvas = stage.canvas;
		// resize the canvas to fill browser window dynamically
		window.addEventListener('resize', resizeCanvas, true);
		createjs.EventDispatcher.initialize(StageHandlder.prototype);
		resizeCanvas();
		handleFocus();
		stage.width = window.innerWidth;
		stage.height = window.innerHeight;
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

	function handleFocus() {
		// Standards:
		if (localFocus in document) document.addEventListener("visibilitychange", onchange);
		else if ((localFocus = "mozHidden") in document) document.addEventListener("mozvisibilitychange", onchange);
		else if ((localFocus = "webkitHidden") in document) document.addEventListener("webkitvisibilitychange", onchange);
		else if ((localFocus = "msHidden") in document) document.addEventListener("msvisibilitychange", onchange);
		// IE 9 and lower:
		else if ('onfocusin' in document) document.onfocusin = document.onfocusout = onchange;
		// All others:
		else window.onpageshow = window.onpagehide = window.onfocus = window.onblur = onchange;

		function onchange(evt) {
			var v = 'visible',
				h = 'hidden',
				evtMap = {
					focus: v,
					focusin: v,
					pageshow: v,
					blur: h,
					focusout: h,
					pagehide: h
				};
			evt = evt || window.event;
			if (evt.type in evtMap) document.body.focusInfo = evtMap[evt.type];
			else document.body.focusInfo = this[localFocus] ? "hidden" : "visible";
			//this.dispatchEvent('focus');
			localInstanceRef.focus();
			//this.dispatchEvent('focus: '+document.body.className);
			//console.log("I m " + document.body.focusInfo);
		}
	}
	window.StageHandlder = StageHandlder;
}(window));
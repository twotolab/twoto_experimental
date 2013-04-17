(function(window) {
	var localDisplayObj;

	function Circle(_color,_width) {
		this.initialize(_color,_width);
		//
		this.drawCircle();
	}
	//Inheritance from Container
	Circle.prototype = new createjs.Container();
	Circle.prototype.Container_initialize = Circle.prototype.initialize;
	Circle.prototype.Container_tick = Circle.prototype._tick;
	Circle.prototype.initialize = function(_color,_width) {
		//call to initialize() method from parent class 
		this.Container_initialize();
		this.color =_color;
		this.width =_width;
		console.log("Circle initialized");
	}
	/*
	Circle.prototype._tick = function() {
		//call to _tick method from parent class 
		this.Container_tick();
		console.log("Circle Ticked");
	}
	*/
	Circle.prototype.drawCircle = function() {
		localDisplayObj = new createjs.Shape();
		localDisplayObj.name = "loaclCircle";
		localDisplayObj.graphics.beginFill(this.color).drawCircle(0, 0, this.width);
		this.width = 50;
		this.height = 50;
		

		localDisplayObj.shadow = new createjs.Shadow("#000000", 0, 0, 100);
	
		this.addChild(localDisplayObj);
			this.cache(-300, -300, 600,600); 
	}
	window.Circle = Circle;
}(window));
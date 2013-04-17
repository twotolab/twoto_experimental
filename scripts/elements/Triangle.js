(function(window) {

	function Triangle(_color,_width) {
		
		this.color =_color;
		this.width =_width;
		
		this.initialize(_color,_width);
		//

	}
	//Inheritance from Container
	Triangle.prototype = new createjs.Container();
	Triangle.prototype.Container_initialize = Triangle.prototype.initialize;
	Triangle.prototype.Container_tick = Triangle.prototype._tick;
	Triangle.prototype.initialize = function(_color,_width) {
		//call to initialize() method from parent class 
		this.Container_initialize();
		this.inner = this.getSprite();
		this.addChild(this.inner);
		/*
		this.shadow = new createjs.Shadow("#000000", 0, 0, 100);
		*/
		console.log("Triangle initialized");
	}
	/*
	Triangle.prototype._tick = function() {
		//call to _tick method from parent class 
		this.Container_tick();
		console.log("Triangle Ticked");
	}
	*/
	/*
	Triangle.prototype.getSprite = function() {
		var localDisplayObj = new createjs.Shape();
		localDisplayObj.name = "loaclTriangle";
		//localDisplayObj.graphics.beginFill(this.color).drawTriangle(0, 0, this.width);
		
		localDisplayObj.graphics.beginLinearGradientFill(["#000","#FFF"], [0, 1], 0, 20, 0, 120).drawRect(20, 20, 120, 120);
		this.width = 50;
		this.height = 50;
		
		return localDisplayObj;
		
	}*/
		Triangle.prototype.getSprite = function() {
		var localDisplayObj = new createjs.Shape();
		localDisplayObj.name = "loaclTriangle";
		
		var pos_0_X = 0;
		var pos_0_Y = 0;
		
	
		var pos_1_X = 500;
		var pos_1_Y = 200;
		
		var pos_2_X = -100;
		var pos_2_Y =500;
	
		var pos_gradient_0_X = pos_0_X;
		var pos_gradient_0_Y = pos_0_Y;
			

		var pos_gradient_1_X = Math.floor((pos_1_X+pos_2_X)*.5);
		var pos_gradient_1_Y = Math.floor((pos_1_Y+pos_2_Y)*.5);
	
		console.log("pos_gradient_1_X: "+pos_gradient_1_X);
		console.log("pos_gradient_1_Y: "+pos_gradient_1_Y);
	
		localDisplayObj.graphics.beginLinearGradientFill(["red","#000"], [0, 1], pos_gradient_0_X, pos_gradient_0_Y, pos_gradient_1_X, pos_gradient_1_Y)
			.moveTo(pos_0_X, pos_0_Y)
			.lineTo(pos_1_X, pos_1_Y)
			.lineTo(pos_2_X, pos_2_Y)
			//.endStroke();
		/*
		localDisplayObj.graphics.beginLinearGradientFill(["#000","#FFF"], [0, 1], 0, 20, 0, 120).drawRect(20, 20, 120, 120);
		localDisplayObj.graphics.beginLinearGradientFill(["#000","red"], [0, 1], 0, 0, 0, 120).drawRect(220, 20, 120, 120);
		localDisplayObj.graphics.beginLinearGradientFill(["#000","red"], [0, 1], 0, 20, 0, 120).drawRect(340, 20, 120, 100);
		/**/
		return localDisplayObj;
		
	}
	
	window.Triangle = Triangle;
}(window));
(function(window) {
	var localDisplayObj;

	function Particle(_color,_width,_vx,_vy,_mass) {
		this.initialize(_color,_width,_vx,_vy,_mass);
		//
		this.drawCircle();
	}
	//Inheritance from Container
	Particle.prototype = new createjs.Container();
	Particle.prototype.Container_initialize = Particle.prototype.initialize;
	//Particle.prototype.Container_tick = Particle.prototype._tick;
	Particle.prototype.initialize = function(_color,_width,_vx,_vy,_mass) {
		//call to initialize() method from parent class 
		this.Container_initialize();
		this.color =_color;
		this.width =_width;
		this.vx =_vx;
		this.vy =_vy;
		this.mass =_mass;
		console.log("Particle initialized");
	}
	Particle.prototype.vx = function() {
		return this.vx;
	}
	Particle.prototype.vy = function() {
		return this.vy;
	}
	/*
	Particle.prototype._tick = function() {
		//call to _tick method from parent class 
		this.Container_tick();
		// this.x += 1;
		console.log("Particle Ticked");
	}
	*/
	Particle.prototype.drawCircle = function() {
		localDisplayObj = new createjs.Shape();
		localDisplayObj.name = "localParticle";
		localDisplayObj.graphics.beginFill(this.color).drawCircle(0, 0, this.width);
		this.height = this.width;
		this.addChild(localDisplayObj);
		localDisplayObj.snapToPixel = true;
	}
	window.Particle = Particle;
}(window));
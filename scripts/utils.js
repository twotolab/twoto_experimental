//////////////////////////////////////
// colors
//////////////////////////////////////
function makeGradientColor(color1, color2, percent) {
    var newColor = {};

    function makeChannel(a, b) {
        return(a + Math.round((b-a)*(percent/100)));
    }

    function makeColorPiece(num) {
        num = Math.min(num, 255);   // not more than 255
        num = Math.max(num, 0);     // not less than 0
        var str = num.toString(16);
        if (str.length < 2) {
            str = "0" + str;
        }
        return(str);
    }

    newColor.r = makeChannel(color1.r, color2.r);
    newColor.g = makeChannel(color1.g, color2.g);
    newColor.b = makeChannel(color1.b, color2.b);
    newColor.cssColor = "#" + 
                        makeColorPiece(newColor.r) + 
                        makeColorPiece(newColor.g) + 
                        makeColorPiece(newColor.b);
    newColor.rgbColor = 'rgb(' + newColor.r + ', ' + newColor.g + ', ' + newColor.b + ')';
   
    return(newColor);
}
/*
this.toRGB = function () {
        return 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')';
    }*/
function randomColor() {
	var newColor = {};
	//
	newColor.r = Math.round(randomBetween(0,255));
	newColor.g = Math.round(randomBetween(0,255));
    newColor.b = Math.round(randomBetween(0,255));
	//
	return(newColor); 
}
function randomHexColor() {
	var newColor =randomColor();
	return RGB2Color(newColor.r,newColor.g,newColor.b);
}
function RGB2Color(r,g,b)
  {
    return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
  }
 function byte2Hex(n)
  {
    var nybHexString = "0123456789ABCDEF";
    return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
  }
  
//////////////////////////////////////
// general
//////////////////////////////////////
  
function randomBetween(min, max) {
	if (min < 0) {
		return Math.round(min + Math.random() * (Math.abs(min) + max));
	} else {
		return Math.round(min + Math.random() * max);
	}
}
//////////////////////////////////////
// createjs utils
//////////////////////////////////////
function setUpFpsCounter(){
	// add a text object to output the current FPS:
            fpsLabel = new createjs.Text("-- fps", "bold 18px BebasNeueRegular", "#FFF");
            stage.addChild(fpsLabel);
            fpsLabel.x = 20;
            fpsLabel.y = 10;
	
}
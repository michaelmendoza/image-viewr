
import FeatureROI from './feature-roi.js';
import FeatureTypes from './feature-types.js';

class FeatureCircleROI extends FeatureROI {
	constructor() {
		super();
		this.type = FeatureTypes.CIRCLE;
		this.radius = null;
	}

	updateROI(event) {
		var x = event.offsetX;
		var y = event.offsetY;
		var dx = Math.abs(this.x - x);
		var dy = Math.abs(this.y - y);
		this.radius = Math.sqrt(dx*dx + dy*dy);
	}

	isPositionInROI(event) {
		if(this.radius == null)
			return false;

		var x = event.offsetX;
		var y = event.offsetY;		
		var xCheck = (this.x - this.radius) <= x && x <= (this.x + this.radius);
		var yCheck = (this.y - this.radius) <= y && y <= (this.y + this.radius);
		return xCheck && yCheck;
	}
	
	getBoundingBox() {
		var sx = this.x - this.radius;
		var sy = this.y - this.radius;
		var width = 2 * this.radius;
		var height = 2 * this.radius;
		return { sx:sx, sy:sy, width:width, height:height };
	}

	drawMaskROI(context) {
		//context2.clearRect(0,0,canvas2.width, canvas2.height);
		var x = this.radius;
		var y = this.radius;
		var r = this.radius;
		context.beginPath();
		context.fillStyle = "#FFFFFF";
		context.arc(x, y, r, 0, 2*Math.PI);
		context.fill();
	}

}

export default FeatureCircleROI;
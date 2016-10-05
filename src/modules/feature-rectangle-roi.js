
import FeatureROI from './feature-roi.js';
import FeatureTypes from './feature-types.js';

class FeatureRectangleROI extends FeatureROI {
	constructor() {
		super();
		this.type = FeatureTypes.RECT;
		this.width = null;
		this.height = null;
	}	

	updateROI(event) {
		var x = event.offsetX;
		var y = event.offsetY;
		var dx = Math.abs(this.x - x);
		var dy = Math.abs(this.y - y);
		this.width = width;
		this.height = dy;
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

	drawROI(context) {
		context.strokeStyle = '#4DF94D';
		context.rect(this.x,this.y,this.width,this.height);
		context.stroke();
	}
}

export default FeatureRectangleROI;
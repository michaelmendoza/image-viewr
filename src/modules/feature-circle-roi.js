
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

	drawROI(context) {
		context.beginPath();
		context.strokeStyle = '#4DF94D';
		context.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
		context.stroke();
	}
}

export default FeatureCircleROI;
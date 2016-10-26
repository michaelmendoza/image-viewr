
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

	calcAveragePixelValue(context) {
		var imageData = context.getImageData(this.x, this.y, this.width, this.height);
		var data = imageData.data;
		var total = 0;
		for (var i = 0; i < data.length; i += 4) {
			total += (data[i] + data[i +1] + data[i +2]) / 3;
		}
		return total / (data.length / 4);
	}

}

export default FeatureRectangleROI;
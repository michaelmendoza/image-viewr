
import FeatureROI from './feature-roi.js';
import FeatureTypes from '../modes/feature-types.js';

class FeatureCircleROI extends FeatureROI {
	constructor() {
		super();
		this.name = 'Circle ROI';
		this.type = FeatureTypes.CIRCLE;
		this.radius = null;
		this.handleSize = 4;
		this.handleIsActive = false;
	}
	
	drawMaskROI(context, bounds, controls) {
		var x = this.radius;
		var y = this.radius;
		var r = this.radius;
		context.beginPath();
		context.fillStyle = "#FFFFFF";
		context.arc(x, y, r, 0, 2*Math.PI);
		context.fill();
	} 
	
	getBoundingBox() {
		var sx = this.x - this.radius;
		var sy = this.y - this.radius;
		var width = 2 * this.radius;
		var height = 2 * this.radius;
		return { sx:sx, sy:sy, width:width, height:height };
	}
	
	isOnHandle(point) {
		var x = point.x - this.x; // x distance from radius
		var y = point.y - this.y; // y distance form radius
		var r = Math.sqrt(x * x + y * y); // r distance in polar coordinates

		if(this.radius - this.handleSize <= r && r <= this.radius + this.handleSize)
			this.handleIsActive = true;
		else
			this.handleIsActive = false;

		return this.handleIsActive;
	}

	isOnMask(point) {
		if(this.radius == null)
			return false;

		var x = point.x;
		var y = point.y;		
		var xCheck = (this.x - this.radius) <= x && x <= (this.x + this.radius);
		var yCheck = (this.y - this.radius) <= y && y <= (this.y + this.radius);
		return xCheck && yCheck;
	}

	isOnROI(point) { 
		// Check points
		if(this.isOnHandle(point))
			return true;

		// Check ROI mask
		return this.isOnMask(point);
	}

	update(point) {
		var x = point.x;
		var y = point.y;
		var dx = Math.abs(this.x - x);
		var dy = Math.abs(this.y - y);
		this.radius = Math.sqrt(dx*dx + dy*dy);
	}

	updatePosition(point) {
		this.x = point.x;
		this.y = point.y;
	}

}

export default FeatureCircleROI;
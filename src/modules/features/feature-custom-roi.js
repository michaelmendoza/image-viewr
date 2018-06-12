
import FeatureROI from './feature-roi.js';
import FeatureTypes from '../modes/feature-types.js';
import Point from '../utils/point.js';

class FeatureCustomROI extends FeatureROI {
	constructor() {
		super();
		this.name = 'Custom ROI';
		this.type = FeatureTypes.CUSTOM;
		this.points = [];

		this.isClosedShape = false;
	}

	addPoint(point) {
		if(this.isClosedShape)
			return;

		if(this.points.length == 0) {  
			this.points.push(point); // Add point
		}
		else {
			// Close shape if click on starting point
			var startPt = new Point(this.points[0].x, this.points[0].y);
			if( startPt.isOnPoint(point.x, point.y) ) {
				//this.points.push(startPt); //looks like it adds a second start point here
				this.isClosedShape = true;
			}
			else {
				this.points.push(point); // Add point 
			}
		}
	}
	
	drawMaskROI(context, bounds) {
		context.fillStyle = "#FFFFFF";

		if(this.points.length > 1) {
			context.moveTo(this.points[0].x - bounds.sx, this.points[0].y - bounds.sy);

			this.points.forEach(function(point) {
				context.lineTo(point.x - bounds.sx, point.y - bounds.sy);
			});
			context.fill();
		}
	}

	getBoundingBox() { 
		var x = this.points.map((p) => { return p.x; });
		var y = this.points.map((p) => { return p.y; });
		var min = { x:Math.min(...x), y:Math.min(...y) };
		var max = { x:Math.max(...x), y:Math.max(...y) };
		return { sx:min.x, sy:min.y, width:max.x-min.x, height:max.y-min.y };
	}
	
	isOnHandle(point) { 
		var x = point.x;
		var y = point.y;
		var click = new Point(x,y);

		var closestPoint = null;
		this.points.forEach((point) => {
			if(click.isOnPoint(point.x, point.y)) {
				closestPoint = point;
			}
		})

		this.activePoint = closestPoint;
		return this.activePoint != null;
	}

	isOnMask(point) { 
		var x = point.x;
		var y = point.y;
		var bounds = this.getBoundingBox();

		if(x < bounds.sx || bounds.sx + bounds.width < x || y < bounds.sy || bounds.sy + bounds.height < y)
			return false;

		var xStride = 4;
		var yStride = Math.floor(4 * bounds.width);
		x = Math.round(x - bounds.sx);
		y = Math.round(y - bounds.sy);
		var mask = this.createMaskData();
		var value = mask[y * yStride + x * xStride];
		if(value == 255) return true;
		else return false;
	}

	isOnROI(point) {
		// Check points
		var isOnHandle = this.isOnHandle(point);
		if(isOnHandle)
			return true;

		// Check ROI mask
		return this.isOnMask(point);
	}

	update(point) {
		// Update Active Point
		if(this.activePoint != null) {
			this.activePoint.x = point.x;
			this.activePoint.y = point.y;
		}
	}

	updatePosition(point) {
		if(point == null) {
			this.isDrag = false;
			return;
		}

		var x = point.x;
		var y = point.y;

		if(this.isDrag) {

			this.points.forEach((point)=> {
				point.x += x - this.x;
				point.y += y - this.y;
			})

			this.x = x;
			this.y = y;
		}
		else {
			this.isDrag = true;
			this.x = x;
			this.y = y;
		}
	}

}

export default FeatureCustomROI;

import FeatureROI from './feature-roi.js';
import FeatureTypes from './feature-types.js';
import Point from './point.js';

class FeatureCustomROI extends FeatureROI {
	constructor() {
		super();
		this.name = 'Custom ROI';
		this.type = FeatureTypes.CUSTOM;
		this.points = [];

		this.isClosedShape = false;
	}

	addPoint(event) {
		if(this.isClosedShape)
			return;

		if(this.points.length == 0) { 
			// Add point
			var point = new Point(event.offsetX, event.offsetY);
			this.points.push(point);
		}
		else {
			var click = { x:event.offsetX, y:event.offsetY };
			var point = new Point(this.points[0].x, this.points[0].y);

			if( point.isOnPoint(click.x, click.y) ) {
				// Close roi shape with original point
				this.points.push(point);
				this.isClosedShape = true;
			}
			else {
				// Add point 
				var point = new Point(event.offsetX, event.offsetY);
				this.points.push(point);
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
		var min = { x:Math.round(Math.min(...x)), y:Math.round(Math.min(...y)) };
		var max = { x:Math.round(Math.max(...x)), y:Math.round(Math.max(...y)) };
		return { sx:min.x, sy:min.y, width:max.x-min.x, height:max.y-min.y };
	}
	
	isOnHandle(event) { 
		var x = event.offsetX;
		var y = event.offsetY;
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

	isOnMask(event) { 
		var x = event.offsetX;
		var y = event.offsetY;
		var bounds = this.getBoundingBox();

		if(x < bounds.sx || bounds.sx + bounds.width < x || y < bounds.sy || bounds.sy + bounds.height < y)
			return false;

		var xStride = 4;
		var yStride = 4 * bounds.width;
		x = Math.round(x - bounds.sx);
		y = Math.round(y - bounds.sy);
		var mask = this.createMaskData();
		var value = mask[y * yStride + x * xStride];
		if(value == 255) return true;
		else return false;
	}

	isOnROI(event) {
		// Check points
		var isOnHandle = this.isOnHandle(event);
		if(isOnHandle)
			return true;

		// Check ROI mask
		return this.isOnMask(event);
	}

	update(event) {
		// Update Active Point
		if(this.activePoint != null) {
			this.activePoint.x = event.offsetX;
			this.activePoint.y = event.offsetY;
		}
	}

	updatePosition(event) {
		if(event == null) {
			this.isDrag = false;
			return;
		}

		var x = event.offsetX;
		var y = event.offsetY;

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
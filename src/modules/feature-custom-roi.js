
import FeatureROI from './feature-roi.js';
import FeatureTypes from './feature-types.js';
import Point from './point.js';

class FeatureCustomROI extends FeatureROI {
	constructor() {
		super();
		this.type = FeatureTypes.CUSTOM;
		this.points = [];

		this.isClosedShape = false;
		this.pointBounds = 4;
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

	updateROI(event) {


	}

	isPositionInROI(event) {
		// Check points
		var isOnPoint = this.isOnPoint(event);
		if(isOnPoint)
			return true;

		// Check ROI mask
		return this.isOnMask(event);
	}
	
	isOnPoint(event) {
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
		var mask = this.createMaskROI();

		if(x < bounds.sx || bounds.sx + bounds.width < x || y < bounds.sy || bounds.sy + bounds.height < y)
			return false;

		var xStride = 4;
		var yStride = 4 * bounds.width;
		x = x - bounds.sx;
		y = y - bounds.sy;
		var value = mask.data[y * yStride + x * xStride];
		if(value == 255) return true;
		else return false;
	}

	getBoundingBox() {
		var x = this.points.map((p) => { return p.x; });
		var y = this.points.map((p) => { return p.y; });
		var min = { x:Math.min(...x), y: Math.min(...y) };
		var max = { x:Math.max(...x), y: Math.max(...y) };
		return { sx:min.x, sy:min.y, width:max.x-min.x, height:max.y-min.y };
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

	createMaskROI() {
		if(this.points.length <= 2)
			return null;

		var bounds = this.getBoundingBox();

		// Create ROI Mask and get pixel data
		var canvasMask = document.createElement('canvas');
		canvasMask.width = bounds.width;
		canvasMask.height = bounds.height;
		var contextMask = canvasMask.getContext('2d');
		this.drawMaskROI(contextMask, bounds);
		var mask = contextMask.getImageData(0, 0, canvasMask.width, canvasMask.height);
		return mask;
	}

	createROIMaskData(image) {
		if(this.points.length <= 2)
			return null;

		// Create a copy of image and get pixel data within the bounding box
		var canvas = document.createElement('canvas');
		canvas.width = image.width;
		canvas.height = image.height;
		var context = canvas.getContext('2d');
		context.drawImage(image.img, 0, 0, canvas.width, canvas.height);
		var bounds = this.getBoundingBox();
		var imageData = context.getImageData(bounds.sx, bounds.sy, bounds.width, bounds.height);
		var data = imageData.data;

		// Create ROI Mask and get pixel data
		var canvasMask = document.createElement('canvas');
		canvasMask.width = bounds.width;
		canvasMask.height = bounds.height;
		var contextMask = canvasMask.getContext('2d');
		this.drawMaskROI(contextMask, bounds);
		var mask = contextMask.getImageData(0, 0, canvasMask.width, canvasMask.height);
		return { img:data, mask:mask.data };
	}

}

export default FeatureCustomROI;
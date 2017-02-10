
import FeatureROI from './feature-roi.js';
import FeatureTypes from './feature-types.js';

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

		if(this.points.length == 0) // Add point
			this.points.push({x:event.offsetX, y:event.offsetY});
		else {
			var p0 = this.points[0];
			var p1 = { x:event.offsetX, y:event.offsetY };

			if( (p1.x - p0.x) * (p1.x - p0.x) + (p1.y - p1.y) * (p1.y - p1.y) < this.pointBounds * this.pointBounds) {
				// Close roi shape with orginal point
				this.points.push(p0);
				this.isClosedShape = true;
			}
			else // Add point
				this.points.push({x:event.offsetX, y:event.offsetY});
		}
	}

	updateROI(event) {

	}

	isPositionInROI(event) {

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
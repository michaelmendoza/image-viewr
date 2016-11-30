
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
	
	createROIMaskData(image) {
		// Create a copy canvas of image and get pixel data
		var canvas = document.createElement('canvas');
		canvas.width = image.width;
		canvas.height = image.height;
    var context = canvas.getContext('2d');
		context.drawImage(image.img, 0, 0, canvas.width, canvas.height);
		var sx = this.x - this.radius;
		var sy = this.y - this.radius;
		var width = 2 * this.radius;
		var height = 2 * this.radius;
		var imageData = context.getImageData(sx, sy, width, height);
		var data = imageData.data;	

		// Create ROI Mask and get pixel data
		var canvas2 = document.createElement('canvas');
		canvas2.width = 2 * this.radius;
		canvas2.height = 2 * this.radius;
		var context2 = canvas2.getContext('2d');
		context2.clearRect(0,0,canvas2.width, canvas2.height);
		var x = this.radius;
		var y = this.radius;
		var r = this.radius;
		context2.beginPath();
		context2.fillStyle = "#FFFFFF";
		context2.arc(x, y, r, 0, 2*Math.PI);
		context2.fill();
		var imageData2 = context2.getImageData(0, 0, canvas2.width, canvas2.height);
		var data2 = imageData2.data;		
		return { img:data, mask:data2 };
	}


	calcAveragePixelValue(image) {
		var data = this.createROIMaskData(image);

		var total = 0;
		for (var i = 0; i < data.img.length; i += 4) {
			if(data.mask[i] == 255)
				total += (data.img[i] + data.img[i +1] + data.img[i +2]) / 3;
		}
		return total / (data.img.length / 4);
	}

	getNonZeroPixelCount(image) {
		var data = this.createROIMaskData(image);

		var count = 0;
		for (var i = 0; i < data.img.length; i += 4) {
			var avg = (data.img[i] + data.img[i+1] + data.img[i+2]) / 3;
			if(data.mask[i] == 255 && avg > parseInt(image.minThreshold)) {
				count += 1;
			}
		}
    return count;
	}

}

export default FeatureCircleROI;
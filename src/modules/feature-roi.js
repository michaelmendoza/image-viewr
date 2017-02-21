
import Colors from './colors.js';

class FeatureROI {

	constructor() {
		this.name = '';
		this.color = Colors.getColor();

		this.x = null;
		this.y = null;
		this.area = 0;
		this.mean = 0;
		this.stdDev = 0;
		this.min = 0;
		this.max = 0;
		this.pixelCount = 0;

		this.pixelData = null;

		this.activePoint = null; 	// Handle Point is active
		this.isHover = false;			// Mouse is hovering on ROI
		this.isDrag = false;			// ROI is being dragged
	}

	create(event) {
		this.x = event.offsetX;
		this.y = event.offsetY;
	}

	createImageData(image) {
		var bounds = this.getBoundingBox();

		var canvas = document.createElement('canvas');
		canvas.width = image.width;
		canvas.height = image.height;
		var context = canvas.getContext('2d');
		context.drawImage(image.img, 0, 0, canvas.width, canvas.height);
		var imageData = context.getImageData(bounds.sx, bounds.sy, bounds.width, bounds.height);
		return imageData.data;
	}

	createMaskData() {
		var bounds = this.getBoundingBox();
		
		var canvasMask = document.createElement('canvas');
		canvasMask.width = bounds.width;
		canvasMask.height = bounds.height;
		var contextMask = canvasMask.getContext('2d');
		this.drawMaskROI(contextMask, bounds);
		var mask = contextMask.getImageData(0, 0, canvasMask.width, canvasMask.height);
		return mask.data;
	}

	createROIMaskData(image) {
		// Create a copy of image and get pixel data within the bounding box
		var imageData = this.createImageData(image);

		// Create ROI Mask and get pixel data
		var maskData = this.createMaskData();

		return { img:imageData, mask:maskData };
	}

	getMinMax(image) {
		var data = this.createROIMaskData(image);
		if(data == null)
			return 0;

		var min = 255;
		var max = 0;
		for (var i = 0; i < data.img.length; i += 4) {
			if(data.mask[i] == 255) {
				var value = (data.img[i] + data.img[i +1] + data.img[i +2]) / 3;
				if(value < min)
					min = value;
				if(value > max)
					max = value;
			}
		}

		return { min:min, max:max };
	}

	getMean(image) {
		var data = this.createROIMaskData(image);
		if(data == null)
			return 0;

		var sum = 0;
		for (var i = 0; i < data.img.length; i += 4) {
			if(data.mask[i] == 255)
				sum += (data.img[i] + data.img[i +1] + data.img[i +2]) / 3;
		}
		return sum / (data.img.length / 4);
	}

	getStdDev(image) {
		var data = this.createROIMaskData(image);
		if(data == null)
			return 0;

		var sum = 0;
		var sum2 = 0;
		for (var i = 0; i < data.img.length; i += 4) {
			if(data.mask[i] == 255) {
				var value =  (data.img[i] + data.img[i +1] + data.img[i +2]) / 3;
				sum += value;
				sum2 += value * value;
			}
		}

		var N = (data.img.length / 4);
		var mean = sum / N;
		var mean2 = sum2 / N;

		var variance = mean2 - mean * mean;
		return Math.sqrt(variance);
	}	

	getArea(image) {
		var data = this.createROIMaskData(image);
		if(data == null)
			return 0;

		var count = 0;
		for (var i = 0; i < data.img.length; i += 4) {
			var avg = (data.img[i] + data.img[i+1] + data.img[i+2]) / 3;
			if(data.mask[i] == 255) {
				count += 1;
			}
		}
		return count;
	}

	getColorThresholdPixelCount(image) { 
		var data = this.createROIMaskData(image);
		if(data == null)
			return 0;

		var thresholds = image.colorThreshold;
		var rMin = parseInt(thresholds.r.min);
		var rMax = parseInt(thresholds.r.max);
		var gMin = parseInt(thresholds.g.min);
		var gMax = parseInt(thresholds.g.max);
		var bMin = parseInt(thresholds.b.min);
		var bMax = parseInt(thresholds.b.max);

		var count = 0;
		for (var i = 0; i < data.img.length; i += 4) {
			if(data.mask[i] == 255 && !(data.img[i] < rMin || data.img[i] > rMax || data.img[i+1] < gMin || data.img[i+1] > gMax || data.img[i+2] < bMin || data.img[i+2] > bMax)) {
				count += 1;
			}		
		}
		return count;
	}	

	getGreyThresdholdPixelCount(image) {
		var data = this.createROIMaskData(image);
		if(data == null)
			return 0;

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

export default FeatureROI;

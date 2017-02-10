
class FeatureROI {

	constructor() {
		this.x = null;
		this.y = null;
		this.area = 0;
		this.pixelCount = 0;
		this.pixelData = null;
		this.avgPixel = 0;		
	}

	createROI(event) {
		this.x = event.offsetX;
		this.y = event.offsetY;
	}

	updateROIPosition(event) {
		this.x = event.offsetX;
		this.y = event.offsetY;
	}

	createROIMaskData(image) {
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
		this.drawMaskROI(contextMask);
		var mask = contextMask.getImageData(0, 0, canvasMask.width, canvasMask.height);
		return { img:data, mask:mask.data };
	}

	calcAveragePixelValue(image) {
		var data = this.createROIMaskData(image);
		if(data == null)
			return 0;

		var total = 0;
		for (var i = 0; i < data.img.length; i += 4) {
			if(data.mask[i] == 255)
				total += (data.img[i] + data.img[i +1] + data.img[i +2]) / 3;
		}
		return total / (data.img.length / 4);
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

}

export default FeatureROI;

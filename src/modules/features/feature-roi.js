
import Colors from '../utils/colors.js';
import ROIMask from './roi-mask.js';
import PixelStats from '../math/pixel-stats.js';

class FeatureROI {

	constructor() {
		// ROI Properties
		this.name = '';
		this.color = Colors.getColor();

		// ROI position
		this.x = null;
		this.y = null;
		
		// ROI stats
		this.area = 0;
		this.mean = 0;
		this.stdDev = 0;
		this.min = 0;
		this.max = 0;
		this.pixelCount = 0;

		// ROI pixel data
		this.pixelData = null;

		// UI flags
		this.activePoint = null; 	// Handle Point is active
		this.isHover = false;			// Mouse is hovering on ROI
		this.isDrag = false;			// ROI is being dragged
	}
	
	create(point) {
		this.x = point.x;
		this.y = point.y;
	}

	/** Retrieve image data for bounding box of ROI. Gives an imageData array of size (num pixel * 4) **/
	createImageData(image) {
		var bounds = this.getBoundingBox();

		var canvas = document.createElement('canvas');
		canvas.width = image.width;
		canvas.height = image.height;
		var context = canvas.getContext('2d');
		context.drawImage(image.canvas, 0, 0, canvas.width, canvas.height);
		var imageData = context.getImageData(bounds.sx, bounds.sy, bounds.width, bounds.height);
		return imageData.data;
	}
	
	/** Retrieve mask data for bounding box of ROI. Gives an imageData array of size (num pixel * 4) **/
	createMaskData(layer) {
		var bounds = this.getBoundingBox();

		// Draw mask in canvas frame
		var canvasMask = document.createElement('canvas');
		canvasMask.width = Math.floor(bounds.width);
		canvasMask.height = Math.floor(bounds.height);
		var contextMask = canvasMask.getContext('2d');
		this.drawMaskROI(contextMask, bounds, layer.controls); 

		// Draw in LayerFrame
		var layerMask = document.createElement('canvas');
		layerMask.width = layer.file.width;
		layerMask.height = layer.file.height;
		var layerContextMask = layerMask.getContext('2d'); 
		layerContextMask.drawImage(canvasMask, 0, 0, canvasMask.width, canvasMask.height, 
																					 0, 0, layerMask.width, layerMask.height);

		//var mask = contextMask.getImageData(0, 0, canvasMask.width, canvasMask.height);
		var mask = layerContextMask.getImageData(0, 0, layerMask.width, layerMask.height);
		return mask.data;
	}
	
	/** Creates ROI masked image data. Unmasked pixels have a value of -1. Gives an imageData array of size (num pixel) **/
	createMaskedImageData(image) { 

		var layer = image.getActiveLayer();

		// Create a copy of image and get pixel data within a ROI bounding box
		var imageData = this.createImageData(image);

		// Create ROI Mask and get pixel data within the ROI bounding box
		var maskData = this.createMaskData(layer); 

		// Create Masked Image Data
		var maskedImageData = ROIMask.applyMaskToImage(this, maskData, layer);

		return { img:imageData, mask:maskData, maskedImageData:maskedImageData, threshold:layer.threshold };
	}	

	getMinMax(image) {
		var data = this.createMaskedImageData(image);
		if(data == null) return 0;
		return PixelStats.getMinMax(data.maskedImageData, data.threshold);
	}

	getMean(image) {
		var data = this.createMaskedImageData(image);
		if(data == null)
			return 0;

		return PixelStats.getMean(data.maskedImageData, data.threshold);
	}

	getStdDev(image) {
		var data = this.createMaskedImageData(image);
		if(data == null)
			return 0;

		return PixelStats.getStdDev(data.maskedImageData, data.threshold);
	}	

	getArea(image) {
		var data = this.createMaskedImageData(image);
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
	
	getPixelCount(image) {
		var data = this.createMaskedImageData(image);
		if(data == null)
			return 0;

		return PixelStats.getCount(data.maskedImageData, data.threshold);
	}	

	getColorThresholdPixelCount(image) { 
		var data = this.createMaskedImageData(image);
		if(data == null)
			return 0;

		var thresholds = image.threshold.colorThreshold;
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
		var data = this.createMaskedImageData(image);
		if(data == null)
			return 0;

		var count = 0;
		for (var i = 0; i < data.img.length; i += 4) {
			var avg = (data.img[i] + data.img[i+1] + data.img[i+2]) / 3;
			if(data.mask[i] == 255 && avg > parseInt(image.threshold.minThreshold)) {
				count += 1;
			}
		}
		return count;
	}

}

export default FeatureROI;

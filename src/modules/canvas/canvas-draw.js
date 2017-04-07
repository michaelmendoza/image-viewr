
import ThresholdModes from '../modes/threshold-modes.js';
import ImageHistogram from './image-histogram.js';
import Viewr from '../viewr.js';

class CanvasDraw {
	
	clear(canvas) {
		var context = canvas.context;
		context.clearRect(0, 0, canvas.width, canvas.height);
	}	

	createImg(canvas) {
		if(this.file.type == 'dicom') {
			return this.createImgDICOM(canvas, this.file);
		}
		else if(this.file.type == 'dicom-3d') {
			return this.createImgDICOM(canvas, this.file.getActiveFile());
		}
		else // Not a DICOM file, and the img should already exist
			return canvas.img;
	}

	createImgDICOM(_canvas, file) {
		var constast = _canvas.constrast;

		var canvas = document.createElement('canvas');
		canvas.width = file.width;
		canvas.height = file.height;

    var context = canvas.getContext('2d');
    var pixelData = file.pixelData;
    var numPixels = file.width * file.height;
		var resolution = this.imageContrast.resolution;
		var imageData = context.getImageData(0, 0, file.width, file.height);

		var histogram = new ImageHistogram(pixelData, numPixels, 4096);

		for(var i = 0; i < numPixels; i++) {
			var value = this.imageContrast.map(pixelData[i]) * 255 / resolution;
			imageData.data[4*i] = value;
			imageData.data[4*i+1] = value;
			imageData.data[4*i+2] = value;
			imageData.data[4*i+3] = 255;
		}
		context.putImageData(imageData, 0, 0);
		var dataURL = canvas.toDataURL();     

		var img = document.createElement('img');
		img.src = dataURL;
		return img;
	}

	drawImage(canvas) {
		var context = canvas.context;
		var controls = canvas.controls;
		var threshold = canvas.threshold;

		// Check there is an image to draw
		if(canvas.img == null)
			return;

		// Clear Image on Canvas
		this.clear(canvas);
		
		// Create new Img for DICOMs
		canvas.img = this.createImg(canvas); 

		// Draw scaled/translated Image
		var sx = 0;
		var sy = 0;
		var sWidth = Math.round(canvas.width);
		var sHeight = Math.round(canvas.height);
		var dx = controls.panX;
		var dy = controls.panY;
		var dWidth = Math.round(canvas.width * controls.zoom);
		var dHeight = Math.round(canvas.height * controls.zoom);
		context.drawImage(canvas.img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

		// Thresholding
		if(Viewr.modes.threshold == ThresholdModes.GREY)
			threshold.drawMinThreshold(threshold.minThreshold);
		else if(Viewr.modes.threshold == ThresholdModes.COLOR)
			threshold.drawColorThreshold(threshold.colorThreshold);
		
		// Draw Features - TODO - Draw Features
		//this.viewer.featureManager.drawAllFeatures();
	}

	drawInvertedImage(canvas) {
		var context = canvas.context;

		var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
		var data = imageData.data;
		for (var i = 0; i < data.length; i += 4) {
			data[i]     = 255 - data[i];     // red
			data[i + 1] = 255 - data[i + 1]; // green
			data[i + 2] = 255 - data[i + 2]; // blue
		}
		context.putImageData(imageData, 0, 0);
	}

	drawGreyScaleImage(canvas) {
		var context = canvas.context;

		var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
		var data = imageData.data;
		for (var i = 0; i < data.length; i += 4) {
			var avg = (data[i] + data[i +1] + data[i +2]) / 3;
			data[i]     = avg; // red
			data[i + 1] = avg; // green
			data[i + 2] = avg; // blue
			}
		context.putImageData(imageData, 0, 0);		
	}

	drawGreyConstrastImage(canvas) {
		var context = canvas.context;
		var contrast = canvas.contrast;

		var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
		var data = imageData.data;
		for (var i = 0; i < data.length; i += 4) {
			var avg = (data[i] + data[i +1] + data[i +2]) / 3;
			avg = contrast.map(avg); 
			data[i]     = avg; // red
			data[i + 1] = avg; // green
			data[i + 2] = avg; // blue
			}
		context.putImageData(imageData, 0, 0);		
	}

}

export default CanvasDraw;



import ThresholdModes from './threshold-modes.js';

var ImageDraw = function() {

	this.clear = () => {
		this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
	}	

	this.drawImage = () => {

		// Clear Image
		this.clear();

		// Draw scaled/translated Image
		var sx = 0;
		var sy = 0;
		var sWidth = Math.round(this.width);
		var sHeight = Math.round(this.height);
		var dx = this.panX;
		var dy = this.panY;
		var dWidth = Math.round(this.width * this.zoom);
		var dHeight = Math.round(this.height * this.zoom);
		this.context.drawImage(this.img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
		
		// Thresholding
		if(this.viewer.thresholdMode == ThresholdModes.GREY)
			this.drawMinThreshold(this.minThreshold);
		else if(this.viewer.thresholdMode == ThresholdModes.COLOR)
			this.drawColorThreshold(this.colorThreshold);
		
		// Draw Features 
		this.viewer.featureManager.drawAllFeatures();
	}

	this.drawPixelData = (pixelData, numPixels) => {
		var imageData = this.context.getImageData(0, 0, this.width, this.height);
		for(var i = 0; i < numPixels; i++) {
		    imageData.data[4*i] = (pixelData[i]*255)/4095;
		    imageData.data[4*i+1] = (pixelData[i]*255)/4095;
		    imageData.data[4*i+2] = (pixelData[i]*255)/4095;
		    imageData.data[4*i+3] = 255;
		}
		this.context.putImageData(imageData, 0, 0);
	}

	this.drawInvertedImage = () => {
		var imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
		var data = imageData.data;
		for (var i = 0; i < data.length; i += 4) {
			data[i]     = 255 - data[i];     // red
			data[i + 1] = 255 - data[i + 1]; // green
			data[i + 2] = 255 - data[i + 2]; // blue
		}
		this.context.putImageData(imageData, 0, 0);
	}

	this.drawGreyScaleImage = () => {
	var imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
	var data = imageData.data;
	for (var i = 0; i < data.length; i += 4) {
		var avg = (data[i] + data[i +1] + data[i +2]) / 3;
		data[i]     = avg; // red
		data[i + 1] = avg; // green
		data[i + 2] = avg; // blue
		}
	this.context.putImageData(imageData, 0, 0);		
	}

	this.drawMinThreshold = (minThreshold) => {
		var imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
		var data = imageData.data;
		for (var i = 0; i < data.length; i += 4) {
			var avg = (data[i] + data[i +1] + data[i +2]) / 3;
			if(avg <= minThreshold) {
				data[i] = 0;
				data[i + 1] = 0;
				data[i + 2] = 0;
			}
		}
		this.context.putImageData(imageData, 0, 0);		
	}

	this.drawColorThreshold = (colorThresholds) => {
		var rMin = colorThresholds.r.min;
		var rMax = colorThresholds.r.max;
		var gMin = colorThresholds.g.min;
		var gMax = colorThresholds.g.max;
		var bMin = colorThresholds.b.min;
		var bMax = colorThresholds.b.max;
		console.log(colorThresholds);

		var imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
		var data = imageData.data;
		for (var i = 0; i < data.length; i += 4) {
			
			if(data[i] < rMin || data[i] > rMax || data[i+1] < gMin || data[i+1] > gMax || data[i+2] < bMin || data[i+2] > bMax) {
				data[i + 3] = 0;
			}
		}
		this.context.putImageData(imageData, 0, 0);
	}

	this.drawCircleROI = (roi) => {
		var x = roi.x * this.zoom + this.panX;
		var y = roi.y * this.zoom + this.panY;
		var r = roi.radius * this.zoom;

		var lineWidth = 5;
		r = Math.max(r - (lineWidth / 2), 0);
		this.context.lineWidth = lineWidth;
		this.context.beginPath();
		this.context.strokeStyle = '#4DF94D';
		this.context.arc(x, y, r, 0, 2*Math.PI);
		this.context.stroke();
	}

	this.drawRectROI = (roi) => {
		this.context.lineWidth = 5;
		this.context.strokeStyle = '#4DF94D';
		this.context.rect(roi.x,roi.y,roi.width,roi.height);
		this.context.stroke();
	}

}

export default ImageDraw;


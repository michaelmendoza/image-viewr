
import ThresholdModes from './threshold-modes.js';

var ImageDraw = function() {

	this.clear = () => {
		this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
	}	

	this.createDICOM_Img = (file) => {

		var canvas = document.createElement('canvas');
		canvas.width = file.width;
		canvas.height = file.height;

    var context = canvas.getContext('2d');
    var pixelData = file.pixelData;
    var numPixels = file.width * file.height;
		var resolution = this.imageContrast.resolution;
		var imageData = context.getImageData(0, 0, file.width, file.height);

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

	this.createImg = () => {
		if(this.file.type == 'dicom') {
			this.img = this.createDICOM_Img(this.file);
		}
		else if(this.file.type == 'dicom-3d') {
			this.img = this.createDICOM_Img(this.file.getActiveFile());
		}
		else // Not a DICOM file, and the img should already exist
			return;
	}

	this.drawImage = () => {

		// Check there is an image to draw
		if(this.img == null)
			return;

		// Clear Image on Canvas
		this.clear();

		// Create new Img for DICOMs
		this.createImg(); 

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
		
		// Constrast
		//this.drawGreyConstrastImage();

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

	this.drawGreyConstrastImage = () => {
	var imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
	var data = imageData.data;
	for (var i = 0; i < data.length; i += 4) {
		var avg = (data[i] + data[i +1] + data[i +2]) / 3;
		avg = this.imageContrast.contrastLUT(avg);
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

		// Set draw styles
		var lineWidth;
		if(roi.isHover) {
			lineWidth = 4;
			this.context.strokeStyle = '#FFFFFF';			
			this.context.fillStyle = roi.color;
		} 
		else {
			lineWidth = 2;
			this.context.strokeStyle = roi.color;
			this.context.fillStyle = roi.color;
		}

		// Transform to global coordinates
		var x = roi.x * this.zoom + this.panX;
		var y = roi.y * this.zoom + this.panY;
		var r = roi.radius * this.zoom;

		// Render 
		r = Math.max(r - (lineWidth / 2), 0);
		this.context.lineWidth = lineWidth;
		this.context.beginPath();
		this.context.arc(x, y, r, 0, 2*Math.PI);
		this.context.stroke();

		this.context.globalAlpha = 0.5;
		this.context.fill();
		this.context.globalAlpha = 1.0;
	}

	this.drawRectROI = (roi) => {
		this.context.lineWidth = 5;
		this.context.strokeStyle = '#4DF94D';
		this.context.rect(roi.x,roi.y,roi.width,roi.height);
		this.context.stroke();
	}

	this.drawCustomROI = (roi) => {

		// Set draw styles
		if(roi.isHover) {
			this.context.lineWidth = 2;
			this.context.strokeStyle = '#FFFFFF';			
			this.context.fillStyle = '#FFFFFF';
		} 
		else {
			this.context.lineWidth = 1;
			this.context.strokeStyle = roi.color;
			this.context.fillStyle = roi.color;
		}

		// Transform points to global coordinates
		var points = roi.points.map(function(point) {
			return { x:point.x * this.zoom + this.panX, y:point.y * this.zoom + this.panY };
		}.bind(this));

		// Draw Points
		points.forEach(function(point) {
			var r = 2;
			if(point == roi.activePoint) {
				r = 6;
			}

			this.context.beginPath();
			this.context.arc(point.x, point.y, r, 0, 2*Math.PI);
			this.context.fill();
		}.bind(this))

		// Render Outline and ROI Fill
		this.context.fillStyle = roi.color;
		if(points.length > 1) {
			this.context.moveTo(points[0].x, points[0].y);

			points.forEach(function(point) {
				this.context.lineTo(point.x, point.y);
			}.bind(this));
			this.context.stroke();
		}

		if(roi.isClosedShape) {
			this.context.globalAlpha = 0.5;
			this.context.fill();
			this.context.globalAlpha = 1.0;
		}
	}

}

export default ImageDraw;


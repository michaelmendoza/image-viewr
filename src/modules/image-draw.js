
var ImageDraw = function() {

	this.clear = () => {
		this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
	}	

	this.drawImage = () => {
		this.clear();

		var sx = 0;
		var sy = 0;
		var sWidth = Math.round(this.width);
		var sHeight = Math.round(this.height);
		var dx = this.panX;
		var dy = this.panY;
		var dWidth = Math.round(this.width * this.zoom);
		var dHeight = Math.round(this.height * this.zoom);
		this.context.drawImage(this.img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
		this.drawMinThreshold(this.minThreshold);
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
      data[i]     = (avg <= minThreshold) ? 0 : avg;
      data[i + 1] = (avg <= minThreshold) ? 0 : avg;
      data[i + 2] = (avg <= minThreshold) ? 0 : avg;
    }
    this.context.putImageData(imageData, 0, 0);		
	}

	this.drawCircleROI = (roi) => {
		var x = roi.x * this.zoom + this.panX;
		var y = roi.y * this.zoom + this.panY;
		var r = roi.radius * this.zoom;

		this.context.beginPath();
		this.context.strokeStyle = '#4DF94D';
		this.context.arc(x, y, r, 0, 2*Math.PI);
		this.context.stroke();
	}

	this.drawRectROI = (roi) => {
		this.context.strokeStyle = '#4DF94D';
		this.context.rect(roi.x,roi.y,roi.width,roi.height);
		this.context.stroke();
	}

}

export default ImageDraw;


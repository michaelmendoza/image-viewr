
class CanvasDraw {
	constructor(canvas) {
		this.canvas = canvas;
		this.context = this.canvas.getContext('2d');

		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.img = null;		
	}

	clear() {
		this.context.clearRect(0,0,this.width, this.height) 
	}

	drawImage(imgFile) {
		this.img = new Image();

		this.img.onload = function() {
			var context = this.context;
			this.width = this.img.width;
			this.height = this.img.height;
			this.canvas.width = this.width;
			this.canvas.height = this.height;

			this.img.crossOrigin = "Anonymous";
			context.drawImage(this.img, 0, 0);
			
		}.bind(this)

		this.img.src = imgFile;	
	}

	drawROI(roi) {
		this.context.drawImage(this.img, 0, 0);

		this.context.beginPath();
		this.context.strokeStyle = '#4DF94D';
		this.context.arc(roi.x, roi.y, roi.radius, 0, 2*Math.PI);
		this.context.stroke();
	}

	drawInvertedImage() {
		var imageData = this.context.getImageData(0, 0, this.width, this.height);
		var data = imageData.data;
		for (var i = 0; i < data.length; i += 4) {
			data[i]     = 255 - data[i];     // red
			data[i + 1] = 255 - data[i + 1]; // green
			data[i + 2] = 255 - data[i + 2]; // blue
		}
		this.context.putImageData(imageData, 0, 0);
	}

	drawGreyScaleImage() {
		var imageData = this.context.getImageData(0, 0, this.width, this.height);
		var data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
      var avg = (data[i] + data[i +1] + data[i +2]) / 3;
      data[i]     = avg; // red
      data[i + 1] = avg; // green
      data[i + 2] = avg; // blue
    }
    this.context.putImageData(imageData, 0, 0);		
	}

	drawMinThreshold(minThreshold) {
		this.context.drawImage(this.img, 0, 0);
		var imageData = this.context.getImageData(0, 0, this.width, this.height);
		var data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
      var avg = (data[i] + data[i +1] + data[i +2]) / 3;
      data[i]     = (avg <= minThreshold) ? 0 : avg;
      data[i + 1] = (avg <= minThreshold) ? 0 : avg;
      data[i + 2] = (avg <= minThreshold) ? 0 : avg;
    }
    this.context.putImageData(imageData, 0, 0);		
	}

}

export default CanvasDraw;


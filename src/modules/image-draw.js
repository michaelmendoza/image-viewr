
class ImageDraw {

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

	drawCircleROI(context) {
		context.beginPath();
		context.strokeStyle = '#4DF94D';
		context.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
		context.stroke();
	}

	drawRectROI(context) {
		context.strokeStyle = '#4DF94D';
		context.rect(this.x,this.y,this.width,this.height);
		context.stroke();
	}

}

export default ImageDraw;


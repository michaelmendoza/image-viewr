
class ImageHistogram {

	constructor(image, pixelCount, maxValue) {
		this.image = image;
		this.pixelCount = pixelCount;
		this.maxValue = maxValue;
		this.createHistogram();
	}
	
	createHistogram(binCount = 100) {		
		this.binCount = binCount;
		this.step = this.maxValue / this.binCount;

		// Create an zero array
		this.bins = [];
		for(var i = 0; i < this.binCount; i++) {
			this.bins.push(0);
		}

		// Create histogram
		for(var i = 0; i < this.pixelCount; i++) {
			var value = this.image[i];
			var index = Math.floor(value / this.step);
			this.bins[index] += 1;
		}
	}
}

export default ImageHistogram;
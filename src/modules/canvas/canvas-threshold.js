
class CanvasThreshold {

	constructor() {

		// For overall image out 
		this.minThreshold = 0;
		this.maxThreshold = 255;

		// TODO: Check for resolution -> dicom vs png
		// For image layer
		this.min = 0;
		this.max = 4096;

		this.colorPickerPixel = null; 
		this.colorPixelOffset = 40;
		this.colorThreshold = {
			r: { min:0, max:255 },
			g: { min:0, max:255 },
			b: { min:0, max:255 }
		};
	}
	
	/** Set default/starting threshold values */
	setDefault(min, max) {
		this.min = min;
		this.max = max;
	}
	
	/** 
	 * Opacity map gives a value of 0 if value is out of bounds of thresholds, and 
	 * a value of 1 if within bounds. 
	 */
	opacityMap(value) { 
		return (value < this.min || this.max < value) ? 0 : 1;
	} 

	drawMinThreshold(canvas) {
		var context = canvas.context;
		var minThreshold = this.minThreshold;
		
		var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
		var data = imageData.data;
		for (var i = 0; i < data.length; i += 4) {
			var avg = (data[i] + data[i +1] + data[i +2]) / 3;
			if(avg <= minThreshold) {
				data[i] = 0;
				data[i + 1] = 0;
				data[i + 2] = 0;
				data[i + 3] = 0;
			}
		}
		context.putImageData(imageData, 0, 0);		
	}

	drawColorThreshold(canvas) {
		var colorThresholds = this.colorThreshold;
		var rMin = colorThresholds.r.min;
		var rMax = colorThresholds.r.max;
		var gMin = colorThresholds.g.min;
		var gMax = colorThresholds.g.max;
		var bMin = colorThresholds.b.min;
		var bMax = colorThresholds.b.max;

		var context = canvas.context;
		var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
		var data = imageData.data;
		for (var i = 0; i < data.length; i += 4) {
			
			if(data[i] < rMin || data[i] > rMax || data[i+1] < gMin || data[i+1] > gMax || data[i+2] < bMin || data[i+2] > bMax) {
				data[i + 3] = 0;
			}
		}
		context.putImageData(imageData, 0, 0);
	}

	setColorPixelOffset(offset) {
		this.colorPixelOffset = offset;

		if(this.colorPickerPixel != null)
			this.setColorThresholdWithPixel(this.colorPickerPixel);
	}

	setColorThreshold(colorThreshold) {
		this.colorThreshold = colorThreshold;
	}

	setColorThresholdWithPixel(colorPixel) {
		var r = colorPixel.r;
		var g = colorPixel.g;
		var b = colorPixel.b;
		var offset = this.colorPixelOffset;

		this.colorPickerPixel = colorPixel;
		this.colorThreshold.r.min = Math.max(r - offset, 0);
		this.colorThreshold.r.max = Math.min(r + offset, 255);
		this.colorThreshold.g.min = Math.max(g - offset, 0);
		this.colorThreshold.g.max = Math.min(g + offset, 255);
		this.colorThreshold.b.min = Math.max(b - offset, 0);
		this.colorThreshold.b.max = Math.min(b + offset, 255);
	}

	setMinThreshold(minThreshold) {
		this.minThreshold = minThreshold;
	}

	setMaxThreshold(maxThreshold) {
		this.maxThreshold = minThreshold;
	}	

}

export default CanvasThreshold;

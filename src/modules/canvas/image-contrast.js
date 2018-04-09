
import PixelStats from '../math/pixel-stats.js';

class ImageContrast {

	constructor() {
		this.level = 2048.0;
		this.width = 4096.0;
		this.resolution = 4096;

		this.inEdit = false;
	}

	getMin() {
		return this.level - this.width / 2.0;
	}

	getMax() {
		return this.level + this.width / 2.0;
	}

	setMin(min) { 
		var max = this.getMax();
		this.width = (max - min);
		this.level = min + (max - min) / 2.0;
	}

	setMax(max) { 
		var min = this.getMin();
		this.width = (max - min);
		this.level = min + (max - min) / 2.0;		
	}

	setContrastLevel(level) {
		this.level = level;
	}

	setContrastWidth(width) {
		this.width = width;
	}

	setContrast(level, width) {
		this.level = level;
		this.width = width;
	}

	setContrastWithMouse(event) {
		this.level += event.y;
		this.width += event.x;
	}

	/* Constrast based off max-min values */
	autoContrastOld(pixelData, pixelCount) {
		var minValue = 4096.0;
		var maxValue = 0.0;
		for(var i = 0; i < pixelCount; i++) {
			var value = pixelData[i];
			value > maxValue ? maxValue = value : null;
			value < minValue ? minValue = value : null;
		}

		this.width = maxValue - minValue;
		this.level = minValue + (this.width / 2);
		this.maxValue = maxValue;
		this.minValue = minValue;
	}
	
	/* Constrast based off pixel statistitics */
	autoContrast(pixelData, pixelCount) {
		var mean = PixelStats.getMean(pixelData, { min:0, max:4096 });
		var std = PixelStats.getStdDev(pixelData, { min:0, max:4096 });
		var minValue = 0;
		var maxValue = mean + 2.5 * std;

		this.width = maxValue - minValue;
		this.level = minValue + (this.width / 2);
		this.maxValue = maxValue;
		this.minValue = minValue;
	}

	autoContrast3D(file) { 
		var minValue = 4096.0;
		var maxValue = 0.0;

		var pixelCount = file.getPixelCount(0);
		for(var i = 0; i < file.depth; i++) {
			for(var j = 0; j < pixelCount; j++) {
				var value = file.pixelData[i][j];
				value > maxValue ? maxValue = value : null;
				value < minValue ? minValue = value : null;
			}
		}

		this.width = maxValue - minValue;
		this.level = minValue + (this.width / 2);
		this.maxValue = maxValue;
		this.minValue = minValue;
	}

	map(value) {
		return this.contrastLUT(value);
	}

	contrastLUT(value) {
		if(this.level == 2048.0 && this.width == 4096.0)
			return value;

		var width = this.width;
		var level = this.level;
		var min = level - width / 2.0;
		var max = level + width / 2.0;
	
		var output = (this.resolution / width) * (value - min);
		output = output < 0 ? 0 : output;
		output = output > this.resolution ? this.resolution : output;
		return output;
	}

}

export default ImageContrast;


class ImageContrast {

	constructor() {
		this.level = 2048.0;
		this.width = 4096.0;
		this.resolution = 4096;

		this.inEdit = false;
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

	autoContrast(pixelData, pixelCount) {
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
	
	autoContrast3D(fileSet) { 
		var minValue = 4096.0;
		var maxValue = 0.0;

		for(var i = 0; i < fileSet.length; i++) {
			var pixelCount = fileSet[i].numPixels;
			for(var j = 0; j < pixelCount; j++) {
				var value = fileSet[i].pixelData[j];
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

export default new ImageContrast();

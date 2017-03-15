
class ImageContrast {

	constructor() {
		this.level = 2048.0;
		this.width = 4096.0;
		this.resolution = 4096;
	}

	setContrast(event) {
		this.level += event.y;
		this.width += event.x;
		console.log(event, this.level, this.width);
	}
	
	map() {

	}

	contrastLUT(value) {
		if(this.level == 2048.0 && this.width == 4096.0)
			return value;

		var width = this.width;
		var level = this.level;
		var min = level - width / 2.0;
		var max = level + width / 2.0;

		min = min < 0 ? 0 : min;
		max = max > this.resolution ? this.resolution : max;
	
		var output;
		if(value <= min)
			output = 0;
		else if(value >= max)
			output = this.resolution;
		else {
			output = (this.resolution / width) * (value + (0.5 * width) - level);
		}

		output = output < 0 ? 0 : output;
		output = output > this.resolution ? this.resolution : output;
		return output;
	}

}

export default ImageContrast;


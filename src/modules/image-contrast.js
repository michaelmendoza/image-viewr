
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
	
		//var output = (this.resolution / width) * (value + level - (0.5 * width) );
		var output = (this.resolution / width) * (value - min);
		output = output < 0 ? 0 : output;
		output = output > this.resolution ? this.resolution : output;
		return output;
	}

}

export default ImageContrast;


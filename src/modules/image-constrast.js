
var ImageContrast = function() {

	constructor(viewer) {
		super();

		this.resolution = 4096;
	}

	this.contrastLUT(width, center) {
		var min = center - width;
		var max = cetner + width;

		min = min < 0 ? 0 : min;
		max = max > this.resolution ? this.resolution : max;
	}

}

export default ImageContrast;


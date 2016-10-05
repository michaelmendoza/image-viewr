
class FeatureROI {

	constructor() {
		this.x = null;
		this.y = null;
		this.area = null
		this.pixelData = null;
		this.avgPixel = null;		
	}

	createROI(event) {
		this.x = event.offsetX;
		this.y = event.offsetY;
	}

	updateROIPosition(event) {
		this.x = event.offsetX;
		this.y = event.offsetY;
	}
}

export default FeatureROI;

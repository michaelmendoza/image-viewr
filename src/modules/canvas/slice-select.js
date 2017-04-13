
class SliceSelect {
	constructor(canvasX, canvasY) {
		this.canvasX = canvasX;
		this.canvasY = canvasY;
	}

	drawSlices() { 
		this.canvasX.drawImage();
		this.canvasY.drawImage();
	}

	getSlices() {
		var x = this.canvasX.sliceIndex;
		var y = this.canvasY.sliceIndex;
		return { x:x, y:y };
	}
}

export default SliceSelect;
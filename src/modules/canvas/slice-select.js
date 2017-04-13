
class SliceSelect {
	constructor(canvasX, canvasY) {
		this.canvasX = canvasX;
		this.canvasY = canvasY;
	}

	getSlices() {
		var x = this.canvasX.file.activeIndex;
		var y = this.canvasY.file.activeIndex;
		return { x:x, y:y };
	}
}

export default SliceSelect;
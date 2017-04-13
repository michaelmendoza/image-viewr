
class SliceSelect {
	constructor(canvas, canvasX, canvasY) {
		this.canvas = canvas;
		this.canvasX = canvasX;
		this.canvasY = canvasY;
	}

	drawSliceImages() { 
		this.canvasX.drawImage();
		this.canvasY.drawImage();
	}

	getSlices() {
		var x = this.canvasX.sliceIndex;
		var y = this.canvasY.sliceIndex;
		return { x:x, y:y };
	}

	getSliceHandles() {
		var canvas = this.canvas;
		var slices = this.getSlices();
		var bounds = canvas.draw.getBounds(canvas);

		var line = { x1:slices.x , y1:0, x2:slices.x, y2:bounds.height };
		var line2 = { x1:0, y1:slices.y, x2:bounds.width, y2:slices.y };
		return { line: line, line2: line2 };
	}
	
	isOnSliceHandle(point) {

	}
}

export default SliceSelect;